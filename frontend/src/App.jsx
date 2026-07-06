import React from 'react';
import './assets/css/custom.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Company from './pages/Company';
import Branch from './pages/Branch';
import Notice from './pages/Notice';
import TeamMeeting from './pages/TeamMeeting';
import Event from './pages/Event';
import StaticPageContent from './pages/StaticPageContent';
import Support from './pages/Support';
import AdvanceSalary from './pages/AdvanceSalary';
import AppQr from './pages/AppQr';
import AppSettings from './pages/AppSettings';
import Assets from './pages/Assets';
import AssetReturn from './pages/AssetReturn';
import AssetTypes from './pages/AssetTypes';
import Attendance from './pages/Attendance';
import AttendanceLogs from './pages/AttendanceLogs';
import AttendanceReport from './pages/AttendanceReport';
import AttendanceSetting from './pages/AttendanceSetting';
import Awards from './pages/Awards';
import BiometricDevice from './pages/BiometricDevice';
import Clients from './pages/Clients';
import Complaint from './pages/Complaint';
import Contractor1 from './pages/Contractor1';
import ContractType from './pages/ContractType';
import CycloneNepal from './pages/CycloneNepal';
import Department from './pages/Department';
import EmiCalculator from './pages/EmiCalculator';
import Employees from './pages/Employees';
import EmployeeCardTemplate from './pages/EmployeeCardTemplate';
import EmployeeContract from './pages/EmployeeContract';
import EmployeeSalary from './pages/EmployeeSalary';
import FeatureControl from './pages/FeatureControl';
import Feedback from './pages/Feedback';
import FiscalYear from './pages/FiscalYear';
import GeneralSettings from './pages/GeneralSettings';
import Holidays from './pages/Holidays';
import Interview from './pages/Interview';
import Job from './pages/Job';
import JobApplicant from './pages/JobApplicant';
import JobOffer from './pages/JobOffer';
import JobType from './pages/JobType';
import LeaveApproval from './pages/LeaveApproval';
import LeaveBalance from './pages/LeaveBalance';
import LeaveRequest from './pages/LeaveRequest';
import LeaveTypes from './pages/LeaveTypes';
import LoanList from './pages/LoanList';
import LoanRepayment from './pages/LoanRepayment';
import LoanType from './pages/LoanType';
import LocationLogs from './pages/LocationLogs';
import LogoutRequests from './pages/LogoutRequests';
import LogOut from './pages/LogOut';
import MargaretRobbins from './pages/MargaretRobbins';
import Nfc from './pages/Nfc';
import Notifications from './pages/Notifications';
import OfficeTime from './pages/OfficeTime';
import Onboard from './pages/Onboard';
import PaymentCurrency from './pages/PaymentCurrency';
import Payroll from './pages/Payroll';
import PayrollSetting from './pages/PayrollSetting';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Promotion from './pages/Promotion';
import Qr from './pages/Qr';
import RecommendationType from './pages/RecommendationType';
import Resignation from './pages/Resignation';
import Roles__Permissions from './pages/Roles__Permissions';
import Routers from './pages/Routers';
import Setting from './pages/Setting';
import SettlementRequestList from './pages/SettlementRequestList';
import Tada from './pages/Tada';
import Tasks from './pages/Tasks';
import TaxReport from './pages/TaxReport';
import Termination from './pages/Termination';
import ThemeColor from './pages/ThemeColor';
import Trainer from './pages/Trainer';
import Training from './pages/Training';
import TrainingType from './pages/TrainingType';
import Transfer from './pages/Transfer';
import Users from './pages/Users';
import ViewAll from './pages/ViewAll';
import ViewAllClients from './pages/ViewAllClients';
import ViewAllProjects from './pages/ViewAllProjects';
import Warning from './pages/Warning';

import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Configure global Axios token default
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// =====================
// HR Dashboard Page
// =====================
const Dashboard = () => {
  const stats = [
    { label: 'Total Employees', value: '248', icon: 'ti-users', color: 'primary', change: '+12 this month', changeType: 'up' },
    { label: 'Present Today', value: '196', icon: 'ti-user-check', color: 'success', change: '79% attendance', changeType: 'up' },
    { label: 'Leave Requests', value: '14', icon: 'ti-calendar-off', color: 'warning', change: '6 pending review', changeType: 'neutral' },
    { label: 'Payroll Pending', value: '3', icon: 'ti-credit-card', color: 'danger', change: 'Process by 30th', changeType: 'alert' },
  ];

  const recentActivities = [
    { icon: 'ti-user-plus', color: 'success', text: 'New employee John Doe onboarded', time: '2 hours ago' },
    { icon: 'ti-calendar-off', color: 'warning', text: 'Leave request from Sarah Khan approved', time: '4 hours ago' },
    { icon: 'ti-credit-card', color: 'primary', text: 'Payroll for May 2025 processed', time: '1 day ago' },
    { icon: 'ti-award', color: 'info', text: 'Employee of the month — Rajesh Sharma', time: '2 days ago' },
    { icon: 'ti-alert-triangle', color: 'danger', text: 'Warning issued to 2 employees', time: '3 days ago' },
  ];

  const quickLinks = [
    { label: 'Add Employee', icon: 'ti-user-plus', path: '/employees', color: 'primary' },
    { label: 'Run Payroll', icon: 'ti-credit-card', path: '/payroll', color: 'success' },
    { label: 'Leave Approvals', icon: 'ti-calendar-check', path: '/leave-approval', color: 'warning' },
    { label: 'Attendance', icon: 'ti-clock', path: '/attendance', color: 'info' },
    { label: 'Add Job Post', icon: 'ti-briefcase', path: '/job', color: 'secondary' },
    { label: 'Settings', icon: 'ti-settings', path: '/general-settings', color: 'dark' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="hr-welcome-banner">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h4 className="mb-1 text-white fw-bold">Welcome back, Admin! 👋</h4>
                <p className="mb-0" style={{ opacity: 0.85 }}>
                  Here's what's happening with your HR system today.
                </p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <a href="/attendance" className="btn btn-white btn-sm">
                  <i className="ti ti-clock me-1"></i> Attendance
                </a>
                <a href="/payroll" className="btn btn-outline-white btn-sm">
                  <i className="ti ti-credit-card me-1"></i> Payroll
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row mb-4">
        {stats.map((stat, i) => (
          <div key={i} className="col-sm-6 col-xl-3 mb-4">
            <div className="card hr-stat-card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="content-left">
                    <span className="fw-medium d-block mb-1">{stat.label}</span>
                    <div className="d-flex align-items-center">
                      <h4 className="mb-0 me-2">{stat.value}</h4>
                    </div>
                    <small className={`text-${stat.changeType === 'up' ? 'success' : stat.changeType === 'alert' ? 'danger' : 'muted'} fw-medium`}>
                      {stat.changeType === 'up' && <i className="ti ti-trending-up me-1"></i>}
                      {stat.changeType === 'alert' && <i className="ti ti-alert-triangle me-1"></i>}
                      {stat.change}
                    </small>
                  </div>
                  <div className={`card-icon bg-label-${stat.color}`}>
                    <i className={`ti ${stat.icon} ti-26px text-${stat.color}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="row">
        {/* Quick Actions */}
        <div className="col-xl-4 col-lg-5 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {quickLinks.map((link, i) => (
                  <div key={i} className="col-6">
                    <a
                      href={link.path}
                      className={`d-flex flex-column align-items-center justify-content-center p-3 rounded text-center text-decoration-none bg-label-${link.color}`}
                      style={{ minHeight: '90px', transition: 'transform 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <i className={`ti ${link.icon} ti-26px text-${link.color} mb-2`}></i>
                      <span className={`fw-medium text-${link.color} small`}>{link.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-xl-8 col-lg-7 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2">Recent Activity</h5>
              <div className="dropdown">
                <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                  <i className="ti ti-dots-vertical ti-sm text-muted"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">View All</a></li>
                  <li><a className="dropdown-item" href="#">Mark All Read</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body pt-1">
              <ul className="timeline mb-0 pb-1">
                {recentActivities.map((activity, i) => (
                  <li key={i} className="timeline-item timeline-item-transparent">
                    <span className={`timeline-point timeline-point-${activity.color}`}>
                      <i className={`ti ${activity.icon} ti-xs`}></i>
                    </span>
                    <div className="timeline-event">
                      <div className="timeline-header">
                        <h6 className="mb-0" style={{ fontSize: '0.875rem' }}>{activity.text}</h6>
                        <span className="timeline-time text-muted">{activity.time}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================
// Generic Module Placeholder
// =====================
const GenericPlaceholder = () => {
  const location = useLocation();
  const pathName = location.pathname.replace('/', '').replace(/-/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return (
    <div className="card">
      <div className="card-body hr-placeholder-page">
        <div className="text-center">
          <i className="ti ti-tools" style={{ fontSize: '4rem', opacity: 0.25 }}></i>
          <h4 className="mt-3 mb-1">{pathName || 'Module'}</h4>
          <p className="text-muted mb-4">This module is being developed and will be available soon.</p>
          <span className="badge bg-label-primary">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* ── Company Management ── */}
          <Route path="company" element={<Company />} />
          <Route path="branch" element={<Branch />} />
          <Route path="departments" element={<Department />} />
          <Route path="department" element={<Department />} />
          <Route path="posts" element={<Post />} />
          <Route path="post" element={<Post />} />

          {/* ── User Management ── */}
          <Route path="users" element={<Users />} />

          {/* ── Employee Management ── */}
          <Route path="employees" element={<Employees />} />
          <Route path="employee/location-logs" element={<LocationLogs />} />
          <Route path="location-logs" element={<LocationLogs />} />
          <Route path="employee/logout-requests" element={<LogoutRequests />} />
          <Route path="logout-requests" element={<LogoutRequests />} />
          <Route path="id-card/templates" element={<EmployeeCardTemplate />} />
          <Route path="employee-card-template" element={<EmployeeCardTemplate />} />

          {/* ── Contract Management ── */}
          <Route path="contract-types" element={<ContractType />} />
          <Route path="contract-type" element={<ContractType />} />
          <Route path="contract" element={<EmployeeContract />} />
          <Route path="employee-contract" element={<EmployeeContract />} />

          {/* ── Attendance ── */}
          <Route path="attendances" element={<Attendance />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance/logs" element={<AttendanceLogs />} />
          <Route path="attendance-logs" element={<AttendanceLogs />} />
          <Route path="attendance/export" element={<AttendanceReport />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="attendance-settings" element={<AttendanceSetting />} />
          <Route path="attendance-setting" element={<AttendanceSetting />} />

          {/* ── Project Management ── */}
          <Route path="projects" element={<Project />} />
          <Route path="project" element={<Project />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="clients" element={<Clients />} />

          {/* ── Notice / Event / Meeting ── */}
          <Route path="notices" element={<Notice />} />
          <Route path="team-meetings" element={<TeamMeeting />} />
          <Route path="event" element={<Event />} />

          {/* ── Payroll Management ── */}
          <Route path="employee-salaries/payroll" element={<Payroll />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="salary-components" element={<PayrollSetting />} />
          <Route path="payroll-setting" element={<PayrollSetting />} />
          <Route path="advance-salaries" element={<AdvanceSalary />} />
          <Route path="advance-salary" element={<AdvanceSalary />} />
          <Route path="employee-salaries" element={<EmployeeSalary />} />
          <Route path="employee-salary" element={<EmployeeSalary />} />
          <Route path="employee-salaries/tax-report" element={<TaxReport />} />
          <Route path="tax-report" element={<TaxReport />} />
          <Route path="tadas" element={<Tada />} />
          <Route path="tada" element={<Tada />} />

          {/* ── Loan Management ── */}
          <Route path="loan-types" element={<LoanType />} />
          <Route path="loan-type" element={<LoanType />} />
          <Route path="loan" element={<LoanList />} />
          <Route path="loan-list" element={<LoanList />} />
          <Route path="loan-repayment" element={<LoanRepayment />} />
          <Route path="emi-calculator" element={<EmiCalculator />} />
          <Route path="request-settlement" element={<SettlementRequestList />} />
          <Route path="settlement-request-list" element={<SettlementRequestList />} />
          <Route path="loan/setting" element={<Setting />} />
          <Route path="setting" element={<Setting />} />

          {/* ── Leave ── */}
          <Route path="leaves" element={<LeaveTypes />} />
          <Route path="leave-types" element={<LeaveTypes />} />
          <Route path="leave-request" element={<LeaveRequest />} />
          <Route path="leave-approval" element={<LeaveApproval />} />
          <Route path="leave/balance" element={<LeaveBalance />} />
          <Route path="leave-balance" element={<LeaveBalance />} />

          {/* ── Shift Management ── */}
          <Route path="office-times" element={<OfficeTime />} />
          <Route path="office-time" element={<OfficeTime />} />

          {/* ── Training Management ── */}
          <Route path="training-types" element={<TrainingType />} />
          <Route path="training-type" element={<TrainingType />} />
          <Route path="trainers" element={<Trainer />} />
          <Route path="trainer" element={<Trainer />} />
          <Route path="training" element={<Training />} />

          {/* ── Recruitment ── */}
          <Route path="recruitment/job-type" element={<JobType />} />
          <Route path="job-type" element={<JobType />} />
          <Route path="recruitment/job" element={<Job />} />
          <Route path="job" element={<Job />} />
          <Route path="recruitment/job-applicant" element={<JobApplicant />} />
          <Route path="job-applicant" element={<JobApplicant />} />
          <Route path="recruitment/interview" element={<Interview />} />
          <Route path="interview" element={<Interview />} />
          <Route path="recruitment/recommendation-type" element={<RecommendationType />} />
          <Route path="recommendation-type" element={<RecommendationType />} />
          <Route path="recruitment/feedback" element={<Feedback />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="recruitment/job-offer" element={<JobOffer />} />
          <Route path="job-offer" element={<JobOffer />} />
          <Route path="recruitment/onboard/list" element={<Onboard />} />
          <Route path="onboard" element={<Onboard />} />

          {/* ── HR Admin Setup ── */}
          <Route path="awards" element={<Awards />} />
          <Route path="termination" element={<Termination />} />
          <Route path="resignation" element={<Resignation />} />
          <Route path="warning" element={<Warning />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="holidays" element={<Holidays />} />

          {/* ── Asset Management ── */}
          <Route path="asset-types" element={<AssetTypes />} />
          <Route path="assets" element={<Assets />} />
          <Route path="asset-return" element={<AssetReturn />} />

          {/* ── Content / Support ── */}
          <Route path="static-page-contents" element={<StaticPageContent />} />
          <Route path="supports/get-all-query" element={<Support />} />

          {/* ── Attendance Methods ── */}
          <Route path="biometric-devices" element={<BiometricDevice />} />
          <Route path="biometric-device" element={<BiometricDevice />} />
          <Route path="routers" element={<Routers />} />
          <Route path="nfc" element={<Nfc />} />
          <Route path="qr" element={<Qr />} />

          {/* ── Settings ── */}
          <Route path="roles" element={<Roles__Permissions />} />
          <Route path="roles__-permissions" element={<Roles__Permissions />} />
          <Route path="general-settings" element={<GeneralSettings />} />
          <Route path="app-settings/index" element={<AppSettings />} />
          <Route path="app-settings" element={<AppSettings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payment-currency" element={<PaymentCurrency />} />
          <Route path="feature/index" element={<FeatureControl />} />
          <Route path="feature-control" element={<FeatureControl />} />
          <Route path="fiscal_year" element={<FiscalYear />} />
          <Route path="fiscal-year" element={<FiscalYear />} />
          <Route path="theme-color-setting" element={<ThemeColor />} />
          <Route path="theme-color" element={<ThemeColor />} />

          {/* ── Misc ── */}
          <Route path="app-qr" element={<AppQr />} />
          <Route path="profile" element={<Profile />} />
          <Route path="log-out" element={<LogOut />} />
          <Route path="cyclone-nepal" element={<CycloneNepal />} />
          <Route path="contractor1" element={<Contractor1 />} />
          <Route path="margaret-robbins" element={<MargaretRobbins />} />
          <Route path="view-all" element={<ViewAll />} />
          <Route path="view-all-clients" element={<ViewAllClients />} />
          <Route path="view-all-projects" element={<ViewAllProjects />} />

          <Route path="*" element={<h2 className="text-danger text-center mt-5">404 Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
