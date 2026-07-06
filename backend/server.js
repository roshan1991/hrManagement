const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const { sequelize } = require('./models');
const companyRoutes = require('./routes/companyRoutes');
const AdvanceSalaryRoutes = require('./routes/AdvanceSalaryRoutes');
const AppQrRoutes = require('./routes/AppQrRoutes');
const AppSettingsRoutes = require('./routes/AppSettingsRoutes');
const AssetsRoutes = require('./routes/AssetsRoutes');
const AssetReturnRoutes = require('./routes/AssetReturnRoutes');
const AssetTypesRoutes = require('./routes/AssetTypesRoutes');
const AttendanceRoutes = require('./routes/AttendanceRoutes');
const AttendanceLogsRoutes = require('./routes/AttendanceLogsRoutes');
const AttendanceReportRoutes = require('./routes/AttendanceReportRoutes');
const AttendanceSettingRoutes = require('./routes/AttendanceSettingRoutes');
const AwardsRoutes = require('./routes/AwardsRoutes');
const BiometricDeviceRoutes = require('./routes/BiometricDeviceRoutes');
const ClientsRoutes = require('./routes/ClientsRoutes');
const ComplaintRoutes = require('./routes/ComplaintRoutes');
const Contractor1Routes = require('./routes/Contractor1Routes');
const ContractTypeRoutes = require('./routes/ContractTypeRoutes');
const CycloneNepalRoutes = require('./routes/CycloneNepalRoutes');
const DepartmentRoutes = require('./routes/DepartmentRoutes');
const EmiCalculatorRoutes = require('./routes/EmiCalculatorRoutes');
const EmployeesRoutes = require('./routes/EmployeesRoutes');
const EmployeeCardTemplateRoutes = require('./routes/EmployeeCardTemplateRoutes');
const EmployeeContractRoutes = require('./routes/EmployeeContractRoutes');
const EmployeeSalaryRoutes = require('./routes/EmployeeSalaryRoutes');
const FeatureControlRoutes = require('./routes/FeatureControlRoutes');
const FeedbackRoutes = require('./routes/FeedbackRoutes');
const FiscalYearRoutes = require('./routes/FiscalYearRoutes');
const GeneralSettingsRoutes = require('./routes/GeneralSettingsRoutes');
const HolidaysRoutes = require('./routes/HolidaysRoutes');
const InterviewRoutes = require('./routes/InterviewRoutes');
const JobRoutes = require('./routes/JobRoutes');
const JobApplicantRoutes = require('./routes/JobApplicantRoutes');
const JobOfferRoutes = require('./routes/JobOfferRoutes');
const JobTypeRoutes = require('./routes/JobTypeRoutes');
const LeaveApprovalRoutes = require('./routes/LeaveApprovalRoutes');
const LeaveBalanceRoutes = require('./routes/LeaveBalanceRoutes');
const LeaveRequestRoutes = require('./routes/LeaveRequestRoutes');
const LeaveTypesRoutes = require('./routes/LeaveTypesRoutes');
const LoanListRoutes = require('./routes/LoanListRoutes');
const LoanRepaymentRoutes = require('./routes/LoanRepaymentRoutes');
const LoanTypeRoutes = require('./routes/LoanTypeRoutes');
const LocationLogsRoutes = require('./routes/LocationLogsRoutes');
const LogoutRequestsRoutes = require('./routes/LogoutRequestsRoutes');
const LogOutRoutes = require('./routes/LogOutRoutes');
const MargaretRobbinsRoutes = require('./routes/MargaretRobbinsRoutes');
const NfcRoutes = require('./routes/NfcRoutes');
const NotificationsRoutes = require('./routes/NotificationsRoutes');
const OfficeTimeRoutes = require('./routes/OfficeTimeRoutes');
const OnboardRoutes = require('./routes/OnboardRoutes');
const PaymentCurrencyRoutes = require('./routes/PaymentCurrencyRoutes');
const PayrollRoutes = require('./routes/PayrollRoutes');
const PayrollSettingRoutes = require('./routes/PayrollSettingRoutes');
const PostRoutes = require('./routes/PostRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');
const ProjectRoutes = require('./routes/ProjectRoutes');
const PromotionRoutes = require('./routes/PromotionRoutes');
const QrRoutes = require('./routes/QrRoutes');
const RecommendationTypeRoutes = require('./routes/RecommendationTypeRoutes');
const ResignationRoutes = require('./routes/ResignationRoutes');
const Roles__PermissionsRoutes = require('./routes/Roles__PermissionsRoutes');
const RoutersRoutes = require('./routes/RoutersRoutes');
const SettingRoutes = require('./routes/SettingRoutes');
const SettlementRequestListRoutes = require('./routes/SettlementRequestListRoutes');
const TadaRoutes = require('./routes/TadaRoutes');
const TasksRoutes = require('./routes/TasksRoutes');
const TaxReportRoutes = require('./routes/TaxReportRoutes');
const TerminationRoutes = require('./routes/TerminationRoutes');
const ThemeColorRoutes = require('./routes/ThemeColorRoutes');
const TrainerRoutes = require('./routes/TrainerRoutes');
const TrainingRoutes = require('./routes/TrainingRoutes');
const TrainingTypeRoutes = require('./routes/TrainingTypeRoutes');
const TransferRoutes = require('./routes/TransferRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const ViewAllRoutes = require('./routes/ViewAllRoutes');
const ViewAllClientsRoutes = require('./routes/ViewAllClientsRoutes');
const ViewAllProjectsRoutes = require('./routes/ViewAllProjectsRoutes');
const WarningRoutes = require('./routes/WarningRoutes');
const NoticeRoutes = require('./routes/noticeRoutes');
const TeamMeetingRoutes = require('./routes/teamMeetingRoutes');
const EventRoutes = require('./routes/eventRoutes');
const StaticPageContentRoutes = require('./routes/staticPageContentRoutes');
const SupportRoutes = require('./routes/supportRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Digital HR API is running' });
});

// Routes
app.use('/api', companyRoutes);
app.use('/api/advance-salary', AdvanceSalaryRoutes);
app.use('/api/app-qr', AppQrRoutes);
app.use('/api/app-settings', AppSettingsRoutes);
app.use('/api/assets', AssetsRoutes);
app.use('/api/asset-return', AssetReturnRoutes);
app.use('/api/asset-types', AssetTypesRoutes);
app.use('/api/attendance', AttendanceRoutes);
app.use('/api/attendance-logs', AttendanceLogsRoutes);
app.use('/api/attendance-report', AttendanceReportRoutes);
app.use('/api/attendance-setting', AttendanceSettingRoutes);
app.use('/api/awards', AwardsRoutes);
app.use('/api/biometric-device', BiometricDeviceRoutes);
app.use('/api/clients', ClientsRoutes);
app.use('/api/complaint', ComplaintRoutes);
app.use('/api/contractor1', Contractor1Routes);
app.use('/api/contract-type', ContractTypeRoutes);
app.use('/api/cyclone-nepal', CycloneNepalRoutes);
app.use('/api/department', DepartmentRoutes);
app.use('/api/emi-calculator', EmiCalculatorRoutes);
app.use('/api/employees', EmployeesRoutes);
app.use('/api/employee-card-template', EmployeeCardTemplateRoutes);
app.use('/api/employee-contract', EmployeeContractRoutes);
app.use('/api/employee-salary', EmployeeSalaryRoutes);
app.use('/api/feature-control', FeatureControlRoutes);
app.use('/api/feedback', FeedbackRoutes);
app.use('/api/fiscal-year', FiscalYearRoutes);
app.use('/api/general-settings', GeneralSettingsRoutes);
app.use('/api/holidays', HolidaysRoutes);
app.use('/api/interview', InterviewRoutes);
app.use('/api/job', JobRoutes);
app.use('/api/job-applicant', JobApplicantRoutes);
app.use('/api/job-offer', JobOfferRoutes);
app.use('/api/job-type', JobTypeRoutes);
app.use('/api/leave-approval', LeaveApprovalRoutes);
app.use('/api/leave-balance', LeaveBalanceRoutes);
app.use('/api/leave-request', LeaveRequestRoutes);
app.use('/api/leave-types', LeaveTypesRoutes);
app.use('/api/loan-list', LoanListRoutes);
app.use('/api/loan-repayment', LoanRepaymentRoutes);
app.use('/api/loan-type', LoanTypeRoutes);
app.use('/api/location-logs', LocationLogsRoutes);
app.use('/api/logout-requests', LogoutRequestsRoutes);
app.use('/api/log-out', LogOutRoutes);
app.use('/api/margaret-robbins', MargaretRobbinsRoutes);
app.use('/api/nfc', NfcRoutes);
app.use('/api/notifications', NotificationsRoutes);
app.use('/api/office-time', OfficeTimeRoutes);
app.use('/api/onboard', OnboardRoutes);
app.use('/api/payment-currency', PaymentCurrencyRoutes);
app.use('/api/payroll', PayrollRoutes);
app.use('/api/payroll-setting', PayrollSettingRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/profile', ProfileRoutes);
app.use('/api/project', ProjectRoutes);
app.use('/api/promotion', PromotionRoutes);
app.use('/api/qr', QrRoutes);
app.use('/api/recommendation-type', RecommendationTypeRoutes);
app.use('/api/resignation', ResignationRoutes);
app.use('/api/roles__-permissions', Roles__PermissionsRoutes);
app.use('/api/routers', RoutersRoutes);
app.use('/api/setting', SettingRoutes);
app.use('/api/settlement-request-list', SettlementRequestListRoutes);
app.use('/api/tada', TadaRoutes);
app.use('/api/tasks', TasksRoutes);
app.use('/api/tax-report', TaxReportRoutes);
app.use('/api/termination', TerminationRoutes);
app.use('/api/theme-color', ThemeColorRoutes);
app.use('/api/trainer', TrainerRoutes);
app.use('/api/training', TrainingRoutes);
app.use('/api/training-type', TrainingTypeRoutes);
app.use('/api/transfer', TransferRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/view-all', ViewAllRoutes);
app.use('/api/view-all-clients', ViewAllClientsRoutes);
app.use('/api/view-all-projects', ViewAllProjectsRoutes);
app.use('/api/warning', WarningRoutes);
app.use('/api/notices', NoticeRoutes);
app.use('/api/team-meetings', TeamMeetingRoutes);
app.use('/api/events', EventRoutes);
app.use('/api/static-page-contents', StaticPageContentRoutes);
app.use('/api/supports', SupportRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Create DB if it doesn't exist, then Sync Tables and Start Server
mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})
.then(connection => {
    return connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
})
.then(() => {
    console.log('Database checked/created successfully.');
    return sequelize.authenticate();
})
.then(() => {
    console.log('Sequelize connected successfully.');
    return sequelize.sync({ alter: true }); // alter: true updates tables if models change
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Server startup error:', err);
});
