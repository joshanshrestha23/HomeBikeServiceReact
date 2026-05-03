import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.isAdmin) return null;

  return (
    <footer className='tw-border-t tw-border-slate-200 tw-bg-slate-950 tw-text-slate-300'>
      <div className='app-shell tw-grid tw-gap-8 tw-py-10 md:tw-grid-cols-[1.2fr_0.8fr_0.8fr]'>
        <div>
          <h2 className='tw-text-2xl tw-font-black tw-text-white'>
            Home Bike Service
          </h2>
          <p className='tw-mt-3 tw-max-w-md tw-leading-7 tw-text-slate-400'>
            Professional two-wheeler maintenance and booking support at your
            doorstep.
          </p>
        </div>

        <div>
          <h3 className='tw-mb-3 tw-text-sm tw-font-black tw-uppercase tw-tracking-[0.14em] tw-text-amber-300'>
            Navigate
          </h3>
          <div className='tw-grid tw-gap-2 tw-font-bold'>
            <Link to='/aboutus'>About Us</Link>
            <Link to='/contactus'>Contact Us</Link>
            <Link to='/bike'>Book Now</Link>
          </div>
        </div>

        <div>
          <h3 className='tw-mb-3 tw-text-sm tw-font-black tw-uppercase tw-tracking-[0.14em] tw-text-amber-300'>
            Contact
          </h3>
          <div className='tw-grid tw-gap-3 tw-text-sm tw-font-bold'>
            <span className='tw-flex tw-items-center tw-gap-2'>
              <FaPhoneAlt className='tw-text-teal-300' /> +977 9844642649
            </span>
            <span className='tw-flex tw-items-center tw-gap-2'>
              <FaEnvelope className='tw-text-teal-300' />{' '}
              joshanshrestha730@gmail.com
            </span>
            <span className='tw-flex tw-items-center tw-gap-2'>
              <FaMapMarkerAlt className='tw-text-teal-300' /> Kathmandu, Nepal
            </span>
          </div>
        </div>
      </div>
      <div className='tw-border-t tw-border-white/10 tw-py-4 tw-text-center tw-text-sm tw-font-medium tw-text-slate-500'>
        &copy; {new Date().getFullYear()} Home Bike Service. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
