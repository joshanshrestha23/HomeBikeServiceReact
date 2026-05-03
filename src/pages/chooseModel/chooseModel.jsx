import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaMotorcycle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getBikeByModel } from '../../api/api';
import MyBikeCard from '../../components/MyBikeModelCard';

const ChooseModel = () => {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bikesRes = await getBikeByModel(params.model);
        setBikes(bikesRes.data.bikes || []);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.model]);

  return (
    <main className='page-surface'>
      <div className='app-shell'>
        <div className='tw-mb-10'>
          <p className='page-kicker'>Choose exact model</p>
          <h1 className='page-title'>{params.model}</h1>
          <p className='page-copy tw-max-w-2xl'>
            Select your specific model so the mechanic has the right service
            context before the appointment.
          </p>
        </div>

        {error ? (
          <div className='app-empty'>
            <p className='tw-font-black tw-text-red-600'>{error}</p>
          </div>
        ) : loading ? (
          <div className='tw-grid tw-min-h-[320px] tw-place-items-center'>
            <div className='app-spinner' />
          </div>
        ) : bikes.length === 0 ? (
          <div className='app-empty'>
            <div>
              <FaMotorcycle className='tw-mx-auto tw-mb-3 tw-text-4xl tw-text-teal-700' />
              <p className='tw-text-lg tw-font-black tw-text-slate-950'>
                No models found
              </p>
              <p>This bike category has no service models yet.</p>
            </div>
          </div>
        ) : (
          <motion.div
            className='tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {bikes.map((singleBike, index) => (
              <motion.div
                key={singleBike._id || index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}>
                <MyBikeCard bikeInformation={singleBike} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default ChooseModel;
