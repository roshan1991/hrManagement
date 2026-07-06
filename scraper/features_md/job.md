# Job

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/recruitment/job](https://digitalhr.cyclonenepal.com/admin/recruitment/job)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Branch** (`branch_id`, type: select)
- **Department** (`department_id`, type: select)
- **Job Category** (`categories`, type: text)
- **Job Type** (`job_type_id`, type: select)
- **Job Title** (`title`, type: text)
- **Skills** (`skills`, type: text)
- **Total Openings** (`total_opening`, type: number)
- **Vacancy Start Date** (`start_date`, type: date)
- **Application Deadline** (`deadline`, type: date)
- **Pay By** (`pay_by`, type: select)
- **Minimum Salary** (`min_salary`, type: number)
- **Maximum Salary** (`max_salary`, type: number)
- **Salary** (`salary`, type: number)
- **Salary Rate** (`salary_rate`, type: select)
- **Show Salary on website** (`disclose_salary_on_site`, type: checkbox)
- **Job Description** (`job_description`, type: textarea)
- **Requirements** (`requirements`, type: textarea)
- **Benefits** (`benefits`, type: textarea)
- **Required Experience** (`experience`, type: text)
- **Photo** (`required_fields[]`, type: checkbox)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Job`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/job.js` or equivalent
- `controllers/jobController.js`
- `routes/job.js`
- `views/job/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Branch](./branch.md)
- [Department](./department.md)
- [Job Type](./job_type.md)
