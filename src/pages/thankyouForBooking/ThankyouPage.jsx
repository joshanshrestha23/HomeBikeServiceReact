import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyKhaltiPaymentApi } from '../../api/api';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pidx = queryParams.get('pidx');
    const amount = queryParams.get('amount');
    const purchase_order_id = queryParams.get('purchase_order_id');

    if (pidx && amount && purchase_order_id) {
      verifyKhaltiPaymentApi({ pidx, amount, purchase_order_id })
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
            toast.success('Payment Verified Successfully!');
          } else {
            setIsSuccess(false);
            toast.error('Payment Verification Failed');
          }
        })
        .catch((err) => {
          console.error('Verification error:', err);
          setIsSuccess(false);
          toast.error('An error occurred during verification');
        })
        .finally(() => {
          setIsVerifying(false);
        });
    } else {
      // If no query params, assume it's a direct navigation (maybe already verified)
      setIsVerifying(false);
      setIsSuccess(true); 
    }
  }, [location.search]);

  return (
    <div className='tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-500'>
      <div className='tw-bg-white tw-rounded-lg tw-shadow-2xl tw-p-8 tw-m-4 tw-max-w-sm tw-w-full tw-space-y-8'>
        <div className='tw-text-center'>
          {isVerifying ? (
            <div className='tw-flex tw-flex-col tw-items-center'>
              <div className='tw-animate-spin tw-rounded-full tw-h-16 tw-w-16 tw-border-t-2 tw-border-b-2 tw-border-blue-500 tw-mb-4'></div>
              <p className='tw-text-lg tw-font-semibold'>Verifying Payment...</p>
            </div>
          ) : isSuccess ? (
            <>
              <svg
                className='tw-mx-auto tw-h-24 tw-w-24 tw-text-green-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <h1 className='tw-mt-4 tw-text-3xl tw-font-extrabold tw-text-gray-900 tw-tracking-tight'>
                Thank You!
              </h1>
              <p className='tw-mt-2 tw-text-lg tw-text-gray-500'>
                Your payment has been successfully processed.
              </p>
            </>
          ) : (
            <>
              <svg
                className='tw-mx-auto tw-h-24 tw-w-24 tw-text-red-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <h1 className='tw-mt-4 tw-text-3xl tw-font-extrabold tw-text-gray-900 tw-tracking-tight'>
                Payment Failed
              </h1>
              <p className='tw-mt-2 tw-text-lg tw-text-gray-500'>
                We couldn't verify your payment. Please contact support.
              </p>
            </>
          )}
        </div>
        {!isVerifying && (
          <div className='tw-mt-5 tw-space-y-4'>
            <p className='tw-text-sm tw-text-gray-700'>
              {isSuccess 
                ? "We appreciate your business and look forward to serving you. You'll receive a confirmation email shortly."
                : "Something went wrong with the payment verification. If amount was deducted, please contact us."}
            </p>
            <button
              onClick={() => navigate('/homepage')}
              className='tw-w-full tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-base tw-font-medium tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500 tw-transition-colors tw-duration-300'>
              Return to Home
            </button>
          </div>
        )}
        <div className='tw-mt-6 tw-text-center'>
          <p className='tw-text-xs tw-text-gray-500'>
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
