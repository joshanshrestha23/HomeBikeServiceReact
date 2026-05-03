import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { sendFeedbackApi } from './../../api/api';
import StarRating from './StarRating';

const ContactUs = () => {
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFeedbackApi({ ...formData, rating });
      toast.success('Feedback sent');
      setFormData({ subject: '', message: '' });
      setRating(0);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting feedback');
    }
  };

  return (
    <main className='page-surface'>
      <div className='app-shell'>
        <div className='tw-mb-10'>
          <p className='page-kicker'>Contact</p>
          <h1 className='page-title'>Tell us what your bike needs.</h1>
          <p className='page-copy tw-max-w-2xl'>
            Send service feedback, ask for support, or share details that help
            the team prepare for your next booking.
          </p>
        </div>

        <div className='ui-card tw-grid tw-overflow-hidden lg:tw-grid-cols-[0.9fr_1.1fr]'>
          <section className='tw-bg-slate-950 tw-p-8 tw-text-white md:tw-p-10'>
            <h2 className='tw-text-3xl tw-font-black'>Reach the team</h2>
            <p className='tw-mt-3 tw-leading-8 tw-text-slate-300'>
              We are based around Dillibazzar, Kathmandu and support riders with
              booking, service, and account questions.
            </p>
            <div className='tw-mt-8 tw-grid tw-gap-5'>
              {[
                [<FaMapMarkerAlt />, 'Dillibazzar Pipalbot, Kathmandu, Nepal'],
                [<FaEnvelope />, 'joshanshrestha730@gmail.com'],
                [<FaPhoneAlt />, '+977 9844642649'],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  className='tw-flex tw-items-start tw-gap-4'>
                  <span className='tw-grid tw-h-11 tw-w-11 tw-shrink-0 tw-place-items-center tw-rounded-md tw-bg-white/10 tw-text-amber-300'>
                    {icon}
                  </span>
                  <span className='tw-font-bold tw-leading-7'>{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className='tw-p-8 md:tw-p-10'>
            <h3 className='tw-text-2xl tw-font-black tw-text-slate-950'>
              Send Feedback
            </h3>
            <form
              onSubmit={handleSubmit}
              className='tw-mt-6 tw-grid tw-gap-5'>
              <label>
                Subject
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='tw-mt-2 tw-p-3'
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='tw-mt-2 tw-p-3'
                  rows='5'
                  required
                />
              </label>
              <div>
                <p className='tw-mb-2 tw-font-black tw-text-slate-950'>
                  Rate our service
                </p>
                <StarRating
                  rating={rating}
                  setRating={setRating}
                />
              </div>
              <button
                type='submit'
                className='tw-w-full'>
                Send Feedback
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
