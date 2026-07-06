const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        console.log("Launching browser for menu structure...");
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
        
        console.log("Logged in! Extracting menu structure...");

        // Save HTML for debugging
        const html = await page.content();
        fs.writeFileSync('dashboard.html', html);

        const menuStructure = await page.evaluate(() => {
            // Find the main sidebar navigation
            const possibleSidebars = document.querySelectorAll('.sidebar, .main-sidebar, aside, #sidebar, .nav-sidebar, .sidebar-menu, nav');
            let sidebar = null;
            
            // Heuristic: Find the sidebar that contains the most links
            let maxLinks = 0;
            possibleSidebars.forEach(el => {
                const links = el.querySelectorAll('a').length;
                if (links > maxLinks) {
                    maxLinks = links;
                    sidebar = el;
                }
            });

            if (!sidebar) sidebar = document.body;

            function extractMenu(parentEl) {
                const items = [];
                // Find all immediate list items or accordion headers
                const children = parentEl.querySelectorAll(':scope > li, :scope > .nav-item, :scope > .menu-item, :scope > div > li');
                
                let toIterate = children;
                if (children.length === 0) {
                    // Try looking for all a tags directly if li's aren't used
                    toIterate = parentEl.querySelectorAll('a');
                }

                for (let el of toIterate) {
                    const link = el.tagName.toLowerCase() === 'a' ? el : el.querySelector('a');
                    if (!link) continue;
                    
                    const text = link.innerText.trim();
                    const href = link.href;
                    
                    if (!text) continue; // Skip empty links

                    // Find submenu (ul inside the li, or next sibling if it's an accordion)
                    let childrenItems = [];
                    if (el.tagName.toLowerCase() !== 'a') {
                        const subMenu = el.querySelector('ul, .collapse, .submenu, .sub-menu, .dropdown-menu');
                        if (subMenu) {
                            childrenItems = extractMenu(subMenu.tagName.toLowerCase() === 'ul' ? subMenu : (subMenu.querySelector('ul') || subMenu));
                        }
                    }

                    items.push({
                        title: text,
                        url: href.includes('javascript:void') || href.includes('#') ? null : href,
                        children: childrenItems.length > 0 ? childrenItems : undefined
                    });
                }
                return items;
            }

            // The sidebar usually has a root ul
            const rootUl = sidebar.querySelector('ul') || sidebar;
            return extractMenu(rootUl);
        });

        fs.writeFileSync('menu_structure.json', JSON.stringify(menuStructure, null, 2));
        console.log("Menu structure saved to menu_structure.json");

        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
