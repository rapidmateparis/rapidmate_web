import React, { useState, useEffect, useCallback, useRef } from "react";
import Styles from "../../assets/css/home.module.css";
import { buildAddress, MAPS_API_KEY } from "../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMinusCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getAllVehicleTypes,
  getDistancePriceList,
} from "../../data_manager/dataManage";
import PickupVehicleDimensionsModal from "../consumer/PickupVehicleDimensionsModal";
import CommonHeader from "../../common/CommonHeader";
import { ToastContainer } from "react-toastify";
import ServiceTypeSelection from "./common/ServiceTypeSelection";
import { useSelector } from "react-redux";

import { showErrorToast } from "../../utils/Toastify";

import LocationInput from "./LocationInput";
import VehicleSelection from "../consumer/common/VehicleSelection";
import DateTimePicker from "../consumer/common/DateTimePicker";
import { useTranslation } from "react-i18next";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import DropoffMarker from "../../assets/images/dropoff-marker.png";
import PickupMarker from "../../assets/images/pickup-marker.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "90.5vh",
};
function MultipleDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { deliveryType, selectedBranch } = location.state;

  const user = useSelector((state) => state.auth.user);
  const [center, setCenter] = useState(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupLoc, setPickupLoc] = useState("");
  const [dropoffLocations, setDropoffLocations] = useState([""]);
  const [dropoffLoc, setDropoffLoc] = useState([""]);
  const [distances, setDistances] = useState([]);
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [date, setDate] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const { enterpriseServiceType } = useSelector((state) => state.commonData.commonData);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const geocoderCache = useRef({});
  const lastLocationsRef = useRef([]);

   // Geocode locations and create markers with caching
   const createMarkers = useCallback(
    async (locations) => {
      if (locations.length === markers.length) return; // Prevent redundant API calls

      const geocoder = new google.maps.Geocoder();
      const newMarkers = await Promise.all(
        locations.map((location) => {
          if (geocoderCache.current[location]) {
            return Promise.resolve(geocoderCache.current[location]);
          }

          return new Promise((resolve) => {
            geocoder.geocode({ address: location }, (results, status) => {
              if (status === "OK" && results[0]) {
                const markerData = {
                  position: results[0].geometry.location,
                  title: location,
                };
                geocoderCache.current[location] = markerData;
                resolve(markerData);
              } else {
                resolve(null);
              }
            });
          });
        })
      );

      setMarkers(newMarkers.filter(Boolean)); // Remove invalid markers
    },
    [markers]
  );

  // Calculate route only when locations change
  const calculateRoute = useCallback(async (locations) => {
    if (locations.length < 2) return;
    if (JSON.stringify(lastLocationsRef.current) === JSON.stringify(locations))
      return; // Prevent duplicate requests

    lastLocationsRef.current = locations; // Update ref to track last requested locations
    console.log("Calculating route...");

    const directionsService = new google.maps.DirectionsService();
    const waypoints = locations.slice(1, -1).map((loc) => ({ location: loc }));

    try {
      const results = await directionsService.route({
        origin: locations[0],
        destination: locations[locations.length - 1],
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirections(results);

      // Calculate distances and durations
      const distancesArray = results.routes[0].legs.map((leg) => ({
        start: leg.start_address,
        end: leg.end_address,
        distance: leg.distance.text,
        duration: leg.duration.text,
      }));
      setDistances(distancesArray);

      // Calculate total distance
      const totalDistance = results.routes[0].legs.reduce((sum, leg) => {
        return sum + parseFloat(leg.distance.text.replace(" km", ""));
      }, 0);
      setDistance(totalDistance.toFixed(2));

      // Calculate total duration
      const totalDurationMinutes = results.routes[0].legs.reduce(
        (sum, leg) => sum + parseDurationToMinutes(leg.duration.text),
        0
      );
      setDuration(formatDuration(totalDurationMinutes));
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }, []);

  // Parse duration text into minutes
  const parseDurationToMinutes = (durationText) => {
    const timeParts = durationText.match(/(\d+)\s*(hour|minute|mins|min)/gi);
    let totalMinutes = 0;

    if (timeParts) {
      timeParts.forEach((part) => {
        if (part.includes("hour")) {
          totalMinutes += parseInt(part) * 60;
        } else {
          totalMinutes += parseInt(part);
        }
      });
    }
    return totalMinutes;
  };

  // Format total duration into a readable format
  const formatDuration = (totalMinutes) => {
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes === 0 ? `${hours} hours` : `${hours} hours ${minutes} mins`;
  };

  const combinedLocations = [pickupLocation, ...dropoffLocations].filter(
    Boolean
  );
  // Only execute when `locations` change
  useEffect(() => {
    if (combinedLocations.length > 0) {
      createMarkers(combinedLocations);
      calculateRoute(combinedLocations);
    }
  }, [combinedLocations, createMarkers, calculateRoute]);

  const handlePickupChange = (location, locationDetails) => {
    setPickupLocation(location);
    setPickupLoc(locationDetails);
  };

  const handleDropoffChange = (index, location, locationDetails) => {
    setDropoffLocations((prev) => {
      const updatedLocations = [...prev];
      updatedLocations[index] = location;
      return updatedLocations;
    });

    setDropoffLoc((prev) => {
      const updatedDropoff = [...prev];
      updatedDropoff[index] = locationDetails;
      return updatedDropoff;
    });
  };

  const addDropoffRow = () => {
    setDropoffLocations((prev) => [...prev, ""]);
    setDropoffLoc((prev) => [...prev, ""]);
  };

  const removeDropoffRow = (index) => {
    setDropoffLocations((prev) => prev.filter((_, i) => i !== index));
    setDropoffLoc((prev) => prev.filter((_, i) => i !== index));
  };

  

  useEffect(() => {
    setLoading(true);
    const getAllVehiclesType = () => {
      getAllVehicleTypes(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            setLoading(false);
            setVehicleTypeList(successResponse[0]._response);
          }
        },
        (errorResponse) => {
          setLoading(false);
          let err = "";
          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          showErrorToast(err);
        }
      );
    };
    getAllVehiclesType();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Fallback to a default location if needed
        }
      );
    }
  }, []);

  const getPriceUsingVehicleType = (vehicleTypeId) => {
    const result = distancePriceList?.find(
      (priceList) => priceList.vehicle_type_id === vehicleTypeId
    );
    return result?.total_price || 0;
  };

  const openModal = (vehicle) => {
    setVehicleDetail(vehicle);
    setShowModal(true);
  };

  useEffect(() => {
    const getDistancePrice = () => {
      getDistancePriceList(
        distance,
        (successResponse) => {
          setDistancePriceList(successResponse[0]._response);
        },
        (errorResponse) => {
          console.log("Error fetching distance price:", errorResponse[0]);
        }
      );
    };
    if (distance) {
      setSelectedVehicle(null);
      setSelectedVehiclePrice(null);
      setSelectedVehicleDetails(null);
      getDistancePrice();

      console.log("pickup location", dropoffLocations);
      console.log("dropoff location", dropoffLoc);
    }
  }, [distance]);

  const handleContinue = () => {
    if (!pickupLoc || !dropoffLoc || !selectedVehicle || !selectedServiceType) {
      showErrorToast("Please fill all fields.");
      return;
    }

   

    const payload = {
      pickupLoc,
      dropoffLoc,
      selectedVehicle,
      distance,
      duration,
      selectedVehicleDetails,
      selectedVehiclePrice,
      deliveryType,
      selectedBranch,
      distances,
      selectedServiceType,
    };

    navigate("/enterprise/add-dropoff-details", {
      state: { order: payload },
    });
  };
  if (!isLoaded) return <div>Loading map...</div>;
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.requestPickupSec}>
        <div className={Styles.dashboardMainRowCard}>
          <div className="col-md-3">
            <div className={Styles.requestPickupMaincard}>
              <p className={Styles.pickupRequestText}>{t("requestPickup")}</p>
              <div className={Styles.homePickupDropAddressCards}>
                <div className={Styles.pickupAddresAutocompleteCard}>
                  <LocationInput
                    onLocationChange={handlePickupChange}
                    title={t("enter_pickup_location")}
                    icon="faLocationDot"
                  />
                </div>

                <div className={Styles.homePickupLocationsBorderShowoff} />

                {dropoffLocations.map((_, index) => (
                  <div
                    key={index}
                    className={Styles.pickupAddresAutocompleteCard}
                  >
                    <LocationInput
                      onLocationChange={(location, locationDetails) =>
                        handleDropoffChange(index, location, locationDetails)
                      }
                      title={t("enter_dropoff_location")}
                      icon="faLocationCrosshairs"
                    />
                    {dropoffLocations.length > 1 && (
                      <FontAwesomeIcon
                        icon={faMinusCircle}
                        onClick={() => removeDropoffRow(index)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    )}
                  </div>
                ))}

                <FontAwesomeIcon
                  className="pickupHome-rightArrow-icon"
                  icon={faPlus}
                  onClick={addDropoffRow}
                />
              </div>
              {/* <DateTimePicker setDate={setDate} setIsSchedule={setIsSchedule} /> */}
              <ServiceTypeSelection
                vehicleTypeList={vehicleTypeList}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                setSelectedVehicleDetails={setSelectedVehicleDetails}
                selectedVehiclePrice={selectedVehiclePrice}
                setSelectedVehiclePrice={setSelectedVehiclePrice}
                getPriceUsingVehicleType={getPriceUsingVehicleType}
                openModal={openModal}
                dropoffLocation={dropoffLocations}
                selectedServiceType={selectedServiceType}
                setSelectedServiceType={setSelectedServiceType}
                enterpriseServiceType={enterpriseServiceType}
                t={t}
              />
             
            </div>

            <div className={Styles.dashboardMainContinueBtn}>
              <button
                onClick={handleContinue}
                className={Styles.goToOrderDetails}
              >
                <p className={Styles.pickuphomeContinueBt}>
                  {t("continueToOrderDetails")}
                </p>
                <FontAwesomeIcon
                  className="pickupHome-rightArrow-icon"
                  icon={faArrowRight}
                />
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                >
                  {markers.map((marker, index) =>
                    index == 0 ? (
                      <Marker
                        key={index}
                        position={marker.position}
                        title={marker.title}
                        icon={{
                          url: PickupMarker,
                          scaledSize: new window.google.maps.Size(25, 36), // Adjust size as needed
                        }}
                      />
                    ) : (
                      <Marker
                        key={index}
                        position={marker.position}
                        title={marker.title}
                        icon={{
                          url: DropoffMarker,
                          scaledSize: new window.google.maps.Size(25, 36), // Adjust size as needed
                        }}
                      />
                    )
                  )}
                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{
                        polylineOptions: {
                          strokeColor: "#FF0058", // Blue color
                          strokeOpacity: 0.9, // 90% opacity
                          strokeWeight: 3, // 5px thick line
                        },
                        suppressMarkers: true, // Use your custom markers
                      }}
                    />
                  )}
                </GoogleMap>
          </div>
        </div>

        <ToastContainer />
      </section>
    </>
  );
}

export default MultipleDelivery;
