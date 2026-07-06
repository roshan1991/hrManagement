import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const displayName = user?.name || 'Admin User';
  const displayAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=696cff&color=fff&size=40`;

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      {/* Mobile: Hamburger to toggle sidebar */}
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i className="ti ti-menu-2 ti-md"></i>
        </a>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <a
              className="nav-item nav-link search-toggler d-flex align-items-center px-0"
              href="javascript:void(0);"
            >
              <i className="ti ti-search ti-md me-2 me-lg-4 ti-lg"></i>
              <span className="d-none d-md-inline-block text-muted fw-normal">Search...</span>
            </a>
          </div>
        </div>
        {/* /Search */}

        <ul className="navbar-nav flex-row align-items-center ms-auto">

          {/* Notifications */}
          <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
            <a
              className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <i className="ti ti-bell ti-md"></i>
              <span className="position-absolute top-0 start-50 translate-middle-x badge badge-dot bg-danger mt-1 border"></span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end py-0" style={{ minWidth: '300px' }}>
              <li className="dropdown-menu-header border-bottom">
                <div className="dropdown-header d-flex align-items-center py-3">
                  <h6 className="mb-0 me-auto">Notifications</h6>
                  <span className="badge bg-label-primary rounded-pill">3 New</span>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-start py-2 px-4">
                  <div className="flex-shrink-0 me-3 mt-1">
                    <span className="avatar avatar-sm rounded-circle bg-label-primary">
                      <i className="ti ti-user-check ti-sm"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-0 fw-medium text-heading">New employee onboarded</p>
                    <small className="text-muted">Just now</small>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-start py-2 px-4">
                  <div className="flex-shrink-0 me-3 mt-1">
                    <span className="avatar avatar-sm rounded-circle bg-label-warning">
                      <i className="ti ti-calendar-off ti-sm"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-0 fw-medium text-heading">Leave request pending</p>
                    <small className="text-muted">5 min ago</small>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-start py-2 px-4">
                  <div className="flex-shrink-0 me-3 mt-1">
                    <span className="avatar avatar-sm rounded-circle bg-label-success">
                      <i className="ti ti-credit-card ti-sm"></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-0 fw-medium text-heading">Payroll processed</p>
                    <small className="text-muted">1 hour ago</small>
                  </div>
                </div>
              </li>
              <li className="border-top">
                <a href="#" className="dropdown-item d-flex justify-content-center py-2 text-primary fw-medium">
                  View all notifications
                </a>
              </li>
            </ul>
          </li>
          {/* /Notifications */}

          {/* User Menu */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="h-auto rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src={displayAvatar}
                          alt={displayName}
                          className="h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">{displayName}</span>
                      <small className="text-muted">{user?.username ? `@${user.username}` : 'Administrator'}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => navigate('/profile')}>
                  <i className="ti ti-user-check me-2 ti-sm"></i>
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => navigate('/general-settings')}>
                  <i className="ti ti-settings me-2 ti-sm"></i>
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={() => navigate('/log-out')}>
                  <i className="ti ti-logout me-2 ti-sm"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
          {/* /User Menu */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
