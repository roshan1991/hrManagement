const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('dashboard.html', 'utf-8');
const $ = cheerio.load(html);

const menuStructure = [];

$('ul.sidebar-menu > li.nav-item').each((i, el) => {
    const $el = $(el);
    const $link = $el.find('> a.nav-link');
    if (!$link.length) return;
    
    const title = $link.find('.link-title').text().trim() || $link.text().trim();
    if (!title) return;
    
    let url = $link.attr('href');
    if (url === '#' || url.includes('javascript:')) url = null;
    
    const targetId = $link.attr('href');
    const $subMenuDiv = targetId && targetId.startsWith('#') ? $(targetId) : $el.find('.collapse');
    
    const children = [];
    if ($subMenuDiv.length) {
        $subMenuDiv.find('ul.sub-menu > li.nav-item').each((j, subEl) => {
            const $subLink = $(subEl).find('> a.nav-link');
            if ($subLink.length) {
                const subTitle = $subLink.text().trim();
                const subUrl = $subLink.attr('href');
                if (subTitle) {
                    children.push({
                        title: subTitle,
                        url: (subUrl === '#' || subUrl.includes('javascript:')) ? null : subUrl
                    });
                }
            }
        });
    }
    
    menuStructure.push({
        title,
        url: url,
        children: children.length > 0 ? children : undefined
    });
});

fs.writeFileSync('menu_structure.json', JSON.stringify(menuStructure, null, 2));
console.log("Parsed successfully!");
