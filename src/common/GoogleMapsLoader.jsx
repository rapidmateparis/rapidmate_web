// GoogleMapsLoader.jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['places']; // Add any other libraries if needed
import { MAPS_API_KEY } from '../utils/Constants';

const GoogleMapsLoader = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={MAPS_API_KEY} // Replace with your API key
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;
