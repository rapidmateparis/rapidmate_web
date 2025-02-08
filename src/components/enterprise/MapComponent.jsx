import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from "../../utils/Constants";

const libraries = ["places"];

const MapComponent = ({ locations, setDistances, center, setDistance, setDuration }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const geocoderCache = useRef({});
  const [mapHeight, setMapHeight] = useState(window.innerWidth < 768 ? "350px" : "100vh");

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerWidth < 768 ? "350px" : "100vh");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Geocode locations and create markers with caching
  const createMarkers = useCallback(
    async (locations) => {
      const geocoder = new google.maps.Geocoder();

      const newMarkers = await Promise.all(
        locations.map((location) => {
          if (geocoderCache.current[location]) {
            return Promise.resolve(geocoderCache.current[location]);
          }

          return new Promise((resolve) => {
            geocoder.geocode({ address: location }, (results, status) => {
              if (status === "OK" && results[0]) {
                const markerData = {
                  position: results[0].geometry.location,
                  title: location,
                };
                geocoderCache.current[location] = markerData;
                resolve(markerData);
              } else {
                resolve(null);
              }
            });
          });
        })
      );

      setMarkers(newMarkers.filter(Boolean)); // Remove invalid markers
    },
    [geocoderCache]
  );

  // Calculate route with memoization to prevent redundant API hits
  const calculateRoute = useCallback(
    async (locations) => {
      if (locations.length < 2) return;

      const directionsService = new google.maps.DirectionsService();
      const waypoints = locations.slice(1, -1).map((loc) => ({ location: loc }));

      try {
        const results = await directionsService.route({
          origin: locations[0],
          destination: locations[locations.length - 1],
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirections(results);

        // Calculate distances and durations
        const distancesArray = results.routes[0].legs.map((leg) => ({
          start: leg.start_address,
          end: leg.end_address,
          distance: leg.distance.text,
          duration: leg.duration.text,
        }));
        setDistances(distancesArray);

        // Calculate total distance
        const totalDistance = results.routes[0].legs.reduce((sum, leg) => {
          return sum + parseFloat(leg.distance.text.replace(" km", ""));
        }, 0);

        setDistance(totalDistance.toFixed(2));

        // Calculate total duration
        const totalDurationMinutes = results.routes[0].legs.reduce(
          (sum, leg) => sum + parseDurationToMinutes(leg.duration.text),
          0
        );
        setDuration(formatDuration(totalDurationMinutes));
      } catch (error) {
        console.error("Error calculating route:", error);
      }
    },
    [setDistances, setDistance, setDuration]
  );

  // Helper function to parse duration text into minutes
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

  // Format total duration into a human-readable format
  const formatDuration = (totalMinutes) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes === 0 ? `${hours} hours` : `${hours} hours ${minutes} min`;
  };

  // Only execute when `locations` changes
  useEffect(() => {
    if (locations.length > 0) {
      createMarkers(locations);
      calculateRoute(locations);
    }
  }, [locations, createMarkers, calculateRoute]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
    mapContainerStyle={{ width: "100%", height: mapHeight }}
      zoom={10}
      center={center}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} title={marker.title} />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapComponent;
