import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getEnterpriseDashboardInfo, getLookupData } from '../data_manager/dataManage';

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
        reject(errorResponse);
      }
    );
  });
};


export const getDashbaordBranch= (userId) =>{
  return new Promise((resolve, reject) => {
    getEnterpriseDashboardInfo(
      userId,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
  
}

export const getLocationDetails = (address,mapApiKey) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const result = data.results[0];
        const locationDetails = {
          address: result.formatted_address,
          displayedAddress:
            result.address_components[0]?.long_name || result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          components: result.address_components,
        };
        resolve(locationDetails); // Resolve the promise with location details
      } else {
        reject(new Error(`Geocoding API error: ${data.status}`)); // Reject with an error
      }
    } catch (error) {
      reject(error); // Reject the promise in case of fetch error
    }
  });
};





