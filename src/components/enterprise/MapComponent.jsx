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



const MapComponent = ({ locations,setDistances,center,setDistance,setDuration }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  
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

    // Calculate total distance and update state
    const totalDistance = results.routes[0].legs.reduce((sum, leg) => {
      // Convert distance from text (e.g., "10.5 km") to a numeric value
      const distanceValue = parseFloat(leg.distance.text.replace(" km", ""));
      return sum + distanceValue;
    }, 0);

    setDistance((prevDistance) => {
      if (prevDistance !== totalDistance.toFixed(2)) {
        return totalDistance.toFixed(2); 
      }
      return prevDistance;
    });

     // Calculate total duration
   
    const totalDurationMinutes = results.routes[0].legs.reduce((sum, leg) => {
      const durationValue = parseDurationToMinutes(leg.duration.text);
      return sum + durationValue;
    }, 0);
  
   
  
    // Check if total minutes are less than 60
    if (totalDurationMinutes < 60) {
      setDuration((prevDuration) => {
        if (prevDuration !== totalDurationMinutes) {
          return `${totalDurationMinutes} min`;
        }
        return prevDuration;
      });
    } else {
      // Convert to hours and minutes
      const hours = Math.floor(totalDurationMinutes / 60);
      const minutes = totalDurationMinutes % 60;
  
      if (minutes === 0) {
        setDuration((prevDuration) => {
          if (prevDuration !== hours) {
            return `${hours} hours`;
          }
          return prevDuration;
        });
      } else {
       
        setDuration(`${hours} hours ${minutes} minutes`);
      }
    }
  };

   // Helper function to parse duration (e.g., "1 hour 25 mins") into minutes
   const parseDurationToMinutes = (durationText) => {
    const timeParts = durationText.match(/(\d+)\s*(hour|minute|mins|min)/gi);
    let totalMinutes = 0;

    if (timeParts) {
      timeParts.forEach((part) => {
        if (part.includes("hour")) {
          totalMinutes += parseInt(part) * 60;
        } else {
          totalMinutes += parseInt(part);
        }
      });
    }
    return totalMinutes;
  };
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
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
