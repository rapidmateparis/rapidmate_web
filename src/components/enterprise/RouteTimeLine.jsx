import React from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import DropoffMarker from "../../assets/images/dropoff-marker.png";
import PickupMarker from "../../assets/images/pickup-marker.png";

const mapContainerStyle = {
    width: "100%",
    height: "90.5vh",
  };

const RouteTimeline = ({ timeline, directions, center, markers, distance, duration }) => {
  return (
    <div className="col-md-9">
      {duration && (
        <>
         
          
            

            {/* Absolute div for extra info */}
            <div
              style={{
                position: "absolute",
                top: "60px",
                // right: "10px",
                backgroundColor: "#fbfaf5",
                padding: "12px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                color: "red",
                borderRadius: "8px",
                zIndex: 2,
              }}
            >
              {timeline.map((leg, index) => (
              <div key={index} style={{ padding: "10px 0" }}>
                <p>📍 From: {`${leg.start?.substring(0,6)}...`} → {`${leg.end?.substring(0,6)}...`}</p>
                <p>🚗 Distance: {leg.distance}</p>
                <p>⏳ Time: {leg.duration}</p>
                <p>🕒 Estd. Arrival: {leg.arrivalTime}</p>
              </div>
             
            ))}
             <p>Total Duration :{duration}</p>
             <p>Total distance :{distance}</p>
            </div>
         
        </>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            icon={{
              url: index === 0 ? PickupMarker : DropoffMarker,
              scaledSize: new window.google.maps.Size(25, 36),
            }}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#FF0058",
                strokeOpacity: 0.9,
                strokeWeight: 3,
              },
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default RouteTimeline;
