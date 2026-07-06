# View All Projects

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/projects](https://digitalhr.cyclonenepal.com/admin/projects)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Project Name** (`name`, type: text)
- **Project Start Date** (`start_date`, type: date)
- **Project Deadline** (`deadline`, type: date)
- **Project Status** (`status`, type: select)
- **Project Cost** (`cost`, type: number)
- **Priority** (`priority`, type: select)
- **Estimated Hours** (`estimated_hours`, type: number)
- **Department** (`department_ids[]`, type: select)
- **Client** (`client_id`, type: select)
- **Upload Project Logo** (`cover_pic`, type: file)
- **Project Leader** (`project_leader[]`, type: select)
- **Assign Member** (`assigned_member[]`, type: select)
- **Branch** (`attachments[]`, type: file)
- **Description** (`description`, type: textarea)
- **Client Email** (`email`, type: email)
- **Client Contact Number** (`contact_no`, type: text)
- **Address** (`address`, type: text)
- **Country** (`country`, type: text)
- **Upload Client Profile** (`avatar`, type: file)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** No obvious table
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Create Project`
- `Filter`
- `Reset`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/view_all_projects.js` or equivalent
- `controllers/view_all_projectsController.js`
- `routes/view_all_projects.js`
- `views/view_all_projects/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Clients](./clients.md)
- [Project](./project.md)
