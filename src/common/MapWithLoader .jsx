
import React, { useEffect, useRef, useState } from 'react';
import GoogleMapsLoader from './GoogleMapsLoader';


const MapComponent = ({ defaultLocation, dropoffLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const google = window.google;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 12,
    });

    setMap(mapInstance);

    const directionsServiceInstance = new google.maps.DirectionsService();
    const directionsRendererInstance = new google.maps.DirectionsRenderer();
    directionsRendererInstance.setMap(mapInstance);

    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);
  }, []);

  useEffect(() => {
    if (directionsService && directionsRenderer && dropoffLocation) {
      const request = {
        origin: defaultLocation,
        destination: dropoffLocation,
        travelMode: 'DRIVING',
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [directionsService, directionsRenderer, dropoffLocation]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

const MapWithLoader = (props) => (
  <GoogleMapsLoader>
    <MapComponent {...props} />
  </GoogleMapsLoader>
);

export default MapWithLoader;
