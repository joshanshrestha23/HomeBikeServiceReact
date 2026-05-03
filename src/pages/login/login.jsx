import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaMotorcycle, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  forgotPasswordApi,
  loginUserApi,
  resetPasswordApi,
} from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || !password.trim()) {
      toast.error('Enter a valid email and password');
      return;
    }

    loginUserApi({ email, password })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.href = res.data.user.isAdmin
            ? '/admin/dashboard'
            : '/homepage';
        }
      })
      .catch((err) => {
        toast.error(err.response?.data.message || 'Something went wrong');
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (resetPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    resetPasswordApi({ phone, otp, newPassword: resetPassword })
      .then((res) => {
        toast.success(res.data.message);
        setShowResetModal(false);
        setIsSentOtp(false);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || 'Something went wrong');
      });
  };

  const sendOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ phone })
      .then((res) => {
        toast.success(res.data.message);
        setIsSentOtp(true);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || 'Something went wrong');
      });
  };

  return (
    <main className='tw-grid tw-min-h-[calc(100vh-72px)] tw-grid-cols-1 lg:tw-grid-cols-[1.05fr_0.95fr]'>
      <section className='tw-relative tw-hidden tw-overflow-hidden tw-bg-slate-950 lg:tw-block'>
        <img
          src='/assets/images/bg2.jpeg'
          alt='Bike service'
          className='tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-opacity-55'
        />
        <div className='tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-slate-950 tw-to-slate-950/20' />
        <div className='tw-relative tw-flex tw-h-full tw-items-end tw-p-12 tw-text-white'>
          <div className='tw-max-w-xl'>
            <p className='page-kicker tw-text-amber-300'>Welcome back</p>
            <h1 className='tw-mt-3 tw-text-5xl tw-font-black tw-leading-none'>
              Keep your next service moving.
            </h1>
            <p className='tw-mt-5 tw-text-lg tw-leading-8 tw-text-slate-200'>
              Sign in to manage bookings, update profile details, and continue
              conversations with the service team.
            </p>
          </div>
        </div>
      </section>

      <section className='tw-flex tw-items-center tw-justify-center tw-px-5 tw-py-14'>
        <div className='ui-card tw-w-full tw-max-w-md tw-p-8'>
          <div className='tw-mb-8 tw-text-center'>
            <span className='tw-mx-auto tw-grid tw-h-14 tw-w-14 tw-place-items-center tw-rounded-md tw-bg-teal-700 tw-text-2xl tw-text-white'>
              <FaMotorcycle />
            </span>
            <h2 className='tw-mt-5 tw-text-3xl tw-font-black tw-text-slate-950'>
              Sign in
            </h2>
            <p className='tw-mt-2 tw-text-sm tw-font-medium tw-text-slate-500'>
              Access your Home Bike Service account
            </p>
          </div>

          <form
            className='tw-grid tw-gap-4'
            onSubmit={handleSubmit}>
            <label>
              Email address
              <div className='tw-relative tw-mt-2'>
                <FaEnvelope className='tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400' />
                <input
                  type='email'
                  required
                  className='tw-py-3 tw-pl-10 tw-pr-3'
                  placeholder='you@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
            <label>
              Password
              <div className='tw-relative tw-mt-2'>
                <FaLock className='tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400' />
                <input
                  type='password'
                  required
                  className='tw-py-3 tw-pl-10 tw-pr-3'
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            <div className='tw-flex tw-items-center tw-justify-between tw-text-sm'>
              <label className='tw-flex tw-items-center tw-gap-2 tw-font-bold tw-text-slate-600'>
                <input
                  type='checkbox'
                  className='tw-h-4 tw-w-4'
                />
                Remember me
              </label>
              <button
                type='button'
                onClick={() => setShowResetModal(true)}
                className='tw-bg-transparent tw-p-0 tw-font-bold tw-text-teal-700 tw-shadow-none'>
                Forgot password?
              </button>
            </div>

            <button
              type='submit'
              className='tw-mt-2 tw-w-full'>
              Sign in
            </button>
          </form>

          <p className='tw-mt-6 tw-text-center tw-text-sm tw-font-medium tw-text-slate-600'>
            New here?{' '}
            <Link
              to='/register'
              className='tw-font-black tw-text-teal-700'>
              Create an account
            </Link>
          </p>
        </div>
      </section>

      {showResetModal && (
        <div className='tw-fixed tw-inset-0 tw-z-50 tw-grid tw-place-items-center tw-bg-slate-950/60 tw-p-5'>
          <div className='ui-card tw-w-full tw-max-w-md tw-p-6'>
            <h2 className='tw-mb-5 tw-text-2xl tw-font-black tw-text-slate-950'>
              Reset Password
            </h2>
            <form
              onSubmit={isSentOtp ? handleReset : sendOtp}
              className='tw-grid tw-gap-4'>
              <label>
                Phone Number
                <div className='tw-relative tw-mt-2'>
                  <FaPhoneAlt className='tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400' />
                  <input
                    type='tel'
                    className='tw-py-3 tw-pl-10 tw-pr-3'
                    placeholder='98XXXXXXXX'
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSentOtp}
                  />
                </div>
              </label>
              {isSentOtp && (
                <>
                  <input
                    type='number'
                    placeholder='Enter OTP'
                    className='tw-p-3'
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <input
                    type='password'
                    placeholder='New Password'
                    className='tw-p-3'
                    onChange={(e) => setResetPassword(e.target.value)}
                  />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    className='tw-p-3'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}
              <div className='tw-flex tw-gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowResetModal(false);
                    setIsSentOtp(false);
                  }}
                  className='btn-outline-dark tw-flex-1'>
                  Close
                </button>
                <button
                  type='submit'
                  className='tw-flex-1'>
                  {isSentOtp ? 'Reset' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
