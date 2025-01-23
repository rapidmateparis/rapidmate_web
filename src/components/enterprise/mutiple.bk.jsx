import React, { useEffect, useRef, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { buildAddress, MAPS_API_KEY } from "../../utils/Constants";
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
import { useSelector } from "react-redux";
import LocationInputs from "./common/LocationInputs";
import { showErrorToast } from "../../utils/Toastify";
import DropoffMarker from "../../assets/images/dropoff-marker.png";
import PickupMarker from "../../assets/images/Location-Icon.png";
const libraries = ["places"];

function MultipleDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType, selectedBranch } = location.state;
  const user = useSelector((state) => state.auth.user);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [center, setCenter] = useState({
    lat: parseFloat(selectedBranch.latitude),
    lng: parseFloat(selectedBranch.longitude),
  });
  const [currentLocation, setCurrentLocation] = useState();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [pickupLocation, setPickupLocation] = useState({
    address: buildAddress(
      selectedBranch?.address,
      selectedBranch?.city,
      selectedBranch?.state,
      selectedBranch?.country,
      selectedBranch?.postal_code
    ),
    ...center,
  });
  const [dropoffLocation, setDropoffLocation] = useState([
    {
      address: "",
      displayedAddress: "",
      lat: null,
      lng: null,
      components: [],
    },
  ]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [map, setMap] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const { enterpriseServiceType } = useSelector(
    (state) => state.commonData.commonData
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
          showErrorToast(err);
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
    }
  }, []);

  // useEffect(() => {
  //   if (pickupLocation && dropoffLocation) {
  //     calculateRoute();
  //   }
  // }, [pickupLocation, dropoffLocation]); // Recalculate route when either location changes

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  const calculateRoute = async () => {
    console.log("dropoff location", dropoffLocation);

    if (pickupLocation && dropoffLocation.length > 0) {
      const directionsService = new google.maps.DirectionsService();

      // Format waypoints for multiple drop-off locations
      const waypoints = dropoffLocation.map((location) => ({
        location: new google.maps.LatLng(location.lat, location.lng),
        stopover: true,
      }));

      // Set the destination as the last drop-off location
      const lastDropoff = dropoffLocation[dropoffLocation.length - 1];

      // Calculate the route with multiple waypoints
      try {
        const results = await directionsService.route({
          origin: pickupLocation,
          destination: lastDropoff, // Final drop-off destination
          waypoints: waypoints, // Multiple drop-offs as waypoints
          travelMode: google.maps.TravelMode.DRIVING,
        });

        // Update the UI with the calculated route information
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        console.log(pickupLocation);
      } catch (error) {
        console.error("Error calculating route:", error);
      }
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

    const payload = {
      pickupLocation,
      dropoffLocation,
      selectedVehicle,
      distance,
      duration,
      selectedVehicleDetails,
      selectedVehiclePrice,
      selectedServiceType,
      selectedBranch,
      serviceType,
    };

    navigate("/enterprise/add-pickup-details", {
      state: { order: payload },
    });
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
    <>
      <CommonHeader userData={user} />
      <section className={Styles.requestPickupSec}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-3">
            <div className={Styles.requestPickupMaincard}>
              <p className={Styles.pickupRequestText}>Request a Pick up!</p>
              <LocationInputs
                setPickupLocation={setPickupLocation}
                setDropoffLocation={setDropoffLocation}
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                calculateRoute={calculateRoute}
                isPickupDisabled={true}
              />

              <ServiceTypeSelection
                vehicleTypeList={vehicleTypeList}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                setSelectedVehicleDetails={setSelectedVehicleDetails}
                selectedVehiclePrice={selectedVehiclePrice}
                setSelectedVehiclePrice={setSelectedVehiclePrice}
                getPriceUsingVehicleType={getPriceUsingVehicleType}
                openModal={openModal}
                dropoffLocation={dropoffLocation}
                selectedServiceType={selectedServiceType}
                setSelectedServiceType={setSelectedServiceType}
                enterpriseServiceType={enterpriseServiceType}
              />
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                width: "25%",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
                zIndex: "1000",
              }}
            >
              <button
                onClick={handleContinue}
                className={Styles.goToOrderDetails}
              >
                <p className={Styles.pickuphomeContinueBt}>
                  Continue to order details
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
              mapContainerStyle={{ width: "100%", height: "90.5vh" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {/* Pickup location marker */}
              {pickupLocation && (
                <Marker
                  position={pickupLocation}
                  icon={{
                    url: PickupMarker,
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                  }}
                />
              )}

              {/* Multiple drop-off location markers */}
              {dropoffLocation &&
                dropoffLocation.length > 0 &&
                dropoffLocation.map((dropoff, index) => (
                  <Marker
                    key={index}
                    position={{ lat: dropoff.lat, lng: dropoff.lng }}
                    icon={{
                      url: DropoffMarker,
                      scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                    }} // Dynamic label for multiple dropoffs
                  />
                ))}

              {/* Current location marker */}
              {currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: PickupMarker,
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
                  }}
                />
              )}

              {/* Directions Renderer for the route */}
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{ suppressMarkers: true }}
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

export default MultipleDelivery;
