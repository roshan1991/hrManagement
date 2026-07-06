# Payroll Setting

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/salary-components](https://digitalhr.cyclonenepal.com/admin/salary-components)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Name** (`name`, type: text)
- **Component Type** (`component_type`, type: select)
- **Value Type** (`value_type`, type: select)
- **Component Value (Annual)** (`annual_component_value`, type: number)
- **Name** (`apply_for_all`, type: checkbox)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Salary Component`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/payroll_setting.js` or equivalent
- `controllers/payroll_settingController.js`
- `routes/payroll_setting.js`
- `views/payroll_setting/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*