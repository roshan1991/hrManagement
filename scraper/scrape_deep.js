const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('dashboard_data.json', 'utf-8'));
const outDir = path.join(__dirname, 'features_md');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        await page.goto('https://digitalhr.cyclonenepal.com/admin/login', { waitUntil: 'networkidle2' });
        await page.type('input[name="username"], input[name="email"]', 'admin123');
        await page.type('input[name="password"]', 'admin123');

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);
        
        console.log("Logged in!");

        for (let feature of data.features) {
            try {
                console.log(`\n--- Processing ${feature.title} ---`);
                await page.goto(feature.url, { waitUntil: 'networkidle2', timeout: 15000 });
                
                // Find all visible buttons and crud features on index page
                let indexData = await page.evaluate(() => {
                    const btns = Array.from(document.querySelectorAll('button, a.btn, .action-btn'));
                    const btnTexts = btns.map(b => b.innerText.trim()).filter(t => t.length > 0 && t.length < 30);
                    
                    const hasEdit = !!document.querySelector('.fa-edit, .fa-pencil, .edit-btn, .bx-edit');
                    const hasDelete = !!document.querySelector('.fa-trash, .delete-btn, .bx-trash');
                    const hasTable = !!document.querySelector('table');

                    let addBtn = btns.find(b => b.innerText.trim().toLowerCase().includes('add') || b.innerText.trim().toLowerCase().includes('create') || b.innerText.trim().toLowerCase().includes('new'));
                    
                    let navigateUrl = null;
                    if (addBtn && addBtn.tagName.toLowerCase() === 'a' && addBtn.href && !addBtn.href.includes('#') && addBtn.href !== window.location.href) {
                        navigateUrl = addBtn.href;
                    }
                    
                    let opensModal = false;
                    if (addBtn && (addBtn.dataset.toggle === 'modal' || addBtn.dataset.bsToggle === 'modal' || addBtn.href?.includes('#'))) {
                        opensModal = true;
                    }

                    return { 
                        buttons: Array.from(new Set(btnTexts)), 
                        hasEdit, hasDelete, hasTable, 
                        navigateUrl, opensModal
                    };
                });
                
                let fields = [];

                if (indexData.navigateUrl) {
                    console.log(`Navigating to create page: ${indexData.navigateUrl}`);
                    await page.goto(indexData.navigateUrl, { waitUntil: 'networkidle2', timeout: 10000 });
                    fields = await extractFields(page);
                } else if (indexData.opensModal || indexData.buttons.some(b => b.toLowerCase().includes('add') || b.toLowerCase().includes('create'))) {
                    console.log(`Clicking add button to open modal...`);
                    await page.evaluate(() => {
                        const btns = Array.from(document.querySelectorAll('button, a.btn'));
                        const addBtn = btns.find(b => b.innerText.trim().toLowerCase().includes('add') || b.innerText.trim().toLowerCase().includes('create') || b.innerText.trim().toLowerCase().includes('new'));
                        if (addBtn) addBtn.click();
                    });
                    
                    await new Promise(r => setTimeout(r, 1500)); // wait for modal animation
                    fields = await extractFields(page);
                } else {
                    // Try to extract from the current page anyway
                    fields = await extractFields(page);
                }

                console.log(`Found ${fields.length} fields. CRUD: Table=${indexData.hasTable}, Edit=${indexData.hasEdit}, Del=${indexData.hasDelete}`);

                // Update MD file
                const safeTitle = feature.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const fileName = `${safeTitle}.md`;
                const filePath = path.join(outDir, fileName);

                if (fs.existsSync(filePath)) {
                    let content = fs.readFileSync(filePath, 'utf-8');
                    
                    let crudStr = `**CRUD Features detected on Index Page:**\n`;
                    crudStr += `- **List / Read:** ${indexData.hasTable ? 'Yes (Data Table found)' : 'No obvious table'}\n`;
                    crudStr += `- **Create:** ${fields.length > 0 ? 'Yes (Add Form found)' : 'Unknown'}\n`;
                    crudStr += `- **Update / Edit:** ${indexData.hasEdit ? 'Yes (Edit icons found)' : 'Unknown'}\n`;
                    crudStr += `- **Delete:** ${indexData.hasDelete ? 'Yes (Delete icons found)' : 'Unknown'}\n\n`;

                    let fieldsStr = fields.map(f => `- **${f.label}** (\`${f.name || 'unknown'}\`, type: ${f.type})`).join('\n');
                    if (!fieldsStr) fieldsStr = "- *No explicit form fields detected.*";

                    const replacement = `### Input Fields (Form Data)\n*The following actual form fields were extracted by interacting with the page (modals/creation forms):*\n${fieldsStr}\n\n### Action Buttons & CRUD Functions\n*The following actual buttons and CRUD capabilities were detected:*\n${crudStr}\n**Available Action Buttons on Index:**\n${indexData.buttons.map(b => `- \`${b}\``).join('\n')}\n\n## Implementation Details`;
                    
                    content = content.replace(/### Input Fields \(Form Data\)[\s\S]*?## Implementation Details/, replacement);
                    
                    fs.writeFileSync(filePath, content);
                }

            } catch(e) {
                console.log(`Failed processing ${feature.url}: ${e.message}`);
            }
        }
        
        await browser.close();
        console.log("Finished deep scraping!");
    } catch (err) {
        console.error(err);
    }
})();

async function extractFields(page) {
    return await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
        let extracted = [];
        inputs.forEach(el => {
            if (el.type === 'hidden' || el.type === 'submit' || el.type === 'button') return;
            
            // Exclude common search boxes in headers
            if (el.name === 'search' || el.placeholder?.toLowerCase().includes('search') || el.classList.contains('dataTables_filter')) return;

            let labelText = '';
            if (el.id) {
                const label = document.querySelector(`label[for="${el.id}"]`);
                if (label) labelText = label.innerText.trim();
            }
            if (!labelText) {
                let p = el.parentElement;
                while(p && p.tagName !== 'FORM' && p.tagName !== 'BODY') {
                    if (p.tagName === 'LABEL') {
                        labelText = p.innerText.trim();
                        break;
                    }
                    const lbl = p.querySelector('label');
                    if (lbl) {
                        labelText = lbl.innerText.trim();
                        break;
                    }
                    p = p.parentElement;
                }
            }
            if (!labelText && el.placeholder) labelText = el.placeholder;
            if (!labelText && el.name) labelText = el.name;
            
            labelText = labelText.replace(/\*/g, '').replace(/\n/g, ' ').trim();
            
            extracted.push({
                name: el.name,
                type: el.tagName.toLowerCase() === 'select' ? 'select' : (el.tagName.toLowerCase() === 'textarea' ? 'textarea' : el.type),
                label: labelText || 'Unnamed Field'
            });
        });
        
        const unique = [];
        const seen = new Set();
        extracted.forEach(e => {
            if (e.name && !seen.has(e.name)) {
                seen.add(e.name);
                unique.push(e);
            }
        });
        
        return unique;
    });
}
