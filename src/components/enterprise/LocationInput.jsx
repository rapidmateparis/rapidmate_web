import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
const LocationInput = ({ onLocationChange,title ,icon,mapApiKey}) => {
  return (
   
      <>
        <FontAwesomeIcon
          className={Styles.pickupHomeLocationIcon}
          icon={icon=='faLocationDot'? faLocationDot : faLocationCrosshairs}
        />
        <div style={{ width: "100%" }}>
          <Autocomplete
            apiKey={mapApiKey} // Replace with your API key
            onPlaceSelected={(place) => {
              const locationDetails = {
                address: place.formatted_address,
                displayedAddress:place.name || place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                components: place.address_components,
              };

              if (place && place.formatted_address) {
                onLocationChange(place.formatted_address,locationDetails);
              }
            }}
            options={{
              types: ["address"],
            }}
            placeholder={title}
            className={Styles.homeMapPlaceSearch}
          />
        </div>
        <FontAwesomeIcon
          className="pickupHome-rightArrow-icon"
          icon={faArrowRight}
        />
      </>

      
   
  );
};

export default LocationInput;
