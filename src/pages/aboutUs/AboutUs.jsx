import React from 'react';
import { FaCheck, FaHome, FaMotorcycle, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
  'Basic tune-ups',
  'Brake and gear adjustments',
  'Chain lubrication',
  'Tire inflation',
  'Wheel truing',
  'Detailed cleaning',
  'Bearing adjustments',
  'Frame inspections',
];

const AboutUs = () => {
  return (
    <main className='page-surface'>
      <div className='app-shell'>
        <section className='tw-grid tw-items-center tw-gap-10 lg:tw-grid-cols-[1.05fr_0.95fr]'>
          <div>
            <p className='page-kicker'>About us</p>
            <h1 className='page-title'>Mechanic support without the workshop wait.</h1>
            <p className='page-copy'>
              Home Bike Service brings practical two-wheeler maintenance to your
              doorstep. The app helps riders choose the right bike, share service
              details, book a convenient time, and keep track of support from one
              place.
            </p>
            <div className='tw-mt-8 tw-flex tw-flex-wrap tw-gap-3'>
              <Link
                to='/bike'
                className='btn tw-gap-2'>
                <FaMotorcycle />
                Book a Service
              </Link>
              <Link
                to='/contactus'
                className='btn-outline-dark'>
                Contact Team
              </Link>
            </div>
          </div>

          <div className='tw-relative'>
            <img
              src='/assets/images/home.png'
              alt='Home Bike Service'
              className='tw-rounded-md tw-bg-white tw-p-5 tw-shadow-2xl'
            />
            <div className='tw-absolute tw-bottom-4 tw-left-4 tw-rounded-md tw-bg-slate-950 tw-p-4 tw-text-white tw-shadow-xl'>
              <p className='tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-black'>
                <FaHome className='tw-text-amber-300' />
                At your doorstep
              </p>
            </div>
          </div>
        </section>

        <section className='tw-mt-16 tw-grid tw-gap-6 md:tw-grid-cols-3'>
          {[
            ['Skilled service', 'Technicians handle inspection and routine maintenance.'],
            ['Clear booking', 'Customers choose a date, time, bike, and location.'],
            ['Ongoing support', 'Feedback and chat keep service communication open.'],
          ].map(([title, body]) => (
            <article
              key={title}
              className='ui-card tw-p-6'>
              <FaTools className='tw-mb-4 tw-text-2xl tw-text-teal-700' />
              <h2 className='tw-text-xl tw-font-black tw-text-slate-950'>{title}</h2>
              <p className='tw-mt-2 tw-leading-7 tw-text-slate-600'>{body}</p>
            </article>
          ))}
        </section>

        <section className='tw-mt-16 tw-rounded-md tw-bg-white tw-p-6 tw-shadow-sm md:tw-p-8'>
          <p className='page-kicker'>Services covered</p>
          <div className='tw-mt-6 tw-grid tw-gap-3 sm:tw-grid-cols-2 lg:tw-grid-cols-4'>
            {services.map((service) => (
              <div
                key={service}
                className='tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-3 tw-font-bold tw-text-slate-700'>
                <span className='tw-grid tw-h-8 tw-w-8 tw-shrink-0 tw-place-items-center tw-rounded-md tw-bg-teal-700 tw-text-white'>
                  <FaCheck className='tw-text-xs' />
                </span>
                {service}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
