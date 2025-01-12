import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
  faPlus,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../assets/css/home.module.css";

const LocationInputs = ({
  setPickupLocation,
  setDropoffLocation,
  pickupLocation,
  dropoffLocation,
  calculateRoute,
  isPickupDisabled,
}) => {
  const originRef = useRef();
  const destinationRef = useRef([]);
  const originAutocomplete = useRef(null);

  // Handle pickup location change
  const handlePlaceChanged = (ref, setLocation) => {
    const autocomplete = ref.current.getPlace();
    if (autocomplete) {
      const locationDetails = {
        address: autocomplete.formatted_address,
        displayedAddress: autocomplete.formatted_address,
        lat: autocomplete.geometry.location.lat(),
        lng: autocomplete.geometry.location.lng(),
        components: autocomplete.address_components,
      };
      setLocation(locationDetails); // Set pickup location state
    }
  };

  // Add a new drop-off location field
  const addDropoffField = () => {
    setDropoffLocation((prev) => [
      ...prev,
      {
        address: "",
        displayedAddress: "",
        lat: null,
        lng: null,
        components: [],
      },
    ]);
  };

  // Handle changes to drop-off location
  const handleDropoffChange = (index, value) => {
    const updatedDropoffs = [...dropoffLocation];
    updatedDropoffs[index].address = value;
    setDropoffLocation(updatedDropoffs); // Update the state with the new address
  };

  // Handle drop-off place selection change
  const handleDropoffPlaceChanged = (index) => {
    const autocomplete = destinationRef.current[index].getPlace();
    
    if (autocomplete && autocomplete.geometry && autocomplete.geometry.location) {
      const lat = autocomplete.geometry.location.lat();
      const lng = autocomplete.geometry.location.lng();
  
      // Check if lat and lng are valid numbers
      if (typeof lat === 'number' && typeof lng === 'number') {
        const locationDetails = {
          address: autocomplete.formatted_address,
          displayedAddress: autocomplete.name || autocomplete.formatted_address,
          lat: lat,
          lng: lng,
          components: autocomplete.address_components,
        };
  
        const updatedDropoffs = [...dropoffLocation];
        updatedDropoffs[index] = locationDetails;
       

        setDropoffLocation(updatedDropoffs); // Update the state with the selected location
        calculateRoute(); // Recalculate route after setting the location
      } else {
        console.error("Invalid coordinates received from Google Places API.");
      }
    } else {
      console.error("Autocomplete result is not valid.");
    }
  };
  

  const removeDropoffField = (index) => {
    const updatedDropoffs = dropoffLocation.filter((_, i) => i !== index);
    setDropoffLocation(updatedDropoffs);
    calculateRoute(); // Update the dropoffLocation state
  };

  return (
    <div className={Styles.homePickupDropAddressCards}>
      {/* Pickup Address */}
      <div className={Styles.pickupAddresAutocompleteCard}>
        <FontAwesomeIcon
          className={Styles.pickupHomeLocationIcon}
          icon={faLocationDot}
        />
        <div style={{ width: "100%" }}>
          <Autocomplete
            onLoad={(autocomplete) =>
              (originAutocomplete.current = autocomplete)
            }
            onPlaceChanged={() =>
              handlePlaceChanged(originAutocomplete, setPickupLocation)
            }
          >
            <input
              className={Styles.homeMapPlaceSearch}
              type="text"
              placeholder="Enter pickup location"
              ref={originRef}
              value={pickupLocation?.address || ""}
              disabled={isPickupDisabled}
            />
          </Autocomplete>
        </div>
        <FontAwesomeIcon
          className="pickupHome-rightArrow-icon"
          icon={faArrowRight}
        />
      </div>

      <div className={Styles.homePickupLocationsBorderShowoff} />

      {/* Drop-off Locations */}
      {dropoffLocation?.map((dropoff, index) => (
        <div key={index} className={Styles.pickupAddresAutocompleteCard}>
          <FontAwesomeIcon
            className="dropHome-location-icon"
            icon={faLocationCrosshairs}
          />
          <div style={{ width: "100%" }}>
            <Autocomplete
              onLoad={(autocomplete) =>
                (destinationRef.current[index] = autocomplete)
              }
              onPlaceChanged={() => handleDropoffPlaceChanged(index,setDropoffLocation)}
            >
              <input
                className={Styles.homeMapPlaceSearch}
                type="text"
                placeholder="Enter drop-off location"
                value={dropoff?.address || ""}
                onChange={(e) => {
                  const updatedDropoffs = [...dropoffLocation];
                  updatedDropoffs[index].address = e.target.value;
                  setDropoffLocation(updatedDropoffs); // Update drop-off address
                }}
              />
            </Autocomplete>
          </div>
          {index >= 1 && (
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => removeDropoffField(index)}
              style={{ cursor: "pointer", color: "red" }}
            />
          )}

          {/* Add more drop-off locations */}
          {index === dropoffLocation.length - 1 && (
            <FontAwesomeIcon
              className="pickupHome-rightArrow-icon"
              icon={faPlus}
              onClick={addDropoffField}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LocationInputs;
