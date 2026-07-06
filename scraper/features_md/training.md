# Training

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/training](https://digitalhr.cyclonenepal.com/admin/training)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Department** (`department_id[]`, type: select)
- **Employee** (`employee_id[]`, type: select)
- **Training Type** (`training_type_id`, type: select)
- **Start Date** (`start_date`, type: date)
- **End Date** (`end_date`, type: date)
- **Start Time** (`start_time`, type: time)
- **End Time** (`end_time`, type: time)
- **Cost:** (`cost`, type: number)
- **Venue** (`venue`, type: text)
- **Description** (`description`, type: textarea)
- **Certificate** (`certificate`, type: file)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Training`
- `Filter`
- `Reset`
- `Close`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/training.js` or equivalent
- `controllers/trainingController.js`
- `routes/training.js`
- `views/training/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Employees](./employees.md)
- [Training Type](./training_type.md)
