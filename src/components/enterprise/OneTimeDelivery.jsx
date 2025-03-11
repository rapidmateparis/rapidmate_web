import React, { useEffect, useRef, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { buildAddress, getLocation } from "../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
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
import OneLocation from "./common/OneLocation";
import DropoffMarker from "../../assets/images/dropoff-marker.png";
import PickupMarker from "../../assets/images/pickup-marker.png";
import { useTranslation } from "react-i18next";
import { setOrderDetails } from "../../redux/doOrderSlice";
import { getTravelTime } from "../../utils/UseFetch";
import VehicleSelection from "../consumer/common/VehicleSelection";
import DateTimePicker from "../consumer/common/DateTimePicker";

const libraries = ["places"];

function OneTimeDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const { deliveryType, selectedBranch, mapApiKey } = location.state;
  const user = useSelector((state) => state.auth.user);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [center, setCenter] = useState({
    lat: parseFloat(selectedBranch.latitude),
    lng: parseFloat(selectedBranch.longitude),
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: parseFloat(selectedBranch.latitude),
    lng: parseFloat(selectedBranch.longitude),
  });
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [addPickupLocation, setAddPickupLocation] = useState(null);
  const [addDestinationLocation, setAddDestinationLocation] = useState(null);
  const [dateValue, setDate] = useState("");
  const [time, setTime] = useState("");
  const [map, setMap] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(1);
   const [vehicleTimes, setVehicleTimes] = useState({});
   const [isSchedule, setIsSchedule] = useState(false);
  const [mapHeight, setMapHeight] = useState(
    window.innerWidth < 768 ? "350px" : "100vh"
  );
  const [selectedMode,setSelectedMode] = useState("Car");


  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerWidth < 768 ? "350px" : "100vh");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          if (!selectedBranch) {
            setCenter({ lat: latitude, lng: longitude });
            setCurrentLocation({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Fallback to a default location if needed
        }
      );
    }
    if (selectedBranch) {
      setCenter({
        lat: parseFloat(selectedBranch.latitude),
        lng: parseFloat(selectedBranch.longitude),
      });
      setCurrentLocation({
        lat: parseFloat(selectedBranch.latitude),
        lng: parseFloat(selectedBranch.longitude),
      });
    }
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      calculateRoute();
    }
  }, [pickupLocation, dropoffLocation]); // Recalculate route when either location changes

  useEffect(() => {
    const getDistancePrice = () => {
      const distanceValue = distance.replace(" km", "");
      getDistancePriceList(
        distanceValue,
        (successResponse) => {
          setDistancePriceList(successResponse[0]._response);
        },
        (errorResponse) => {
          console.log("Error fetching distance price:", errorResponse[0]);
        }
      );
    };
    getDistancePrice();
  }, [duration]);

  useEffect(() => {
    if (order) {
      setSelectedVehicle(order?.selectedVehicle);
      setSelectedVehicleDetails(order?.selectedVehicleDetails);
      setSelectedVehiclePrice(order?.selectedVehiclePrice);
      setSelectedServiceType(order?.selectedServiceType);
    }
  }, [order]);

  useEffect(() => {
    if (pickupLocation) {
      setCenter({
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
      });
    }
  }, [pickupLocation]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }
  const multipliers = {
    Cycle: 0.8,    // Cycle is slower (time increases)
    Scooter: 0.6,  // Scooter is faster than a cycle
    Car: 1.0,      // Base travel time
    Partner: 0.7,  // Partner vehicle (slightly slower than Car)
    Pickup: 0.75,  // Pickup is slower than a car
    Van: 0.72,     // Van is slower than a car
    Truck: 0.6,    // Truck is the slowest
  };
  const calculateRoute = async () => {
    if (!pickupLocation || !dropoffLocation) return;
  
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        destination: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      if (results?.routes?.length > 0) {
        setDirectionsResponse(results); // Keep this as per your request
  
        const distanceText = results.routes[0].legs[0].distance.text; // e.g., "10 km"
        const durationText = results.routes[0].legs[0].duration.text; // e.g., "30 mins"
  
        // Convert distance & duration to numbers
        const baseDistance = parseFloat(distanceText.replace(" km", "").replace(",", ""));
        const baseDuration = parseFloat(durationText.replace(" mins", "").replace(",", ""));
  
        // Precompute values for all vehicle types
        const calculatedRoutes = Object.entries(multipliers).reduce((acc, [vehicle, multiplier]) => {
          acc[vehicle] = {
            distance: distanceText, // Keep distance the same for all vehicles
            duration: (baseDuration * multiplier).toFixed(2) + " mins", // Adjust duration
          };
          return acc;
        }, {});
  
        // Store precomputed data in state
        setVehicleTimes(calculatedRoutes);
  
        // Set default values based on selectedMode
        setDistance(calculatedRoutes[selectedMode].distance);
        setDuration(calculatedRoutes[selectedMode].duration);
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };
  

  const handleContinue = () => {
    if (
      !pickupLocation ||
      !dropoffLocation ||
      !selectedVehicle ||
      !selectedServiceType
    ) {
      showErrorToast("Please fill all fields.");
      return;
    }

    if(dropoffLocation <=1){
      showErrorToast("Please add multiple dropoff location. you are selecting multiple dropoff location");
      return;
    }

    const payload = {
      addPickupLocation,
      addDestinationLocation,
      selectedVehicle,
      distance,
      duration,
      selectedVehicleDetails,
      selectedVehiclePrice,
      selectedServiceType,
      selectedBranch,
      deliveryType,
      date: dateValue instanceof Date ? dateValue.toISOString() : null,
      isSchedule,
    };
    if (order?.orderCustomerDetails) {
      payload.orderCustomerDetails = order?.orderCustomerDetails;
    }
    dispatch(setOrderDetails(payload));
    navigate("/enterprise/add-pickup-details");
  };

  const getPriceUsingVehicleType = (vehicleTypeId) => {
    const result = distancePriceList.find(
      (priceList) => priceList.vehicle_type_id === vehicleTypeId
    );
    return result?.total_price || 0;
  };

  const openModal = (vehicle) => {
    setVehicleDetail(vehicle);
    setShowModal(true);
  };
  

  const handleVehicleChange = (mode) => {
    setSelectedMode(mode)
    if (vehicleTimes) {
      setDistance(vehicleTimes[mode].distance);
      setDuration(vehicleTimes[mode].duration);
    }
  };
  // console.log(vehicleTimes)

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.requestPickupSec}>
        <div className={Styles.dashboardMainRowCard}>
          <div className="col-md-3">
            <div className={Styles.requestPickupMaincard}>
              <p className={Styles.pickupRequestText}>{t("requestPickup")}</p>
              <OneLocation
                setPickupLocation={setPickupLocation}
                setDropoffLocation={setDropoffLocation}
                calculateRoute={calculateRoute}
                t={t}
                defaultLat={center.lat}
                defaultLng={center.lng}
                mapApiKey={mapApiKey}
              />

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
                dropoffLocation={dropoffLocation}
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
          <div className="col-md-9">
            {distance && (
              <div
                style={{
                  position: "absolute",
                  display: "inline-block",
                  width: "74%",
                }}
              >
                <div
                  className="name-icon"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    fontSize: "16px",
                    backgroundColor: "#fbfaf5",
                    width: "auto",
                    height: "90px",
                    padding: 12,
                    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
                    color: "red",
                  }}
                >
                  <p>Distance : {distance}</p>
                  <p>Est. Time : {duration}</p>
                </div>
              </div>
            )}
            <GoogleMap
              center={center}
              zoom={14}
              mapContainerStyle={{ width: "100%", height: mapHeight }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {pickupLocation && (
                <Marker
                  position={pickupLocation}
                  icon={{
                    url: PickupMarker,
                    scaledSize: new window.google.maps.Size(25, 36), // Adjust size as needed
                  }}
                />
              )}
              {dropoffLocation && (
                <Marker
                  position={dropoffLocation}
                  icon={{
                    url: DropoffMarker,
                    scaledSize: new window.google.maps.Size(25, 36), // Adjust size as needed
                  }}
                />
              )}
              {!pickupLocation && currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: PickupMarker,
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                  }}
                />
              )}
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
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

        {/* Modal */}
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

export default OneTimeDelivery;
