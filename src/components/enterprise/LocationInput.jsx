import React, { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";

const LocationInput = ({ onLocationChange, title, icon, selectedBranch }) => {
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [isUserEditing, setIsUserEditing] = useState(false); // Track if user manually edited
  const autocompleteRef = useRef(null); // Ref for Autocomplete component

  useEffect(() => {
    if (selectedBranch && icon === "faLocationDot" && !isUserEditing) {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not loaded yet.");
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: parseFloat(selectedBranch.latitude), lng: parseFloat(selectedBranch.longitude) } },
        (results, status) => {
          if (status === "OK" && results[0]) {
            const locationDetails = {
              address: results[0].formatted_address,
              displayedAddress: results[0].address_components[0]?.long_name || results[0].formatted_address,
              lat: parseFloat(selectedBranch.latitude),
              lng: parseFloat(selectedBranch.longitude),
              components: results[0].address_components,
            };

            setInputValue(results[0].formatted_address); // ✅ Set default value only if user hasn't edited
            onLocationChange(results[0].formatted_address, locationDetails);
          }
        }
      );
    }
  }, [selectedBranch, icon, onLocationChange, isUserEditing]);

  // Handle place selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        const locationDetails = {
          address: place.formatted_address,
          displayedAddress: place.name || place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          components: place.address_components,
        };

        setInputValue(place.formatted_address); // ✅ Update input when a new location is selected
        setIsUserEditing(false); // Reset manual editing flag
        onLocationChange(place.formatted_address, locationDetails);
      }
    }
  };

  return (
    <>
      <FontAwesomeIcon
        className={Styles.pickupHomeLocationIcon}
        icon={icon === "faLocationDot" ? faLocationDot : faLocationCrosshairs}
      />
      <div style={{ width: "100%" }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} // Store reference
          onPlaceChanged={handlePlaceSelect} // Trigger when a place is selected
        >
          <input
            type="text"
            className={Styles.homeMapPlaceSearch}
            placeholder={title}
            value={inputValue} // ✅ Set input value dynamically
            onChange={(e) => {
              setInputValue(e.target.value); // ✅ Allow manual typing
              setIsUserEditing(true); // ✅ Mark as manually edited
            }}
          />
        </Autocomplete>
      </div>
      <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />
    </>
  );
};

export default LocationInput;
