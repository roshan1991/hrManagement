# Assets

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/assets](https://digitalhr.cyclonenepal.com/admin/assets)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Type** (`type_id`, type: select)
- **Name** (`name`, type: text)
- **Asset Code** (`asset_code`, type: text)
- **Asset Serial Number** (`asset_serial_no`, type: text)
- **Purchased Date** (`purchased_date`, type: date)
- **Warranty Available** (`warranty_available`, type: select)
- **Warranty End Date** (`warranty_end_date`, type: date)
- **Is Available For Employee** (`is_available`, type: select)
- **Upload Image** (`image`, type: file)
- **Description** (`note`, type: textarea)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Asset`
- `Filter`
- `Reset`
- `Assign to Employee`
- `Close`
- `Assign Asset`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/assets.js` or equivalent
- `controllers/assetsController.js`
- `routes/assets.js`
- `views/assets/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Employees](./employees.md)
