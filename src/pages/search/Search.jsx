import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { FaMotorcycle, FaSearch } from 'react-icons/fa';
import { getAllBikeApi } from '../../api/api';

const Search = () => {
  const [bikes, setBikes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllBikeApi()
      .then((res) => {
        const items = res.data.bikes || [];
        setBikes(items);
        setSearchResults(items);
      })
      .finally(() => setLoading(false));
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((query, items) => {
        const filteredBikes = items.filter((bike) =>
          `${bike.bikeName} ${bike.bikeModel}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setSearchResults(filteredBikes);
      }, 250),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query, bikes);
  };

  return (
    <main className='page-surface'>
      <div className='app-shell'>
        <div className='tw-mb-8'>
          <p className='page-kicker'>Search</p>
          <h1 className='page-title tw-flex tw-items-center tw-gap-4'>
            <FaMotorcycle className='tw-text-teal-700' />
            Find a Bike
          </h1>
          <p className='page-copy tw-max-w-2xl'>
            Search by bike name or model to quickly locate service options.
          </p>
        </div>

        <div className='tw-relative tw-mb-8'>
          <input
            type='text'
            className='tw-py-4 tw-pl-5 tw-pr-12 tw-text-lg'
            placeholder='Search for bikes...'
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <FaSearch className='tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400' />
        </div>

        {loading ? (
          <div className='tw-grid tw-min-h-[260px] tw-place-items-center'>
            <div className='app-spinner' />
          </div>
        ) : searchResults.length > 0 ? (
          <motion.div
            className='tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 lg:tw-grid-cols-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {searchResults.map((bike) => (
              <article
                key={bike._id}
                className='ui-card tw-p-5'>
                <h2 className='tw-text-xl tw-font-black tw-text-slate-950'>
                  {bike.bikeName}
                </h2>
                <p className='tw-mt-1 tw-font-bold tw-text-slate-500'>
                  {bike.bikeModel || 'Service model'}
                </p>
                <p className='tw-mt-4 tw-text-2xl tw-font-black tw-text-teal-700'>
                  Rs {bike.bikePrice || 0}
                </p>
              </article>
            ))}
          </motion.div>
        ) : (
          <div className='app-empty'>
            <div>
              <p className='tw-text-lg tw-font-black tw-text-slate-950'>
                No bikes found
              </p>
              <p>Try a different search term.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
