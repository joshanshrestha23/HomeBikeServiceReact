import {
  faBars,
  faCalendarAlt,
  faCommentDots,
  faHome,
  faMotorcycle,
  faSignOutAlt,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, [location]);

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: faHome },
    { path: '/admin/customerDashboard', name: 'Customers', icon: faUser },
    { path: '/admin/dashboard/bike', name: 'Bikes', icon: faMotorcycle },
    { path: '/admin/bookings', name: 'Bookings', icon: faCalendarAlt },
    { path: '/admin/feedback', name: 'Feedback', icon: faCommentDots },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <button
        type='button'
        onClick={() => setIsSidebarOpen((value) => !value)}
        className='tw-fixed tw-left-4 tw-top-4 tw-z-50 tw-grid tw-h-11 tw-w-11 tw-place-items-center tw-rounded-md tw-bg-teal-700 tw-text-white tw-shadow-lg lg:tw-hidden'
        aria-label='Toggle sidebar'>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      <aside
        className={`sidebar tw-fixed tw-inset-y-0 tw-left-0 tw-z-40 tw-w-64 tw-transform tw-overflow-y-auto tw-p-5 tw-text-white tw-transition-transform tw-duration-300 ${
          isSidebarOpen ? 'tw-translate-x-0' : '-tw-translate-x-full'
        } lg:tw-translate-x-0`}>
        <div className='tw-mb-8 tw-flex tw-items-center tw-justify-between'>
          <Link to='/admin/dashboard'>
            <span className='tw-block tw-text-xl tw-font-black'>
              Home Bike
            </span>
            <span className='tw-text-xs tw-font-bold tw-uppercase tw-tracking-[0.16em] tw-text-teal-200'>
              Admin Console
            </span>
          </Link>
          <button
            type='button'
            onClick={() => setIsSidebarOpen(false)}
            className='tw-grid tw-h-9 tw-w-9 tw-place-items-center tw-rounded-md tw-bg-white/10 tw-text-white lg:tw-hidden'
            aria-label='Close sidebar'>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav>
          <ul className='tw-grid tw-gap-2'>
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-px-3 tw-py-3 tw-text-sm tw-font-bold tw-transition ${
                      active
                        ? 'tw-bg-teal-600 tw-text-white'
                        : 'tw-text-slate-300 hover:tw-bg-white/10 hover:tw-text-white'
                    }`}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className='tw-w-4'
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type='button'
          onClick={handleLogout}
          className='tw-absolute tw-bottom-5 tw-left-5 tw-right-5 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-white/10 tw-px-4 tw-py-3 tw-text-sm tw-font-bold tw-text-white tw-shadow-none hover:tw-bg-red-600'>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminNavbar;
