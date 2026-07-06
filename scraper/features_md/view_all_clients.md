# View All Clients

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/clients](https://digitalhr.cyclonenepal.com/admin/clients)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Client Name** (`name`, type: text)
- **Client Email** (`email`, type: email)
- **Client Contact Number** (`contact_no`, type: text)
- **Address** (`address`, type: text)
- **Country** (`country`, type: text)
- **Upload Client Profile** (`avatar`, type: file)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Client`
- `Filter`
- `Reset`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/view_all_clients.js` or equivalent
- `controllers/view_all_clientsController.js`
- `routes/view_all_clients.js`
- `views/view_all_clients/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
