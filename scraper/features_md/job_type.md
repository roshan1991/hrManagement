# Job Type

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/recruitment/job-type](https://digitalhr.cyclonenepal.com/admin/recruitment/job-type)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **branch_id** (`branch_id`, type: select)
- **Type** (`type`, type: text)
- **Title** (`title`, type: text)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Job Type`
- `Filter`
- `Reset`
- `Create`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/job_type.js` or equivalent
- `controllers/job_typeController.js`
- `routes/job_type.js`
- `views/job_type/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
