import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu */}
        <Sidebar />
        {/* / Sidebar Menu */}

        {/* Layout Page */}
        <div className="layout-page">
          {/* Top Navbar */}
          <Header />
          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Page Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <Outlet />
            </div>
            {/* / Page Content */}

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  <span className="footer-text fw-medium">© {new Date().getFullYear()}{' '}</span>
                  <a href="#" className="footer-link fw-medium">Digital HR</a>
                  <span className="footer-text fw-medium"> – Human Resource Management System</span>
                </div>
                <div className="d-none d-lg-inline-block">
                  <a href="#" className="footer-link me-4">License</a>
                  <a href="#" className="footer-link me-4">Documentation</a>
                  <a href="#" className="footer-link">Support</a>
                </div>
              </div>
            </footer>
            {/* / Footer */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* / Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
      {/* / Overlay */}
    </div>
  );
};

export default Layout;
