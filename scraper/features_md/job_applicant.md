# Job Applicant

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/recruitment/job-applicant](https://digitalhr.cyclonenepal.com/admin/recruitment/job-applicant)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Select Job** (`job_id`, type: select)
- **Full Name** (`name`, type: text)
- **Email** (`email`, type: email)
- **Phone Number** (`phone`, type: tel)
- **Current Role** (`expertise`, type: text)
- **Address** (`address`, type: text)
- **Notice Period** (`notice_period`, type: text)
- **How did you hear about this job?** (`application_source`, type: text)
- **Resume/CV** (`resume`, type: file)
- **Cover Letter** (`cover_letter`, type: textarea)
- **Profile Photo** (`photo`, type: file)
- **Gender** (`gender`, type: select)
- **Current CTC / Salary** (`current_ctc`, type: text)
- **Date of Birth** (`dob`, type: date)
- **Expected Salary** (`expected_ctc`, type: text)
- **I agree to the Terms & Conditions** (`terms_conditions`, type: checkbox)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Job Applicant`
- `Update`
- `Cancel`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/job_applicant.js` or equivalent
- `controllers/job_applicantController.js`
- `routes/job_applicant.js`
- `views/job_applicant/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Job](./job.md)
