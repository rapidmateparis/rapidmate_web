import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getLookupData } from '../data_manager/dataManage';

// Hook to fetch user and lookup data
export const UseFetch = () => {
  const { user } = useSelector((state) => state.auth);
  const [lookup, setLookup] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLookup = async () => {
      try {
        const lookupData = await getLookup();
        setLookup(lookupData);
      } catch (err) {
        setError(err);
      }
    };

    fetchLookup();
  }, []);

  return { user, lookup, error };
};

// Function to fetch lookup data, returns a Promise
export const getLookup = () => {
  return new Promise((resolve, reject) => {
    getLookupData(
      null,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        console.log("getLookup==>errorResponse", errorResponse);
        reject(errorResponse);
      }
    );
  });
};


