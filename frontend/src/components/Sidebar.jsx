import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import menuStructure from '../data/menuStructure';

// Map menu section titles to Tabler Icon classes
const menuIcons = {
  'Dashboard':           'ti-smart-home',
  'Company Management':  'ti-building',
  'User Management':     'ti-user-shield',
  'Employee Management': 'ti-users',
  'Contract Management': 'ti-file-certificate',
  'Attendance Section':  'ti-clock',
  'Project Management':  'ti-layout-kanban',
  'Notice':              'ti-speakerphone',
  'Payroll Management':  'ti-credit-card',
  'Loan Management':     'ti-coin',
  'Leave':               'ti-calendar-off',
  'Team Meeting':        'ti-video',
  'Event':               'ti-calendar-event',
  'Shift Management':    'ti-clock-hour-9',
  'Training Management': 'ti-school',
  'Recruitment':         'ti-briefcase',
  'HR Admin Setup':      'ti-award',
  'Asset Management':    'ti-device-laptop',
  'Content Management':  'ti-file-text',
  'Support':             'ti-lifebuoy',
  'Attendance Methods':  'ti-fingerprint',
  'Settings':            'ti-settings',
};

const BASE_DOMAIN = 'https://digitalhr.cyclonenepal.com';

const getRouteFromUrl = (url) => {
  if (!url || url === '#' || url.startsWith('#')) return '#';
  // Strip the full domain (handles both /admin/* and /* paths)
  if (url.startsWith(BASE_DOMAIN)) {
    const path = url.replace(BASE_DOMAIN + '/admin', '').replace(BASE_DOMAIN, '');
    return path || '/';
  }
  return url;
};


const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Auto-open parent menus based on current route
  useEffect(() => {
    const newOpenMenus = {};
    menuStructure.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((child) => {
          const route = getRouteFromUrl(child.url);
          return location.pathname === route || location.pathname.startsWith(route + '/');
        });
        if (isChildActive) {
          newOpenMenus[item.title] = true;
        }
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [location.pathname]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isChildActive = (item) => {
    if (!item.children) return false;
    return item.children.some((child) => {
      const route = getRouteFromUrl(child.url);
      if (!route || route === '#') return false;
      return location.pathname === route || location.pathname.startsWith(route + '/');
    });
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      {/* App Brand */}
      <div className="app-brand demo">
        <a href="/" className="app-brand-link">
          <span className="app-brand-logo demo">
            {/* Digital HR Logo SVG */}
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                fill="#696cff"
              />
              <path
                opacity="0.06"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                fill="#161616"
              />
              <path
                opacity="0.06"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                fill="#161616"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                fill="#696cff"
              />
            </svg>
          </span>
          <span className="app-brand-text demo menu-text fw-bold">Digital HR</span>
        </a>

        {/* Menu close toggle (desktop: pin/unpin, mobile: X) */}
        <a
          href="javascript:void(0);"
          className="layout-menu-toggle menu-link text-large ms-auto"
        >
          <i className="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
          <i className="ti ti-x d-block d-xl-none ti-md align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {menuStructure.map((item, index) => {
          const icon = menuIcons[item.title] || 'ti-circle';
          const hasChildren = !!item.children;
          const isOpen = !!openMenus[item.title];
          const childActive = isChildActive(item);

          if (hasChildren) {
            return (
              <li
                key={index}
                className={`menu-item${isOpen || childActive ? ' open' : ''}${childActive ? ' active' : ''}`}
              >
                <a
                  href="javascript:void(0);"
                  className="menu-link menu-toggle"
                  onClick={() => toggleMenu(item.title)}
                >
                  <i className={`menu-icon tf-icons ti ${icon}`}></i>
                  <div>{item.title}</div>
                </a>
                <ul className="menu-sub">
                  {item.children.map((child, idx) => {
                    const route = getRouteFromUrl(child.url);
                    return (
                      <li key={idx} className="menu-item">
                        <NavLink
                          to={route}
                          className={({ isActive }) =>
                            `menu-link${isActive ? ' active' : ''}`
                          }
                          end
                        >
                          <div>{child.title}</div>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          // Top-level single item
          const route = getRouteFromUrl(item.url);
          return (
            <li key={index} className="menu-item">
              <NavLink
                to={route}
                className={({ isActive }) =>
                  `menu-link${isActive ? ' active' : ''}`
                }
                end
              >
                <i className={`menu-icon tf-icons ti ${icon}`}></i>
                <div>{item.title}</div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
