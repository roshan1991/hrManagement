# Resignation

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/resignation](https://digitalhr.cyclonenepal.com/admin/resignation)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Department** (`department_id`, type: select)
- **Employee** (`employee_id`, type: select)
- **Resignation Date** (`resignation_date`, type: date)
- **Last Working Date** (`last_working_day`, type: date)
- **Reason** (`reason`, type: textarea)
- **Document** (`document`, type: file)
- **Status** (`status`, type: select)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Resignation`
- `Filter`
- `Reset`
- `Submit`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/resignation.js` or equivalent
- `controllers/resignationController.js`
- `routes/resignation.js`
- `views/resignation/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Employees](./employees.md)
