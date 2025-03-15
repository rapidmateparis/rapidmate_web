import React, { useState, useEffect, useCallback, useRef } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMinusCircle,
  faPlus,
  faTrash,
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
import { useDispatch, useSelector } from "react-redux";

import { showErrorToast } from "../../utils/Toastify";

import LocationInput from "./LocationInput";
import { useTranslation } from "react-i18next";
import {
  useLoadScript,
} from "@react-google-maps/api";

import { setOrderDetails } from "../../redux/doOrderSlice";
import VehicleSelection from "../consumer/common/VehicleSelection";
import DateTimePicker from "../consumer/common/DateTimePicker";
import RouteTimeline from "./RouteTimeLine";

const libraries = ["places"];

function MultipleDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { deliveryType, selectedBranch, mapApiKey } = location.state;
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const user = useSelector((state) => state.auth.user);
  const [center, setCenter] = useState({
    lat: parseFloat(selectedBranch.latitude),
    lng: parseFloat(selectedBranch.longitude),
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupLoc, setPickupLoc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dropoffLocations, setDropoffLocations] = useState([""]);
  const [dropoffLoc, setDropoffLoc] = useState([""]);
  const [distances, setDistances] = useState([]);
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(1);
  const [isSchedule, setIsSchedule] = useState(false);
  const [dateValue, setDate] = useState("");
  const [vehicleTimes, setVehicleTimes] = useState({});
  const [routeData, setRouteData] = useState({});
  const [selectedMode, setSelectedMode] = useState("Car");
  const [timeline, setTimeline] = useState([]);
  const [originalTimeline, setOriginalTimeline] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApiKey,
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
  const customModes = ["Cycle", "Scooter", "Car", "Partner", "Pickup", "Van", "Truck"];
  // Calculate route only when locations change
  const multipliers = {
    Cycle: 0.8,    // Cycle is slower (time increases)
    Scooter: 0.6,  // Scooter is faster than a cycle
    Car: 1.0,      // Base travel time
    Partner: 0.7,  // Partner vehicle (slightly slower than Car)
    Pickup: 0.75,  // Pickup is slower than a car
    Van: 0.72,     // Van is slower than a car
    Truck: 0.6,    // Truck is the slowest
  };
  
  // Function to calculate the route (Only when locations change)
  const calculateRoute = useCallback(async (locations) => {
    if (locations.length < 2) return;
    if (JSON.stringify(lastLocationsRef.current) === JSON.stringify(locations)) return;
    lastLocationsRef.current = locations;
  
    const directionsService = new google.maps.DirectionsService();
    const waypoints = locations.slice(1, -1)?.map((loc) => ({ location: loc }));
  
    try {
      const results = await directionsService.route({
        origin: locations[0],
        destination: locations[locations.length - 1],
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      setDirections(results); // Store the directions once
  
      let cumulativeMinutes = 0;
      const startTime = new Date();
      let timelineData = [];
  
      const totalDistance = results.routes[0].legs.reduce(
        (sum, leg) => sum + parseFloat(leg.distance.text.replace(" km", "")),
        0
      );
  
      const distancesArray = results.routes[0].legs?.map((leg) => {
        const originalDurationMinutes = parseDurationToMinutes(leg.duration.text);
  
        cumulativeMinutes += originalDurationMinutes;
  
        const arrivalTime = new Date(startTime.getTime() + cumulativeMinutes * 60000);
        const formattedTime = arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
        const legData = {
          start: leg.start_address,
          end: leg.end_address,
          distance: leg.distance.text,
          originalDuration: originalDurationMinutes, // Store unmodified duration
          arrivalTime: formattedTime,
        };
  
        timelineData.push(legData);
        return legData;
      });
  
      setOriginalTimeline(timelineData); // Store original values first
      setDistance(`${totalDistance.toFixed(2)} km`); // Store original total distance
  
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }, []);

  const updateTimeline = (timelineData, mode) => {
    if (!timelineData.length) return;
  
    const updatedTimeline = timelineData?.map((leg) => {
      const adjustedDurationMinutes = leg.originalDuration * multipliers[mode];
      return {
        ...leg,
        duration: `${Math.round(adjustedDurationMinutes)} min`,
      };
    });  
    setTimeline(updatedTimeline);
  
    // Update total duration based on new mode
    const totalDurationMinutes = timelineData.reduce(
      (sum, leg) => sum + leg.originalDuration,
      0
    );
    setDuration(formatDuration(totalDurationMinutes * multipliers[mode]));

    const totalDistance = timelineData.reduce(
      (sum, leg) => sum + parseFloat(leg.distance.replace(" km", "")),
      0
    );
    setDistance(`${totalDistance.toFixed(2)} km`);
  };
  
  // Watch selectedMode and update durations without calling API
  useEffect(() => {
  
   
      updateTimeline(originalTimeline, selectedMode);
 
  }, [selectedMode,originalTimeline]);
  
  

  // Parse duration text into minutes
  const parseDurationToMinutes = (durationText) => {
    if (!durationText) return 0;
  
    const parts = durationText.match(/(\d+)\s*h(?:our)?(?:s)?(?:\s+(\d+)\s*min)?/i);
    let minutes = 0;
  
    if (parts) {
      minutes += parts[1] ? parseInt(parts[1]) * 60 : 0; // Convert hours to minutes
      minutes += parts[2] ? parseInt(parts[2]) : 0; // Add minutes if available
    } else {
      // If only minutes are provided (e.g., "45 min")
      const minuteOnly = durationText.match(/(\d+)\s*min/i);
      if (minuteOnly) {
        minutes = parseInt(minuteOnly[1]);
      }
    }
  
    return minutes;
  };
  
  const formatDuration = (minutes) => {
    if (!minutes || isNaN(minutes)) return "0 min";
  
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    if (hours > 0 && mins > 0) return `${hours}h ${mins}min`;
    if (hours > 0) return `${hours}h`;
    return `${mins} min`;
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

    if (!selectedBranch) {
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
    }
    if (selectedBranch) {
      setCenter({
        lat: parseFloat(selectedBranch.latitude),
        lng: parseFloat(selectedBranch.longitude),
      });
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

      // console.log("pickup location", pickupLoc);
      // console.log("dropoff location", dropoffLoc);
    }
  }, [distance]);
  useEffect(() => {
    if (order) {
      setSelectedVehicle(order?.selectedVehicle);
      setSelectedVehicleDetails(order?.selectedVehicleDetails);
      setSelectedVehiclePrice(order?.selectedVehiclePrice);
      setSelectedServiceType(order?.selectedServiceType);
      setSelectedMode(order?.selectedMode)
      setTimeline(order?.timeline)
      setOriginalTimeline(order?.originalTimeline)
      setSelectedVehiclePrice(order?.selectedVehiclePrice)
      
    }
  }, [order]);

  const handleContinue = () => {
    if (!pickupLoc || !dropoffLoc || !selectedVehicle || !selectedServiceType) {
      showErrorToast("Please fill all fieldssdsf.");
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
      date: dateValue instanceof Date ? dateValue.toISOString() : null,
      isSchedule,
      timeline,
      originalTimeline,
      selectedMode,
    };
    if (order?.orderCustomerDetails) {
      payload.orderCustomerDetails = order?.orderCustomerDetails;
    }
    dispatch(setOrderDetails(payload));
    navigate("/enterprise/add-dropoff-details");
  };
  if (!isLoaded) return <div>Loading map...</div>;

  const handleVehicleChange = (mode) => {
    setSelectedMode(mode);
  };
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
                    selectedBranch={selectedBranch}
                    mapApiKey={mapApiKey}
                    type="pickup"
                  />
                </div>

                <div className={Styles.homePickupLocationsBorderShowoff} />

                {dropoffLocations?.map((_, index) => (
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
                      mapApiKey={mapApiKey}
                      selectedBranch={selectedBranch}
                      type="dropoff"
                      index={index}

                    />
                    {dropoffLocations.length > 1  && (
                      <FontAwesomeIcon
                        icon={faTrash}
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
              <DateTimePicker setDate={setDate} setIsSchedule={setIsSchedule} />
             

              <VehicleSelection
                vehicleTypeList={vehicleTypeList}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                setSelectedVehicleDetails={setSelectedVehicleDetails}
                selectedVehiclePrice={selectedVehiclePrice}
                setSelectedVehiclePrice={setSelectedVehiclePrice}
                getPriceUsingVehicleType={getPriceUsingVehicleType}
                openModal={openModal}
                dropoffLocation={dropoffLocations}
                handleVehicleChange={handleVehicleChange}
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
         
          <RouteTimeline  timeline={timeline} directions={directions} center={center} markers = {markers} distance={distance} duration={duration}/>
        
        </div>

        <PickupVehicleDimensionsModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          vehicle={vehicleDetail}
        />

        <ToastContainer />
      </section>
    </>
  );
}

export default MultipleDelivery;
