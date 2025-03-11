import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getEnterpriseDashboardInfo,
  getLookupData,
  createPaymentIntent,
  createPaymentCust,
  createPaymentCard,
  payWithCardList,
  saveCard,
  removeCard,
  getDireactionsTimes,
} from "../data_manager/dataManage";

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

export const getDashbaordBranch = (userId) => {
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
};

export const getLocationDetails = (address, mapApiKey) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${mapApiKey}`;

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

export const getTravelTime = async (lat, lng, mode) => {
  return new Promise((resolve, reject) => {
    const params = {
      lat,
      lng,
      mode,
    };
    getDireactionsTimes(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          console.log("test",successResponse[0]._response)
          if (successResponse[0]._response?.direction?.status == "OK") {
            const data = successResponse[0]._response;
            resolve(data);
          } else {
            reject("notfound");
          }
        }
      },
      (errorResponse) => {
        let errorMessage = "";
        // reject("notfound")
      }
    );
  });
};

export const createPaymentCustomer = (params) => {
  return new Promise((resolve, reject) => {
    createPaymentCust(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const createPaymentInt = (params) => {
  return new Promise((resolve, reject) => {
    createPaymentIntent(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const paymentCardList = (params) => {
  return new Promise((resolve, reject) => {
    createPaymentCard(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const payWithSaveCard = (params) => {
  return new Promise((resolve, reject) => {
    payWithCardList(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const paymentCardSave = (params) => {
  return new Promise((resolve, reject) => {
    saveCard(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const removePaymentCard = (params) => {
  return new Promise((resolve, reject) => {
    removeCard(
      params,
      (successResponse) => {
        resolve(successResponse[0]._response);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};
