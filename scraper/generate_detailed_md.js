const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('dashboard_data.json', 'utf-8'));
const outDir = path.join(__dirname, 'features_md');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

// Helper to guess fields based on feature name
function getFieldsAndButtons(title) {
    const lowerTitle = title.toLowerCase();
    
    let inputs = ['Name / Title (Text)', 'Description (Textarea)', 'Status (Active/Inactive)'];
    let buttons = ['Create New ' + title, 'Edit', 'Delete', 'Save Changes'];

    if (lowerTitle.includes('company')) {
        inputs = ['Company Name', 'Registration Number', 'Tax/VAT Number', 'Address', 'Phone Number', 'Email', 'Website', 'Logo (File)'];
    } else if (lowerTitle.includes('branch')) {
        inputs = ['Branch Name', 'Company (Select)', 'Location/Address', 'Contact Number', 'Branch Manager (Select)'];
    } else if (lowerTitle.includes('department')) {
        inputs = ['Department Name', 'Branch (Select)', 'Department Head (Select)', 'Description'];
    } else if (lowerTitle.includes('employee') && !lowerTitle.includes('salary') && !lowerTitle.includes('contract')) {
        inputs = ['First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth', 'Gender', 'Address', 'Department (Select)', 'Designation (Select)', 'Date of Joining', 'Base Salary', 'Profile Picture (File)'];
        buttons.push('Upload Document', 'View Profile');
    } else if (lowerTitle.includes('attendance')) {
        inputs = ['Employee (Select)', 'Date', 'Check In Time', 'Check Out Time', 'Note', 'Status (Present/Absent/Late/Half-day)'];
        buttons = ['Clock In', 'Clock Out', 'Manual Entry', 'Export Report'];
    } else if (lowerTitle.includes('leave')) {
        inputs = ['Employee (Select)', 'Leave Type (Select)', 'Start Date', 'End Date', 'Reason', 'Attachment (File)', 'Status (Pending/Approved/Rejected)'];
        buttons = ['Apply for Leave', 'Approve', 'Reject', 'Cancel Leave'];
    } else if (lowerTitle.includes('payroll') || lowerTitle.includes('salary')) {
        inputs = ['Employee (Select)', 'Month/Year', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary', 'Payment Method', 'Status (Paid/Unpaid)'];
        buttons = ['Generate Payslip', 'Process Payment', 'Export to PDF', 'Send via Email'];
    } else if (lowerTitle.includes('loan')) {
        inputs = ['Employee (Select)', 'Loan Type', 'Amount', 'Interest Rate', 'Duration (Months)', 'EMI Amount', 'Reason', 'Approval Status'];
        buttons = ['Apply Loan', 'Approve', 'Reject', 'Calculate EMI'];
    } else if (lowerTitle.includes('project') || lowerTitle.includes('task')) {
        inputs = ['Title', 'Description', 'Client (Select)', 'Assigned To (Select Multiple)', 'Start Date', 'Deadline', 'Priority', 'Status (To Do/In Progress/Done)'];
        buttons = ['Add Task', 'Update Status', 'Mark as Complete', 'Add Comment'];
    } else if (lowerTitle.includes('client')) {
        inputs = ['Client Name', 'Company', 'Email', 'Phone', 'Address', 'Contract Document (File)'];
    } else if (lowerTitle.includes('asset')) {
        inputs = ['Asset Name', 'Asset Type', 'Serial Number', 'Purchase Date', 'Value', 'Assigned To (Employee)', 'Condition/Status'];
        buttons = ['Assign Asset', 'Return Asset', 'Mark as Damaged'];
    } else if (lowerTitle.includes('recruitment') || lowerTitle.includes('job')) {
        inputs = ['Job Title', 'Department', 'Location', 'Job Description', 'Requirements', 'Employment Type', 'Salary Range', 'Status (Open/Closed)'];
        buttons = ['Post Job', 'Close Job', 'View Applicants'];
    } else if (lowerTitle.includes('setting') || lowerTitle.includes('role')) {
        inputs = ['Role Name', 'Permissions (Checkboxes)', 'App Name', 'Currency', 'Timezone'];
        buttons = ['Save Settings', 'Restore Defaults'];
    } else if (lowerTitle.includes('holiday')) {
        inputs = ['Holiday Name', 'Date', 'Type (Public/Company)', 'Description'];
    } else if (lowerTitle.includes('user')) {
        inputs = ['Username', 'Email', 'Password', 'Confirm Password', 'Role (Select)', 'Status'];
    }

    return { inputs, buttons };
}

let indexContent = `# Digital HR System Features\n\nThis document serves as an index for all the features found in the Digital HR system. Each link points to a detailed markdown file describing the feature, which will be useful for creating a system from scratch.\n\n## Feature List\n\n`;

data.features.forEach((feature) => {
    const safeTitle = feature.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${safeTitle}.md`;
    const filePath = path.join(outDir, fileName);
    
    const { inputs, buttons } = getFieldsAndButtons(feature.title);
    
    const inputsMd = inputs.map(i => `- ${i}`).join('\n');
    const buttonsMd = buttons.map(b => `- \`${b}\``).join('\n');
    
    const content = `# ${feature.title}\n\n## Overview\nThis feature is part of the Digital HR system.\n\n## Source URL\n[${feature.url}](${feature.url})\n\n## UI Components Required\n\n### Input Fields (Form Data)\n*The following inputs should be created for this module:*\n${inputsMd}\n\n### Action Buttons\n*The following buttons/actions should be created for this module:*\n${buttonsMd}\n\n## Implementation Details\n*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*\n\n### Potential Files Needed\n- \`models/${safeTitle}.js\` or equivalent\n- \`controllers/${safeTitle}Controller.js\`\n- \`routes/${safeTitle}.js\`\n- \`views/${safeTitle}/index.html\` (or React/Vue components)\n\n---\n*Note: This is an auto-generated template with estimated fields based on standard HR systems.*`;
    
    fs.writeFileSync(filePath, content);
    indexContent += `- [${feature.title}](./features_md/${fileName})\n`;
});

fs.writeFileSync(path.join(__dirname, 'features_index.md'), indexContent);
console.log('Markdown files updated with Input Fields and Buttons!');
