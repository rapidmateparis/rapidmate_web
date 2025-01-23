import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { MAPS_API_KEY } from "../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
const LocationInput = ({ onLocationChange,title ,icon}) => {
  return (
   
      <>
        <FontAwesomeIcon
          className={Styles.pickupHomeLocationIcon}
          icon={icon=='faLocationDot'? faLocationDot : faLocationCrosshairs}
        />
        <div style={{ width: "100%" }}>
          <Autocomplete
            apiKey={MAPS_API_KEY} // Replace with your API key
            onPlaceSelected={(place) => {
              if (place && place.formatted_address) {
                onLocationChange(place.formatted_address);
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
