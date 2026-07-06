# Company

## Overview
This feature is part of the Digital HR system.

## Source URL
[https://digitalhr.cyclonenepal.com/admin/company](https://digitalhr.cyclonenepal.com/admin/company)

## UI Components Required

### Input Fields (Form Data)
*The following actual form fields were extracted by interacting with the page (modals/creation forms):*
- **Company Name** (`name`, type: text)
- **Company Owner** (`owner_name`, type: text)
- **Address** (`address`, type: text)
- **Address** (`email`, type: email)
- **Phone No** (`phone`, type: number)
- **Website Url** (`website_url`, type: url)
- **Check Office Off Days** (`weekend[]`, type: checkbox)
- **Company Name** (`count_holiday_weekend`, type: checkbox)
- **Upload Logo** (`logo`, type: file)

### Action Buttons & CRUD Functions
*The following actual buttons and CRUD capabilities were detected:*
**CRUD Features detected on Index Page:**
- **List / Read:** No obvious table
- **Create:** Yes (Add Form found)
- **Update / Edit:** Unknown
- **Delete:** Unknown


**Available Action Buttons on Index:**
- `Update Company`

## Implementation Details
*Describe the database tables, API endpoints, and UI components needed to build this feature from scratch here.*

### Potential Files Needed
- `models/company.js` or equivalent
- `controllers/companyController.js`
- `routes/company.js`
- `views/company/index.html` (or React/Vue components)

---
*Note: This is an auto-generated template with estimated fields based on standard HR systems.*