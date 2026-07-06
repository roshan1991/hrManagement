# Branch

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/branch](https://digitalhr.cyclonenepal.com/admin/branch)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Company Name** (`company_id`, type: select)
- **Branch Name** (`name`, type: text)
- **Company Name** (`branch_head_id`, type: select)
- **Address** (`address`, type: text)
- **Phone No** (`phone`, type: number)
- **Branch Location Latitude** (`branch_location_latitude`, type: text)
- **Branch Location Longitude** (`branch_location_longitude`, type: text)
- **Company Name** (`is_active`, type: select)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Branch`
- `Filter`
- `Reset`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/branch.js` or equivalent
- `controllers/branchController.js`
- `routes/branch.js`
- `views/branch/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Company](./company.md)
