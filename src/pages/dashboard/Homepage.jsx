import { motion } from 'framer-motion';
import React from 'react';
import { FaCalendarCheck, FaClock, FaMotorcycle, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <FaTools />,
    title: 'Routine Service',
    description: 'Oil, chain, brakes, clutch, and safety checks handled at home.',
  },
  {
    icon: <FaMotorcycle />,
    title: 'Model Based Care',
    description: 'Choose your bike model and get service pricing before booking.',
  },
  {
    icon: <FaCalendarCheck />,
    title: 'Easy Booking',
    description: 'Pick a date and time that fits your day, then track your booking.',
  },
];

const Homepage = () => {
  return (
    <main className='tw-bg-transparent'>
      <section className='tw-relative tw-min-h-[calc(100vh-72px)] tw-overflow-hidden tw-bg-slate-950 tw-text-white'>
        <img
          src='/assets/images/bg.jpg'
          alt='Bike mechanic service'
          className='tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-opacity-55'
        />
        <div className='tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-slate-950 tw-via-slate-950/75 tw-to-slate-950/15' />
        <div className='app-shell tw-relative tw-grid tw-min-h-[calc(100vh-72px)] tw-content-center tw-py-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className='tw-max-w-2xl'>
            <p className='page-kicker tw-text-amber-300'>Kathmandu home service</p>
            <h1 className='tw-my-4 tw-text-5xl tw-font-black tw-leading-none tw-text-white md:tw-text-7xl'>
              Doorstep Bike Service
            </h1>
            <p className='tw-max-w-xl tw-text-lg tw-font-medium tw-leading-8 tw-text-slate-200'>
              Schedule trusted two-wheeler maintenance at home. Pick your bike,
              choose a time, and let the mechanic come to you.
            </p>
            <div className='tw-mt-8 tw-flex tw-flex-wrap tw-gap-3'>
              <Link
                to='/bike'
                className='btn tw-gap-2 tw-bg-amber-500 tw-text-slate-950 hover:tw-bg-amber-400'>
                <FaCalendarCheck />
                Book Service
              </Link>
              <Link
                to='/aboutus'
                className='btn-outline-dark tw-border-white/30 tw-bg-white/10 tw-text-white hover:tw-bg-white hover:tw-text-slate-950'>
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='page-surface'>
        <div className='app-shell'>
          <div className='tw-grid tw-gap-6 md:tw-grid-cols-3'>
            {services.map((service) => (
              <article
                key={service.title}
                className='ui-card tw-p-6'>
                <div className='tw-mb-5 tw-grid tw-h-12 tw-w-12 tw-place-items-center tw-rounded-md tw-bg-teal-50 tw-text-xl tw-text-teal-700'>
                  {service.icon}
                </div>
                <h2 className='tw-mb-2 tw-text-xl tw-font-black tw-text-slate-950'>
                  {service.title}
                </h2>
                <p className='tw-leading-7 tw-text-slate-600'>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='tw-bg-white tw-py-16'>
        <div className='app-shell tw-grid tw-items-center tw-gap-10 lg:tw-grid-cols-[0.9fr_1.1fr]'>
          <img
            src='/assets/images/service.jpg'
            alt='Bike service tools'
            className='tw-aspect-[4/3] tw-w-full tw-rounded-md tw-object-cover tw-shadow-2xl'
          />
          <div>
            <p className='page-kicker'>Why riders use us</p>
            <h2 className='page-title'>Less workshop waiting. More riding.</h2>
            <p className='page-copy'>
              Home Bike Service is built around practical, repeatable workflows:
              transparent booking, model-specific services, and clear customer
              support. It keeps routine care simple without making riders chase
              a repair shop across town.
            </p>
            <div className='tw-mt-6 tw-grid tw-gap-4 sm:tw-grid-cols-2'>
              <div className='tw-rounded-md tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-4'>
                <FaClock className='tw-mb-3 tw-text-teal-700' />
                <p className='tw-font-black'>Time-slot booking</p>
                <p className='tw-text-sm tw-text-slate-600'>Plan service around your day.</p>
              </div>
              <div className='tw-rounded-md tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-4'>
                <FaTools className='tw-mb-3 tw-text-teal-700' />
                <p className='tw-font-black'>Mechanic-ready details</p>
                <p className='tw-text-sm tw-text-slate-600'>Share bike condition before arrival.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
