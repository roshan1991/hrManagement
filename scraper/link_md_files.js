const fs = require('fs');
const path = require('path');

const mdDir = path.join(__dirname, 'features_md');
const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));

// Map of common ID fields to their corresponding markdown files
const dependencyMap = {
    'branch_id': 'branch.md',
    'department_id': 'department.md',
    'employee_id': 'employees.md',
    'company_id': 'company.md',
    'user_id': 'users.md',
    'client_id': 'clients.md',
    'project_id': 'project.md',
    'task_id': 'tasks.md',
    'leave_type_id': 'leave_types.md',
    'asset_type_id': 'asset_types.md',
    'job_id': 'job.md',
    'job_type_id': 'job_type.md',
    'training_type_id': 'training_type.md',
    'trainer_id': 'trainer.md',
    'loan_type_id': 'loan_type.md',
    'contract_type_id': 'contract_type.md',
    'award_type_id': 'awards.md'
};

// Also look for keywords in the select inputs to map them
const keywordMap = {
    'branch': 'branch.md',
    'department': 'department.md',
    'employee': 'employees.md',
    'company': 'company.md',
    'user': 'users.md',
    'client': 'clients.md',
    'project': 'project.md',
    'leave type': 'leave_types.md',
    'asset type': 'asset_types.md',
    'job type': 'job_type.md',
    'trainer': 'trainer.md',
    'training type': 'training_type.md',
    'loan type': 'loan_type.md',
    'contract type': 'contract_type.md'
};

files.forEach(file => {
    const filePath = path.join(mdDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the Input Fields section to analyze dependencies
    const inputsMatch = content.match(/### Input Fields[\s\S]*?(?=### Action Buttons)/);
    
    let deps = new Set();

    if (inputsMatch) {
        const inputsText = inputsMatch[0].toLowerCase();
        
        // 1. Check direct _id matches
        for (const [key, depFile] of Object.entries(dependencyMap)) {
            if (inputsText.includes(`\`${key}\``) || inputsText.includes(key)) {
                if (depFile !== file) deps.add(depFile);
            }
        }

        // 2. Check for keywords if it's a select type
        const selectLines = inputsText.split('\n').filter(l => l.includes('type: select'));
        for (const line of selectLines) {
            for (const [key, depFile] of Object.entries(keywordMap)) {
                if (line.includes(key)) {
                    if (depFile !== file) deps.add(depFile);
                }
            }
        }
    }

    // Convert Set to Array and generate Markdown
    if (deps.size > 0) {
        let depsMd = `\n## Dependencies & Related Modules\n*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*\n`;
        Array.from(deps).forEach(depFile => {
            // make a nice title
            let niceTitle = depFile.replace('.md', '').replace(/_/g, ' ');
            niceTitle = niceTitle.replace(/\b\w/g, l => l.toUpperCase());
            depsMd += `- [${niceTitle}](./${depFile})\n`;
        });

        // Remove old dependencies section if it exists
        content = content.replace(/\n## Dependencies & Related Modules[\s\S]*/, '');
        
        // Append new section at the end
        content += depsMd;
        
        fs.writeFileSync(filePath, content);
    }
});

console.log("Successfully linked dependencies across markdown files!");
