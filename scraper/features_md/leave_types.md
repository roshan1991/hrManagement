# Leave Types

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/leaves](https://digitalhr.cyclonenepal.com/admin/leaves)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **branch_id** (`branch_id`, type: select)
- **Leave Type** (`type`, type: text)
- **Leave Type Name** (`name`, type: text)
- **Applies to Gender** (`gender`, type: select)
- **Is Paid Leave** (`leave_paid`, type: select)
- **Leave Allocated Days** (`leave_allocated`, type: number)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Leave Type`
- `Filter`
- `Reset`
- `Save`
- `Cancel`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/leave_types.js` or equivalent
- `controllers/leave_typesController.js`
- `routes/leave_types.js`
- `views/leave_types/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
