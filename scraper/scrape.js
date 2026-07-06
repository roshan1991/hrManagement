const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        console.log("Navigating to login page...");
        await page.goto('https://digitalhr.cyclonenepal.com/admin/login', { waitUntil: 'networkidle2' });

        console.log("Finding input fields...");
        const inputs = await page.evaluate(() => {
            const fields = Array.from(document.querySelectorAll('input'));
            return fields.map(f => ({ name: f.name, type: f.type, id: f.id }));
        });
        console.log("Found inputs:", inputs);
        
        let userField = inputs.find(i => i.type === 'text' || i.type === 'email' || i.name.includes('user') || i.name.includes('email'));
        let passField = inputs.find(i => i.type === 'password' || i.name.includes('pass'));
        
        if (!userField || !passField) {
            console.log("Could not identify input fields automatically. Trying generic selectors.");
            await page.type('input[type="text"], input[type="email"]', 'admin123');
            await page.type('input[type="password"]', 'admin123');
        } else {
            const userSelector = userField.id ? `#${userField.id}` : `input[name="${userField.name}"]`;
            const passSelector = passField.id ? `#${passField.id}` : `input[name="${passField.name}"]`;
            await page.type(userSelector, 'admin123');
            await page.type(passSelector, 'admin123');
        }

        console.log("Clicking submit...");
        await Promise.all([
            page.click('button[type="submit"], input[type="submit"], .btn-primary'),
            page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => console.log("Navigation timeout, proceeding anyway..."))
        ]);
        
        console.log("Logged in. Getting page title...");
        const title = await page.title();
        console.log("Title after login:", title);
        
        console.log("Extracting features from sidebar or main menu...");
        const features = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'));
            const uniqueLinks = [];
            const seen = new Set();
            for (let a of links) {
                const text = a.innerText.trim();
                const href = a.href;
                if (text && href && !href.includes('javascript:void(0)') && !href.includes('#')) {
                    const key = text + href;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueLinks.push({ title: text, url: href });
                    }
                }
            }
            return uniqueLinks;
        });

        const dashboardData = {
            title: title,
            features: features
        };
        
        fs.writeFileSync('dashboard_data.json', JSON.stringify(dashboardData, null, 2));
        console.log("Successfully wrote features to dashboard_data.json");
        
        await browser.close();
    } catch (err) {
        console.error("Error during scraping:", err);
    }
})();
