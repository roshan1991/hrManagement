# Attendance Report

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/attendance/export](https://digitalhr.cyclonenepal.com/admin/attendance/export)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **branch_id** (`branch_id`, type: select)
- **department_id** (`department_id`, type: select)
- **employee_id** (`employee_id`, type: select)
- **date_option** (`date_option`, type: select)
- **index.attendance_year_example** (`year`, type: number)
- **attendance_date** (`attendance_date`, type: text)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** No obvious table
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `CSV Export`
- `Reset`
- `Clear`
- `Apply`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/attendance_report.js` or equivalent
- `controllers/attendance_reportController.js`
- `routes/attendance_report.js`
- `views/attendance_report/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Employees](./employees.md)
