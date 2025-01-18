import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { MAPS_API_KEY } from "../../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  getAllVehicleTypes,
  getDistancePriceList,
} from "../../../data_manager/dataManage";
import LocationInput from "../../consumer/common/LocationInput";
import { ToastContainer } from "react-toastify";
import DropoffMarker from "../../../assets/images/dropoff-marker.png";
import PickupMarger from "../../../assets/images/pickup-marker.png";
import CommonHeader from "../../../common/CommonHeader";
import Driver from "../../../assets/images/Driver-Image.jpeg";
import Pickup from "../../../assets/images/Pickup.png";
import { useSelector } from "react-redux";

const libraries = ["places"];

function EnterpriseShiftRequestNewDelivery() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [center, setCenter] = useState({
    lat: 48.85754309772872,
    lng: 2.3513877855537912,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllVehicleTypes(
      null,
      (successResponse) => {
        setLoading(false);
        setVehicleTypeList(successResponse[0]._response);
      },
      (errorResponse) => {
        setLoading(false);
        setErrorMessage(errorResponse[0]._errors.message);
      }
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      calculateRoute();
    }
  }, [pickupLocation, dropoffLocation]);

  useEffect(() => {
    if (distance) {
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
    }
  }, [distance]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
      destination: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.requestPickupSec}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-3">
            <div className={Styles.shiftRequestNewDeliveryCard}>
              <p className={Styles.pickupRequestText}>Request New Delivery</p>
              <LocationInput
                setPickupLocation={setPickupLocation}
                setDropoffLocation={setDropoffLocation}
                calculateRoute={calculateRoute}
              />
            </div>
            <div className={Styles.enterpriseShiftRequestNewDeliveryMain}>
              <div className={Styles.enterpriseShiftRequestNewDeliveryCard}>
                <img
                  className={Styles.enterpriseShiftRequestNewDeliveryDriverImg}
                  src={Driver}
                  alt="img"
                />
                <div>
                  <h4
                    className={
                      Styles.enterpriseShiftRequestNewDeliveryDriverName
                    }
                  >
                    John Doe
                  </h4>
                  <p
                    className={
                      Styles.enterpriseShiftRequestNewDeliveryTruckDetails
                    }
                  >
                    VOLVO FH16 2022
                  </p>
                </div>
                <div
                  className={Styles.enterpriseShiftRequestNewDeliveryVehicleImg}
                >
                  <img src={Pickup} alt="img" />
                </div>
              </div>
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
              <Link
                to="/enterprise/shift-add-drop-details"
                className={Styles.goToOrderDetails}
              >
                <p className={Styles.pickuphomeContinueBt}>
                  Continue to order details
                </p>
                <FontAwesomeIcon
                  className="pickupHome-rightArrow-icon"
                  icon={faArrowRight}
                />
              </Link>
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
              mapContainerStyle={{ width: "100%", height: "91vh" }}
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
                    scaledSize: new window.google.maps.Size(25, 36),
                  }}
                />
              )}
              {dropoffLocation && (
                <Marker
                  position={dropoffLocation}
                  icon={{
                    url: DropoffMarker,
                    scaledSize: new window.google.maps.Size(25, 36),
                  }}
                />
              )}
              {currentLocation && (
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
                      strokeColor: "#FF0058",
                      strokeOpacity: 0.9,
                      strokeWeight: 3,
                    },
                    suppressMarkers: true,
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

export default EnterpriseShiftRequestNewDelivery;
