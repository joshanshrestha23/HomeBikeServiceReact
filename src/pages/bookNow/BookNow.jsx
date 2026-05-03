import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaMotorcycle } from 'react-icons/fa';
import { bikeCount, paginationApi } from '../../api/api';
import MyCard from '../../components/MyCard';

const BookNow = () => {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [bikeCounts, setBikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const countRes = await bikeCount();
        setBikeCount(countRes.data.count);
        setTotalPages(Math.ceil(countRes.data.count / limit));

        const bikesRes = await paginationApi(page, limit);
        setBikes(bikesRes.data.bikes || []);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePagination = (pageNum) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className='page-surface'>
      <div className='app-shell'>
        <div className='tw-mb-10 tw-flex tw-flex-col tw-justify-between tw-gap-5 md:tw-flex-row md:tw-items-end'>
          <div>
            <p className='page-kicker'>Choose service category</p>
            <h1 className='page-title'>Pick Your Bike</h1>
            <p className='page-copy tw-max-w-2xl'>
              Start with your bike brand, then choose the exact model and book
              the service slot that works for you.
            </p>
          </div>
          <div className='tw-rounded-md tw-border tw-border-slate-200 tw-bg-white tw-p-4 tw-shadow-sm'>
            <p className='tw-text-sm tw-font-bold tw-text-slate-500'>Available bikes</p>
            <p className='tw-text-3xl tw-font-black tw-text-slate-950'>{bikeCounts}</p>
          </div>
        </div>

        {error ? (
          <div className='app-empty'>
            <div>
              <FaMotorcycle className='tw-mx-auto tw-mb-3 tw-text-3xl tw-text-red-500' />
              <p className='tw-font-black tw-text-slate-950'>{error}</p>
            </div>
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
                No bikes are listed yet
              </p>
              <p>Add bikes from the admin dashboard to show booking options.</p>
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
                <MyCard bikeInformation={singleBike} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <nav className='tw-mt-12 tw-flex tw-justify-center'>
            <ul className='tw-flex tw-items-center tw-gap-2'>
              {[...Array(totalPages).keys()].map((num) => (
                <li key={num}>
                  <button
                    type='button'
                    className={`tw-grid tw-h-11 tw-w-11 tw-place-items-center tw-rounded-md tw-font-black tw-shadow-none ${
                      page === num + 1
                        ? 'tw-bg-teal-700 tw-text-white'
                        : 'tw-bg-white tw-text-teal-700 hover:tw-bg-teal-50'
                    }`}
                    onClick={() => handlePagination(num + 1)}>
                    {num + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </main>
  );
};

export default BookNow;
