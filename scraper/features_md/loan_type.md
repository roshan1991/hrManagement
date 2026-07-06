# Loan Type

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/loan-types](https://digitalhr.cyclonenepal.com/admin/loan-types)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **branch_id** (`branch_id`, type: select)
- **Type** (`type`, type: text)
- **Name** (`name`, type: text)
- **Minimum Amount** (`minimum_amount`, type: number)
- **Maximum Amount** (`maximum_amount`, type: number)
- **Interest Rate %** (`interest_rate`, type: number)
- **Interest Type** (`interest_type`, type: select)
- **Installment Period** (`term`, type: number)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Loan Type`
- `Filter`
- `Reset`
- `Save`
- `Cancel`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/loan_type.js` or equivalent
- `controllers/loan_typeController.js`
- `routes/loan_type.js`
- `views/loan_type/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
