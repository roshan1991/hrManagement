const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('dashboard_data.json', 'utf-8'));
const outDir = path.join(__dirname, 'features_md');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

let indexContent = `# Digital HR System Features\n\nThis document serves as an index for all the features found in the Digital HR system. Each link points to a detailed markdown file describing the feature, which will be useful for creating a system from scratch.\n\n## Feature List\n\n`;

data.features.forEach((feature) => {
    // Sanitize filename
    const safeTitle = feature.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${safeTitle}.md`;
    const filePath = path.join(outDir, fileName);
    
    const content = `# ${feature.title}\n\n## Overview\nThis feature is part of the Digital HR system.\n\n## Source URL\n[${feature.url}](${feature.url})\n\n## Implementation Details\n*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*\n\n### Potential Files Needed\n- \`models/${safeTitle}.js\` or equivalent\n- \`controllers/${safeTitle}Controller.js\`\n- \`routes/${safeTitle}.js\`\n- \`views/${safeTitle}/index.html\` (or React/Vue components)\n\n---\n*Note: This is an auto-generated template based on the scraped sidebar menu.*`;
    
    fs.writeFileSync(filePath, content);
    
    // Add to index
    indexContent += `- [${feature.title}](./features_md/${fileName})\n`;
});

fs.writeFileSync(path.join(__dirname, 'features_index.md'), indexContent);
console.log('Markdown files generated in features_md directory and index created as features_index.md');
