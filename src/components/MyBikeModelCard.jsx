import React from 'react';
import { FaCalendarCheck, FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyBikeCard = ({ bikeInformation }) => {
  return (
    <article className='card tw-h-full'>
      <span className='badge tw-absolute'>{bikeInformation.bikeName}</span>
      <img
        src={`http://localhost:5000/bikes/${bikeInformation.bikeImage}`}
        className='card-img-top'
        alt={bikeInformation.bikeModel}
        style={{
          width: '100%',
          height: '260px',
          objectFit: 'cover',
        }}
      />
      <div className='card-body'>
        <div className='tw-mb-4 tw-flex tw-items-start tw-justify-between tw-gap-3'>
          <div>
            <p className='tw-mb-1 tw-text-xs tw-font-black tw-uppercase tw-tracking-[0.12em] tw-text-teal-700'>
              Service model
            </p>
            <h3 className='card-title'>{bikeInformation.bikeModel}</h3>
            <p className='tw-text-sm tw-font-bold tw-text-slate-500'>
              Rs {bikeInformation.bikePrice}
            </p>
          </div>
          <span className='tw-grid tw-h-10 tw-w-10 tw-shrink-0 tw-place-items-center tw-rounded-md tw-bg-teal-50 tw-text-teal-700'>
            <FaMotorcycle />
          </span>
        </div>
        <Link
          to={`/confirmBooking/${bikeInformation._id}`}
          className='btn tw-w-full tw-gap-2'>
          <FaCalendarCheck />
          Book Now
        </Link>
      </div>
    </article>
  );
};

export default MyBikeCard;
