# Payroll

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/employee-salaries/payroll](https://digitalhr.cyclonenepal.com/admin/employee-salaries/payroll)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **branch_id** (`branch_id`, type: select)
- **department_id** (`department_id`, type: select)
- **year** (`year`, type: select)
- **salary_cycle** (`salary_cycle`, type: select)
- **month** (`month`, type: select)
- **week** (`week`, type: select)
- **Include Tds** (`include_tds`, type: checkbox)
- **Include SSF** (`include_ssf`, type: checkbox)
- **Include EPF** (`include_pf`, type: checkbox)
- **Include TADA** (`include_tada`, type: checkbox)
- **Include Advance Salary** (`include_advance_salary`, type: checkbox)
- **Use Attendance** (`attendance`, type: checkbox)
- **Payment Method** (`payment_method_id`, type: select)
- **Payment Date** (`paid_on`, type: date)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Generate`
- `Clear`
- `View`
- `Edit`
- `Submit`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/payroll.js` or equivalent
- `controllers/payrollController.js`
- `routes/payroll.js`
- `views/payroll/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
