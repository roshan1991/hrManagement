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
        
        console.log("Navigating to login page...");
        await page.goto('https://digitalhr.cyclonenepal.com/admin/login', { waitUntil: 'networkidle2' });

        await page.type('input[name="username"], input[name="email"]', 'admin123');
        await page.type('input[name="password"]', 'admin123');

        console.log("Clicking submit...");
        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);
        
        console.log("Logged in!");

        // Loop through some features to extract buttons
        // Let's scrape the buttons for all features
        for (let feature of data.features) {
            try {
                console.log(`Scraping buttons for ${feature.title} at ${feature.url}...`);
                await page.goto(feature.url, { waitUntil: 'networkidle2', timeout: 10000 });
                
                const buttons = await page.evaluate(() => {
                    // Find all buttons or links that look like actions (.btn, button)
                    const btns = Array.from(document.querySelectorAll('button, a.btn, .action-btn, input[type="submit"], input[type="button"]'));
                    const uniqueBtns = new Set();
                    btns.forEach(b => {
                        let text = b.innerText ? b.innerText.trim() : (b.value ? b.value.trim() : '');
                        if (text && text.length < 30) {
                            uniqueBtns.add(text);
                        }
                    });
                    return Array.from(uniqueBtns);
                });

                console.log(`Found buttons:`, buttons);

                // Update the corresponding markdown file
                const safeTitle = feature.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const fileName = `${safeTitle}.md`;
                const filePath = path.join(outDir, fileName);

                if (fs.existsSync(filePath)) {
                    let content = fs.readFileSync(filePath, 'utf-8');
                    
                    // Replace the action buttons list
                    let buttonsMd = buttons.map(b => `- \`${b}\``).join('\n');
                    if (!buttonsMd) buttonsMd = "- *No explicit buttons found on page.*";

                    content = content.replace(/### Action Buttons\n\*The following buttons\/actions should be created for this module:\*\n([\s\S]*?)## Implementation Details/, `### Action Buttons\n*The following actual buttons were found on the page:*\n${buttonsMd}\n\n## Implementation Details`);
                    
                    fs.writeFileSync(filePath, content);
                }
            } catch(e) {
                console.log(`Error scraping ${feature.url}:`, e.message);
            }
        }
        
        await browser.close();
        console.log("Finished scraping all pages and updating MD files.");
    } catch (err) {
        console.error("Fatal Error:", err);
    }
})();
