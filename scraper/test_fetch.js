const fs = require('fs');

async function testFetch() {
    try {
        console.log("Fetching login page...");
        const loginPageRes = await fetch('https://digitalhr.cyclonenepal.com/admin/login');
        const loginPageHtml = await loginPageRes.text();
        const cookie = loginPageRes.headers.get('set-cookie');
        
        let tokenMatch = loginPageHtml.match(/name="_token" value="(.*?)"/);
        let token = tokenMatch ? tokenMatch[1] : '';
        console.log("Found CSRF Token:", token);

        console.log("Attempting Login...");
        const params = new URLSearchParams();
        params.append('_token', token);
        params.append('username', 'admin123'); // Could be email, let's try username
        params.append('password', 'admin123');

        const loginRes = await fetch('https://digitalhr.cyclonenepal.com/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie || ''
            },
            body: params.toString(),
            redirect: 'manual'
        });

        const newCookie = loginRes.headers.get('set-cookie') || cookie;
        console.log("Login Status:", loginRes.status);
        console.log("Redirect URL:", loginRes.headers.get('location'));

        // Try fetching Job Type page
        const testRes = await fetch('https://digitalhr.cyclonenepal.com/admin/recruitment/job-type', {
            headers: { 'Cookie': newCookie }
        });
        
        const testHtml = await testRes.text();
        
        fs.writeFileSync('test_page.html', testHtml);
        console.log("Saved test_page.html. Check if it contains the actual buttons or redirected to login.");
    } catch(err) {
        console.error(err);
    }
}
testFetch();
