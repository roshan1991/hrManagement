const fs = require('fs');

async function scrape() {
    console.log("Fetching login page...");
    const res = await fetch('https://digitalhr.cyclonenepal.com/admin/login');
    const html = await res.text();
    fs.writeFileSync('login.html', html);
    console.log("Saved login.html");
}

scrape();
