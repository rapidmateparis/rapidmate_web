import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from "../../utils/Constants";
const libraries= ["places"]
const mapContainerStyle = {
  width: "100%", height: "90.5vh"
};

const defaultCenter =  {
    lat: 25.2411904, // Default center (San Francisco)
    lng: 86.9924864,
  };

const MapComponent = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    if (locations.length > 0) {
      createMarkers(locations);
    }

    if (locations.length > 1) {
      calculateRoute(locations);
    }
  }, [locations]);

  const createMarkers = (locations) => {
    const geocoder = new google.maps.Geocoder();
    const newMarkers = locations.map((location) => {
      return new Promise((resolve) => {
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK" && results[0]) {
            resolve({
              position: results[0].geometry.location,
              title: location,
            });
          } else {
            resolve(null);
          }
        });
      });
    });

    Promise.all(newMarkers).then((resolvedMarkers) => {
      setMarkers(resolvedMarkers.filter(Boolean)); // Filter out null markers
    });
  };

  const calculateRoute = async (locations) => {
    const directionsService = new google.maps.DirectionsService();
    const waypoints = locations.slice(1, -1).map((loc) => ({ location: loc }));

    const results = await directionsService.route({
      origin: locations[0],
      destination: locations[locations.length - 1],
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
  
    // Calculate distances
    const distancesArray = results.routes[0].legs.map((leg) => ({
    
      start: leg.start_address,
      end: leg.end_address,
      distance: leg.distance.text,
      duration:leg.duration.text,
    }));
    setDistances(distancesArray);
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
        options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
      >
        {/* Render the markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
          >
          
              
         
          </Marker>
        ))}

        {/* Render the directions */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Display distances */}
      {/* <div style={{ marginTop: "20px" }}>
        <h3>Distances</h3>
        <ul>
          {distances.map((distance, index) => (
            <li key={index}>
              {distance.start} to {distance.end}: {distance.distance} {distance.duration}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default MapComponent;
