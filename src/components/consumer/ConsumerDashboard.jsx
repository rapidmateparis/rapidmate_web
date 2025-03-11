import React, { useEffect, useRef, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import {
  extractAddress,
  getLocation,
  MAPS_API_KEY,
} from "../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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
import PickupVehicleDimensionsModal from "./PickupVehicleDimensionsModal";
import LocationInput from "../consumer/common/LocationInput";
import DateTimePicker from "./common/DateTimePicker";
import VehicleSelection from "./common/VehicleSelection";
import { ToastContainer } from "react-toastify";
import DropoffMarker from "../../assets/images/dropoff-marker.png";
import PickupMarger from "../../assets/images/pickup-marker.png";
import { showErrorToast, showSuccessToast } from "../../utils/Toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "../../redux/doOrderSlice";
import { getTravelTime } from "../../utils/UseFetch";

const libraries = ["places"];
const DEFAULT_CENTER = { lat: 48.85754309772872, lng: 2.3513877855537912 };
function ConsumerDashboard({ mapApiKey }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { order } = useSelector((state) => state.orderDetails);
  const user = useSelector((state) => state.auth.user);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [center, setCenter] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
  const [vehicleTimes, setVehicleTimes] = useState({});
  const [isSchedule, setIsSchedule] = useState(false);
  const [map, setMap] = useState(null);
  const [mapHeight, setMapHeight] = useState(
    window.innerWidth < 768 ? "350px" : "100vh"
  );

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
          setErrorMessage(err);
        }
      );
    };
    getAllVehiclesType();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Fallback to a default location if needed
        }
      );
    } else {
      setCurrentLocation(DEFAULT_CENTER);
    }
  }, []);
  useEffect(() => {
    if (pickupLocation) {
      setCenter({
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
      });
    }
  }, [pickupLocation]);

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerWidth < 768 ? "350px" : "100vh");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      // setPickupLocation(order?.pickupLocation)
    }
  }, [order]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  const calculateRoute = async () => {
    if (pickupLocation && dropoffLocation) {
      try {
        // ✅ Get travel time from backend API
        const travelTimes = await getTravelTime(
          `${pickupLocation.lat},${pickupLocation.lng}`,
          `${dropoffLocation.lat},${dropoffLocation.lng}`,
          "driving"
        );

        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
          destination: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results);

        // ✅ Extract distance & duration from the first route
        if (travelTimes?.timeDistanceAndTime?.Car) {
          setDuration(travelTimes?.timeDistanceAndTime.Car);
          setDistance(travelTimes?.timeDistanceAndTime.distance);
        } else {
          const route = travelTimes?.direction.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);
        }

        setVehicleTimes(travelTimes?.timeDistanceAndTime);

        // ✅ Update pickup & dropoff locations
        const pickup = getLocation(
          pickupLocation,
          pickupLocation.lat,
          pickupLocation.lng
        );
        setAddPickupLocation(pickup);

        const dropoff = getLocation(
          dropoffLocation,
          dropoffLocation.lat,
          dropoffLocation.lng
        );
        setAddDestinationLocation(dropoff);
      } catch (error) {
        console.error("❌ Error fetching directions:", error);
      }
    }
  };

  const handleContinue = () => {
    if (!pickupLocation || !dropoffLocation || !selectedVehicle) {
      showErrorToast("Please fill all fields.");
      return;
    }

    const payload = {
      addPickupLocation,
      addDestinationLocation,
      pickupLocation,
      dropoffLocation,
      date: dateValue instanceof Date ? dateValue.toISOString() : null,
      isSchedule,
      selectedVehicle,
      distance,
      duration,
      selectedVehicleDetails,
      selectedVehiclePrice,
    };
    if (order?.orderCustomerDetails) {
      payload.orderCustomerDetails = order?.orderCustomerDetails;
    }
    dispatch(setOrderDetails(payload));

    navigate("/consumer/pickup-details");
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

  return (
    <section className={Styles.requestPickupSec}>
      <div className={Styles.dashboardMainRowCard}>
        <div className="col-md-3">
          <div className={Styles.requestPickupMaincard}>
            <p className={Styles.pickupRequestText}>{t("requestPickup")}</p>
            <LocationInput
              setPickupLocation={setPickupLocation}
              setDropoffLocation={setDropoffLocation}
              calculateRoute={calculateRoute}
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
              travelTimes={vehicleTimes}
              setDuration={setDuration}
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
            center={pickupLocation || currentLocation || DEFAULT_CENTER}
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
                  url: PickupMarger,
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
                  url: PickupMarger,
                  scaledSize: new window.google.maps.Size(35, 35),
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
                  suppressMarkers: true,
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
  );
}

export default ConsumerDashboard;
