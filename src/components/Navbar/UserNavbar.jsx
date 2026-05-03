import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaBars, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/homepage', label: 'Home' },
  { to: '/bike', label: 'Book Now' },
  { to: '/user/booking', label: 'Bookings' },
  { to: '/aboutus', label: 'About' },
  { to: '/contactus', label: 'Contact' },
];

const navLinkClass = ({ isActive }) =>
  `tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-bold tw-transition ${
    isActive
      ? 'tw-bg-teal-700 tw-text-white'
      : 'tw-text-slate-600 hover:tw-bg-slate-100 hover:tw-text-slate-950'
  }`;

const UserNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className='tw-sticky tw-top-0 tw-z-40 tw-border-b tw-border-slate-200/80 tw-bg-white/90 tw-backdrop-blur-xl'>
      <nav className='app-shell tw-flex tw-min-h-[72px] tw-items-center tw-justify-between tw-gap-4'>
        <Link
          to='/homepage'
          className='tw-flex tw-items-center tw-gap-3 tw-text-slate-950'>
          <span className='tw-grid tw-h-10 tw-w-10 tw-place-items-center tw-rounded-md tw-bg-teal-700 tw-font-black tw-text-white'>
            HB
          </span>
          <span className='tw-leading-tight'>
            <span className='tw-block tw-text-base tw-font-black'>
              Home Bike Service
            </span>
            <span className='tw-block tw-text-xs tw-font-bold tw-text-slate-500'>
              Workshop at your door
            </span>
          </span>
        </Link>

        <div className='tw-hidden tw-items-center tw-gap-1 md:tw-flex'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className='tw-flex tw-items-center tw-gap-2'>
          <motion.button
            type='button'
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/search')}
            className='tw-grid tw-h-10 tw-w-10 tw-place-items-center tw-rounded-md tw-bg-slate-100 tw-text-slate-700 hover:tw-bg-teal-50 hover:tw-text-teal-700'
            aria-label='Search'>
            <FaSearch />
          </motion.button>

          <div className='tw-relative'>
            <motion.button
              type='button'
              whileTap={{ scale: 0.96 }}
              onClick={() => setDropdownOpen((value) => !value)}
              className='tw-grid tw-h-10 tw-w-10 tw-place-items-center tw-rounded-md tw-bg-slate-100 tw-text-slate-700 hover:tw-bg-teal-50 hover:tw-text-teal-700'
              aria-label='User menu'>
              <FaUser />
            </motion.button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className='tw-absolute tw-right-0 tw-mt-3 tw-w-56 tw-overflow-hidden tw-rounded-md tw-border tw-border-slate-200 tw-bg-white tw-p-2 tw-shadow-xl'>
                <Link
                  to='/user/update'
                  className='tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-bold tw-text-slate-700 hover:tw-bg-slate-100'>
                  Update Profile
                </Link>
                <button
                  type='button'
                  className='tw-flex tw-w-full tw-justify-start tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-bold tw-text-red-600 tw-shadow-none hover:tw-bg-red-50'
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}>
                  Logout
                </button>
              </motion.div>
            )}
          </div>

          <button
            type='button'
            className='tw-grid tw-h-10 tw-w-10 tw-place-items-center tw-rounded-md tw-bg-slate-950 tw-text-white md:tw-hidden'
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label='Toggle menu'>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='tw-border-t tw-border-slate-200 tw-bg-white md:tw-hidden'>
          <div className='app-shell tw-grid tw-gap-2 tw-py-3'>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default UserNavbar;
