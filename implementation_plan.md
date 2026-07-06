# Digital HR System Implementation Plan

We are embarking on building a complete HR System from scratch, translating the 70+ scraped markdown blueprints into a functional, modern application.

## User Review Required

> [!CAUTION]
> Building a system with over 70 complete modules is a massive undertaking. We cannot generate the entire system in a single step. Instead, we must build it iteratively in **Phases**. 
> 
> Please review the architecture and the proposed phased approach below. Once approved, we will immediately begin **Phase 1: Project Initialization & Core Entities**.

## Open Questions

> [!IMPORTANT]
> 1. **MySQL Setup:** Do you already have a MySQL server running locally on your Windows machine (e.g., via XAMPP, WAMP, or standalone MySQL)? If so, what are the credentials (username/password) and desired database name?
> 2. **ORM Preference:** I propose using **Sequelize** as the ORM for Node.js + MySQL to automatically manage tables and foreign keys. Are you okay with this?
> 3. **UI/UX Aesthetics:** You requested Bootstrap. I will ensure we use modern, rich aesthetics (e.g., subtle shadows, clean typography, vibrant primary colors) on top of Bootstrap to make it feel premium, as required by standard web app guidelines.

## Proposed Architecture

### Backend (Node.js)
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize (for rapid model and relationship generation)
- **Authentication:** JWT (JSON Web Tokens)
- **Folder Structure:**
  - `models/` (Database schemas based on MD blueprints)
  - `controllers/` (Business logic)
  - `routes/` (API endpoints)
  - `middlewares/` (Auth & Validation)

### Frontend (React)
- **Build Tool:** Vite (for fast compilation)
- **Styling:** Bootstrap (via `react-bootstrap` for component encapsulation) + Custom CSS for premium aesthetics.
- **Routing:** React Router v6
- **Folder Structure:**
  - `components/` (Reusable UI like Sidebar from `menu_structure.json`)
  - `pages/` (CRUD views for each module)
  - `services/` (Axios API calls to Node.js backend)

## Development Phases

### Phase 1: Foundation & Core Setup (Current Target)
1. Initialize Node.js Express server and React Vite app in the workspace.
2. Configure MySQL connection and Sequelize ORM.
3. Build the core Layout (Premium Sidebar & Header using Bootstrap).
4. Implement the **Company Management** modules (Company, Branch, Department, Post).

### Phase 2: User & Employee Management
1. Authentication (Login / JWT).
2. Users module.
3. Employees core module (with complex relationships to Branch/Department).

### Phase 3: Operations
1. Attendance & Leaves modules.
2. Projects, Tasks, and Clients.

### Phase 4+: Advanced Features
1. Payroll, Loans, Recruitment, Assets, and System Settings.

## Verification Plan

### Automated/Local Verification
- Run `npm run dev` for frontend and `npm start` for backend.
- Verify MySQL tables are created successfully.
- Ensure the Sidebar exactly matches `menu_structure.json`.

### Manual Verification
- You will be asked to view the React frontend in your browser, test the layout aesthetics, and interact with the first generated CRUD forms (Company, Branch).
