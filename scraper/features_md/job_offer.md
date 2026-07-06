# Job Offer

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/recruitment/job-offer](https://digitalhr.cyclonenepal.com/admin/recruitment/job-offer)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Job** (`job_id`, type: select)
- **Applicant** (`applicant_id`, type: select)
- **Offer Expiry Date** (`expiry_date`, type: date)
- **Expected Joining Date** (`joining_date`, type: date)
- **Salary** (`salary`, type: number)
- **Salary Rate** (`salary_rate`, type: select)
- **Description** (`description`, type: textarea)
- **Benefits / Perks** (`benefits`, type: textarea)
- **Offer Letter (PDF/Doc)** (`offer_letter`, type: file)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** Yes (Data Table found)
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Add Job Offer`
- `Update`
- `Cancel`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/job_offer.js` or equivalent
- `controllers/job_offerController.js`
- `routes/job_offer.js`
- `views/job_offer/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*
## Dependencies & Related Modules
*To fully implement this CRUD feature, the following modules are referenced and should likely be developed first:*
- [Job](./job.md)
