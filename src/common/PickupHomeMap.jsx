import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
const libraries = ["places"];

function PickupHomeMap({ pickupLocation, dropoffLocations,mapApiKey }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!isLoaded || !pickupLocation || dropoffLocations.length === 0) return;

    const getDirections = async () => {
      try {
        const directionsService = new google.maps.DirectionsService(); // ✅ No 'window' needed

        directionsService.route(
          {
            origin: pickupLocation,
            destination: dropoffLocations[dropoffLocations.length - 1], // Last dropoff
            waypoints: dropoffLocations
              .slice(0, -1)
              .map((loc) => ({ location: loc, stopover: true })), // Intermediate stops
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error("Error fetching directions:", status);
            }
          }
        );
      } catch (error) {
        console.error("Google Maps API Error:", error);
      }
    };

    getDirections();
  }, [isLoaded, pickupLocation, dropoffLocations]);

  if (!isLoaded) return <p>Loading...</p>;
  const pickupIcon = {
    url: "/images/pickup-marker.png", 
    scaledSize: new window.google.maps.Size(40, 40),
  };
  
  const dropoffIcon = {
    url: "/images/dropoff-marker.png",
    scaledSize: new window.google.maps.Size(40, 40),
  };
  return (
    <div style={{ position: "relative", height: "92vh", width: "100%" }}>
      <GoogleMap
        center={pickupLocation}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Pickup Marker */}
        <Marker position={pickupLocation} label="P" icon={pickupIcon}/>

        {/* Dropoff Markers */}
        {dropoffLocations.map((location, index) => (
          <Marker key={index} position={location} label={`D${index + 1}`} icon={dropoffIcon}  />
        ))}

        {/* Directions Renderer */}
        {directions && <DirectionsRenderer directions={directions} options={{
              polylineOptions: {
                strokeColor: "#FF0058", // Blue color
                strokeOpacity: 0.9,    // 90% opacity
                strokeWeight: 3,       // 5px thick line
              },
              suppressMarkers: false,   // Use your custom markers
            }}/>}
      </GoogleMap>
    </div>
  );
}

export default PickupHomeMap;
