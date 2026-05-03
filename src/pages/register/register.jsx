import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../api/api';

const fields = [
  ['fullName', 'Full name', 'text'],
  ['email', 'Email address', 'email'],
  ['phoneNumber', 'Phone number', 'text'],
  ['password', 'Password', 'password'],
  ['confirmPassword', 'Confirm password', 'password'],
];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { fullName, email, phoneNumber, password, confirmPassword } = formData;

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!/^[0-9]{10}$/.test(phoneNumber))
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords don't match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await registerUserApi(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <main className='tw-grid tw-min-h-[calc(100vh-72px)] tw-place-items-center tw-px-5 tw-py-14'>
      <div className='ui-card tw-w-full tw-max-w-5xl tw-overflow-hidden'>
        <div className='tw-grid lg:tw-grid-cols-[0.9fr_1.1fr]'>
          <section className='tw-bg-slate-950 tw-p-8 tw-text-white md:tw-p-10'>
            <p className='page-kicker tw-text-amber-300'>Create account</p>
            <h1 className='tw-mt-4 tw-text-4xl tw-font-black tw-leading-tight'>
              Book faster after your first setup.
            </h1>
            <p className='tw-mt-4 tw-leading-8 tw-text-slate-300'>
              Save your contact details, manage service history, and send
              booking requests without repeating the same information.
            </p>
            <img
              src='/assets/images/spare_parts.png'
              alt='Bike parts'
              className='tw-mt-8 tw-max-h-72 tw-w-full tw-object-contain'
            />
          </section>

          <section className='tw-p-8 md:tw-p-10'>
            <h2 className='tw-text-3xl tw-font-black tw-text-slate-950'>
              Sign up
            </h2>
            <p className='tw-mt-2 tw-text-sm tw-font-medium tw-text-slate-500'>
              Use a valid phone number so service updates reach you.
            </p>

            <form
              className='tw-mt-8 tw-grid tw-gap-4'
              onSubmit={handleSubmit}>
              {fields.map(([name, label, type]) => (
                <label key={name}>
                  {label}
                  <input
                    name={name}
                    type={type}
                    required
                    className='tw-mt-2 tw-p-3'
                    placeholder={label}
                    onChange={handleChange}
                    value={formData[name]}
                  />
                  {errors[name] && (
                    <p className='tw-mt-1 tw-text-sm tw-font-bold tw-text-red-600'>
                      {errors[name]}
                    </p>
                  )}
                </label>
              ))}

              <button
                type='submit'
                className='tw-mt-2 tw-w-full'>
                Create account
              </button>
            </form>

            <p className='tw-mt-6 tw-text-center tw-text-sm tw-font-medium tw-text-slate-600'>
              Already registered?{' '}
              <Link
                to='/login'
                className='tw-font-black tw-text-teal-700'>
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Register;
