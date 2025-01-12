import React, { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from "../utils/Constants";

const libraries = ["places"];

const center = { lat: 28.56341236809311, lng: 77.33609181917045 };

function PickupHomeMap({ latitude, longitude }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries:libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  if (!isLoaded) {
    return <p>Loading...</p>; // Replace with a loading indicator from React Bootstrap if needed
  }

  async function calculateRoute(latitude, longitude) {
    // console.log('l',latitude)
    try {
      if (latitude && longitude) {
    const directionsService = new window.google.maps.DirectionsService();

        const results = await directionsService.route({
          origin: {
            lat: parseFloat(latitude.lat),
            lng: parseFloat(latitude.lng),
          },
          destination: {
            lat: parseFloat(longitude.lat),
            lng: parseFloat(longitude.lng),
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }

  calculateRoute(latitude, longitude);

  return (
    <div style={{ position: "relative", height: "92vh", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
        }}
      >
        {/* Google Map */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} options={{
              polylineOptions: {
                strokeColor: "#FF0058", // Blue color
                strokeOpacity: 0.9,    // 90% opacity
                strokeWeight: 5,       // 5px thick line
              },
              suppressMarkers: false,   // Use your custom markers
            }} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default PickupHomeMap;
