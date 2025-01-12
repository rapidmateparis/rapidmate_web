// LocationInput.js
import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../assets/css/home.module.css";

const LocationInput = ({
  setPickupLocation,
  setDropoffLocation,
  calculateRoute,
}) => {
  const originRef = useRef();
  const destinationRef = useRef();
  const originAutocomplete = useRef(null);
  const destinationAutocomplete = useRef(null);

  const handlePlaceChanged = (ref, setLocation) => {
    const autocomplete = ref.current.getPlace();
    if (autocomplete) {
      const locationDetails = {
        address: autocomplete.formatted_address,
        displayedAddress:
          ref.current.getPlace().name || autocomplete.formatted_address,
        lat: autocomplete.geometry.location.lat(),
        lng: autocomplete.geometry.location.lng(),
        components: autocomplete.address_components,
      };
      setLocation(locationDetails);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse Geocoding using Google Maps API
          const geocoder = new window.google.maps.Geocoder();
          const response = await geocoder.geocode({ location: { lat: latitude, lng: longitude } });

          if (response.results && response.results.length > 0) {
            const locationDetails = {
              address: response.results[0].formatted_address,
              displayedAddress: response.results[0].address_components[0]?.long_name || response.results[0].formatted_address,
              lat: latitude,
              lng: longitude,
              components: response.results[0].address_components,
            };

            // Set the location details
            setPickupLocation(locationDetails);

            // Optionally, set it in the input field
            if (originRef.current) {
              originRef.current.value = locationDetails.address;
            }
          }
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      <div className={Styles.homePickupDropAddressCards}>
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
              />
            </Autocomplete>
          </div>
          <FontAwesomeIcon
            className="pickupHome-rightArrow-icon"
            icon={faArrowRight}
          />
        </div>

        <div className={Styles.homePickupLocationsBorderShowoff} />

        <div className={Styles.pickupAddresAutocompleteCard}>
          <FontAwesomeIcon
            className="dropHome-location-icon"
            icon={faLocationCrosshairs}
          />
          <div style={{ width: "100%" }}>
            <Autocomplete
              onLoad={(autocomplete) =>
                (destinationAutocomplete.current = autocomplete)
              }
              onPlaceChanged={() => {
                handlePlaceChanged(destinationAutocomplete, setDropoffLocation);
                calculateRoute();
              }}
            >
              <input
                className={Styles.homeMapPlaceSearch}
                type="text"
                placeholder="Enter drop-off location"
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
          <FontAwesomeIcon
            className="pickupHome-rightArrow-icon"
            icon={faArrowRight}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end ">
      <p
        className={`${Styles.pickupHomeNowText} cursor-pointer`}
        onClick={handleUseCurrentLocation}
        style={{cursor:"pointer"}}
      >
        Use Current Location
      </p>
      </div>
      
    </>
  );
};

export default LocationInput;
