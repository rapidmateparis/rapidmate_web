// OneLocation.js
import React, { useEffect, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../assets/css/home.module.css";
import { useSelector } from "react-redux";
import { buildAddress } from "../../../utils/Constants";
import { getLocationDetails } from "../../../utils/UseFetch";

const OneLocation = ({
  setPickupLocation,
  setDropoffLocation,
  calculateRoute,
  t,
  defaultLat,
  defaultLng,
  mapApiKey,
}) => {
  const { order } = useSelector((state) => state.orderDetails);
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
          const response = await geocoder.geocode({
            location: { lat: latitude, lng: longitude },
          });

          if (response.results && response.results.length > 0) {
            const locationDetails = {
              address: response.results[0].formatted_address,
              displayedAddress:
                response.results[0].address_components[0]?.long_name ||
                response.results[0].formatted_address,
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
      console.log("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const getLocation = async (lat, lng, setLocation, ref) => {
      if (!lat || !lng) return;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const locationDetails = {
            address: results[0].formatted_address,
            displayedAddress:
              results[0].address_components[0]?.long_name ||
              results[0].formatted_address,
            lat,
            lng,
            components: results[0].address_components,
          };

          setLocation(locationDetails); // Set the state correctly
          if (ref?.current) {
            ref.current.value = locationDetails.address;
          }
        }
      });
    };

    const getLoc = async (address,mapApiKey,setLocation, ref) => {
      const loc=await getLocationDetails(address,mapApiKey)
      setLocation(loc); // Set the state correctly
          if (ref?.current) {
            ref.current.value = loc.address;
          }
      
    }
    if (defaultLat && defaultLng) {
      const address = buildAddress(
        order?.addPickupLocation?.address,
        order?.addPickupLocation?.city,
        order?.addPickupLocation?.state,
        order?.addPickupLocation?.country,
        order?.addPickupLocation?.postal_code
      );
      order ? getLoc(address,mapApiKey,setPickupLocation,originRef): getLocation(defaultLat, defaultLng, setPickupLocation, originRef);
      
    }

    if (order?.addDestinationLocation) {
      const dropoff = order.addDestinationLocation;
      const address = buildAddress(
        dropoff?.address,
        dropoff?.city,
        dropoff?.state,
        dropoff?.country,
        dropoff?.postal_code
      );
      
      getLoc(
        address,
        mapApiKey,
        setDropoffLocation,
        destinationRef
      );
    }
  }, [defaultLat, defaultLng, order, setPickupLocation, setDropoffLocation]);

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
                placeholder={t("enter_pickup_location")}
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
                placeholder={t("enter_dropoff_location")}
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
          style={{ cursor: "pointer" }}
        >
          {t("use_current_location")}
        </p>
      </div>
    </>
  );
};

export default OneLocation;
