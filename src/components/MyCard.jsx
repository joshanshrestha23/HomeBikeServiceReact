import React from 'react';
import { FaArrowRight, FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyCard = ({ bikeInformation }) => {
  return (
    <article className='card tw-h-full'>
      <span className='badge tw-absolute'>{bikeInformation.bikeName}</span>
      <img
        src={`http://localhost:5000/bikes/${bikeInformation.bikeImage}`}
        className='card-img-top'
        alt={bikeInformation.bikeName}
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
              Bike family
            </p>
            <h3 className='card-title'>{bikeInformation.bikeName}</h3>
          </div>
          <span className='tw-grid tw-h-10 tw-w-10 tw-shrink-0 tw-place-items-center tw-rounded-md tw-bg-amber-100 tw-text-amber-700'>
            <FaMotorcycle />
          </span>
        </div>
        <Link
          to={`/bike/${bikeInformation.bikeName}`}
          className='btn-outline-dark tw-w-full tw-gap-2'>
          View Models
          <FaArrowRight className='tw-text-sm' />
        </Link>
      </div>
    </article>
  );
};

export default MyCard;
