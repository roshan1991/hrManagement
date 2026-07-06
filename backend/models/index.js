const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AdvanceSalary = require('./AdvanceSalary');
const AppQr = require('./AppQr');
const AppSettings = require('./AppSettings');
const Assets = require('./Assets');
const AssetReturn = require('./AssetReturn');
const AssetTypes = require('./AssetTypes');
const Attendance = require('./Attendance');
const AttendanceLogs = require('./AttendanceLogs');
const AttendanceReport = require('./AttendanceReport');
const AttendanceSetting = require('./AttendanceSetting');
const Awards = require('./Awards');
const BiometricDevice = require('./BiometricDevice');
const Clients = require('./Clients');
const Complaint = require('./Complaint');
const Contractor1 = require('./Contractor1');
const ContractType = require('./ContractType');
const CycloneNepal = require('./CycloneNepal');
const EmiCalculator = require('./EmiCalculator');
const Employees = require('./Employees');
const EmployeeCardTemplate = require('./EmployeeCardTemplate');
const EmployeeContract = require('./EmployeeContract');
const EmployeeSalary = require('./EmployeeSalary');
const FeatureControl = require('./FeatureControl');
const Feedback = require('./Feedback');
const FiscalYear = require('./FiscalYear');
const GeneralSettings = require('./GeneralSettings');
const Holidays = require('./Holidays');
const Interview = require('./Interview');
const Job = require('./Job');
const JobApplicant = require('./JobApplicant');
const JobOffer = require('./JobOffer');
const JobType = require('./JobType');
const LeaveApproval = require('./LeaveApproval');
const LeaveBalance = require('./LeaveBalance');
const LeaveRequest = require('./LeaveRequest');
const LeaveTypes = require('./LeaveTypes');
const LoanList = require('./LoanList');
const LoanRepayment = require('./LoanRepayment');
const LoanType = require('./LoanType');
const LocationLogs = require('./LocationLogs');
const LogoutRequests = require('./LogoutRequests');
const LogOut = require('./LogOut');
const MargaretRobbins = require('./MargaretRobbins');
const Nfc = require('./Nfc');
const Notifications = require('./Notifications');
const OfficeTime = require('./OfficeTime');
const Onboard = require('./Onboard');
const PaymentCurrency = require('./PaymentCurrency');
const Payroll = require('./Payroll');
const PayrollSetting = require('./PayrollSetting');
const Profile = require('./Profile');
const Project = require('./Project');
const Promotion = require('./Promotion');
const Qr = require('./Qr');
const RecommendationType = require('./RecommendationType');
const Resignation = require('./Resignation');
const Roles__Permissions = require('./Roles__Permissions');
const Routers = require('./Routers');
const Setting = require('./Setting');
const SettlementRequestList = require('./SettlementRequestList');
const Tada = require('./Tada');
const Tasks = require('./Tasks');
const TaxReport = require('./TaxReport');
const Termination = require('./Termination');
const ThemeColor = require('./ThemeColor');
const Trainer = require('./Trainer');
const Training = require('./Training');
const TrainingType = require('./TrainingType');
const Transfer = require('./Transfer');
const Users = require('./Users');
const ViewAll = require('./ViewAll');
const ViewAllClients = require('./ViewAllClients');
const ViewAllProjects = require('./ViewAllProjects');
const Warning = require('./Warning');
const Notice = require('./Notice');
const TeamMeeting = require('./TeamMeeting');
const Event = require('./Event');
const StaticPageContent = require('./StaticPageContent');
const Support = require('./Support');

const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
});

const Branch = sequelize.define('Branch', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
});

const Department = sequelize.define('Department', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Post = sequelize.define('Post', {
  name: { type: DataTypes.STRING, allowNull: false },
});

// Relationships
Company.hasMany(Branch, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Branch.belongsTo(Company, { foreignKey: 'company_id' });

Branch.hasMany(Department, { foreignKey: 'branch_id', onDelete: 'CASCADE' });
Department.belongsTo(Branch, { foreignKey: 'branch_id' });

Department.hasMany(Post, { foreignKey: 'department_id', onDelete: 'CASCADE' });
Post.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = {
  sequelize,
  Company,
  Branch,
  Department,
  Post
,
  AdvanceSalary,
  AppQr,
  AppSettings,
  Assets,
  AssetReturn,
  AssetTypes,
  Attendance,
  AttendanceLogs,
  AttendanceReport,
  AttendanceSetting,
  Awards,
  BiometricDevice,
  Clients,
  Complaint,
  Contractor1,
  ContractType,
  CycloneNepal,
  EmiCalculator,
  Employees,
  EmployeeCardTemplate,
  EmployeeContract,
  EmployeeSalary,
  FeatureControl,
  Feedback,
  FiscalYear,
  GeneralSettings,
  Holidays,
  Interview,
  Job,
  JobApplicant,
  JobOffer,
  JobType,
  LeaveApproval,
  LeaveBalance,
  LeaveRequest,
  LeaveTypes,
  LoanList,
  LoanRepayment,
  LoanType,
  LocationLogs,
  LogoutRequests,
  LogOut,
  MargaretRobbins,
  Nfc,
  Notifications,
  OfficeTime,
  Onboard,
  PaymentCurrency,
  Payroll,
  PayrollSetting,
  Profile,
  Project,
  Promotion,
  Qr,
  RecommendationType,
  Resignation,
  Roles__Permissions,
  Routers,
  Setting,
  SettlementRequestList,
  Tada,
  Tasks,
  TaxReport,
  Termination,
  ThemeColor,
  Trainer,
  Training,
  TrainingType,
  Transfer,
  Users,
  ViewAll,
  ViewAllClients,
  ViewAllProjects,
  Warning,
  Notice,
  TeamMeeting,
  Event,
  StaticPageContent,
  Support
};
