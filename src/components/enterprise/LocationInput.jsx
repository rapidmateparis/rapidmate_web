import React, { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import { buildAddress, getLocation } from "../../utils/Constants";
import { getLocationDetails } from "../../utils/UseFetch";
import { useSelector } from "react-redux";

const LocationInput = ({ onLocationChange, title, icon, selectedBranch, mapApiKey, index, type }) => {
  const { order } = useSelector((state) => state.orderDetails);
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [isUserEditing, setIsUserEditing] = useState(false); // Track if user manually edited
  const autocompleteRef = useRef(null); // Ref for Autocomplete component

  const getLoc = async (address, mapApiKey) => {
    const location = await getLocationDetails(address, mapApiKey);
    setInputValue(location?.address); // ✅ Set default value only if user hasn't edited
    onLocationChange(location?.address, location);
  };

  // ✅ Set default input value when `order` is available
  useEffect(() => {
    if (order && !isUserEditing) {
      let address = "";
      
      if (type === "pickup" && order?.pickupLoc) {
        address = order?.pickupLoc?.address;
      } else if (type === "dropoff" && order?.dropoffLoc && order.dropoffLoc[index]) {
        address = order.dropoffLoc[index]?.address;
      }

      if (address) {
        getLoc(address, mapApiKey);
      }
    }
  }, [order, type, index]); // ✅ Run when order updates

  useEffect(() => {
    if (selectedBranch && icon === "faLocationDot" && !isUserEditing) {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not loaded yet.");
        return;
      }
      const address = buildAddress(
        selectedBranch?.address,
        selectedBranch?.city,
        selectedBranch?.state,
        selectedBranch?.country,
        selectedBranch?.postal_code
      );
      getLoc(address, mapApiKey);
    }
  }, []);

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

        const location = getLocation(locationDetails, locationDetails?.lat, locationDetails?.lng);
        const address = buildAddress(
          location?.address,
          location?.city,
          location?.state,
          location?.country,
          location?.postal_code
        );
        getLoc(address, mapApiKey);
        setIsUserEditing(false); // Reset manual editing flag
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
      {icon === "faLocationDot" && <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />}
    </>
  );
};

export default LocationInput;
