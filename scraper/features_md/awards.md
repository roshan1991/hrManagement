# Awards

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/awards](https://digitalhr.cyclonenepal.com/admin/awards)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Department** (`department_id`, type: select)
- **Employee** (`employee_id`, type: select)
- **Award Name** (`award_type_id`, type: select)
- **Gift item** (`gift_item`, type: text)
- **Award Base** (`award_base`, type: select)
- **Awarded Date** (`awarded_date`, type: date)
- **Awarded By** (`awarded_by`, type: text)
- **Award Description** (`award_description`, type: textarea)
- **Gift Description** (`gift_description`, type: textarea)
- **Upload Attachments** (`attachment`, type: file)
- **Reward Code** (`reward_code`, type: text)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Award`
- `Award Types`
- `Filter`
- `Reset`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/awards.js` or equivalent
- `controllers/awardsController.js`
- `routes/awards.js`
- `views/awards/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Employees](./employees.md)
