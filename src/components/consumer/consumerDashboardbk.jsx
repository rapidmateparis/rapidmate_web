import React, { useEffect, useRef, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { MAPS_API_KEY } from "../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Info from "../../assets/images/info.png";
import Bicycle from "../../assets/images/Bicycle.png";
import Scooter from "../../assets/images/Scooter.png";
import Car from "../../assets/images/Car.png";
import Partner from "../../assets/images/Partner.png";
import Van from "../../assets/images/Van.png";
import Pickup from "../../assets/images/Pickup.png";
import Truck from "../../assets/images/Truck.png";
import Other from "../../assets/images/Package.png";

import DateAndTimePicker from "../../common/PickupHomeDateTimePicker";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  getAllVehicleTypes,
  getDistancePriceList,
} from "../../data_manager/dataManage";
import PickupVehicleDimensionsModal from "./PickupVehicleDimensionsModal";
const libraries = ['places'];
function ConsumerDashboard() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [center, setCenter] = useState({lat:48.85754309772872, lng:2.3513877855537912});
  const [map, setMap] = useState(null);
  const [distanceTime, setDistanceTime] = useState();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distancePriceList, setDistancePriceList] = useState([]);
  const originRef = useRef();
  const destiantionRef = useRef();

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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const geocoder = new google.maps.Geocoder();
        setCenter({ lat, lng });
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              originRef.current.value = results[0].formatted_address;
            }
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      },
      (error) => {
        console.error("Error getting current location: " + error.message);
      }
    );
  }, []);
  useEffect(() => {
    const getDistancePrice = () => {
      const distanceValue=distance.replace(' km', '')
      getDistancePriceList(
        distanceValue,
        (successResponse) => {
          setDistancePriceList(successResponse[0]._response);
        },
        (errorResponse) => {
         //
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

  const getImage = (vehicleData) => {
    switch (vehicleData.vehicle_type_id) {
      case 1:
        return Bicycle;
      case 2:
        return Scooter;
      case 3:
        return Car;
      case 4:
        return Partner;
      case 5:
        return Van;
      case 6:
        return Pickup;
      case 7:
        return Truck;
      default:
        return Other;
    }
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    setDirectionsResponse(null);
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  const getPriceUsingVechicelType = vehicleTypeId => {
    //€
    let finalPrice = 0;
    let result = distancePriceList.filter(
      priceList => priceList.vehicle_type_id == vehicleTypeId,
    );
    finalPrice = result[0]?.total_price;
    return finalPrice;
  };

  const handlerContinue=()=>{
    const destination = destiantionRef.current.value;
    
    if (destination?.trim() && selectedVehicle?.trim()) {
      navigate("/consumer/pickup-details");
    } else {
      // Alert user if no destination is provided
      alert("Please enter a dropoff location and select a vehicle.");
    }
    
  }
  return (
    <section className={Styles.requestPickupSec}>
      <div className={`row ${Styles.manageRow}`}>
        <div className="col-md-3">
          <div className={Styles.requestPickupMaincard}>
            <p className={Styles.pickupRequestText}>Request a Pick up!</p>
            <div className={Styles.homePickupDropAddressCards}>
              <div className={Styles.pickupAddresAutocompleteCard}>
                <FontAwesomeIcon
                  className={Styles.pickupHomeLocationIcon}
                  icon={faLocationDot}
                />
                <div style={{ width: "100%" }}>
                  <Autocomplete>
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
                  <Autocomplete>
                    <input
                      className={Styles.homeMapPlaceSearch}
                      type="text"
                      placeholder="Enter drop-off location"
                      ref={destiantionRef}
                      onBlur={calculateRoute}
                    />
                  </Autocomplete>
                </div>

                <FontAwesomeIcon
                  className="pickupHome-rightArrow-icon"
                  icon={faArrowRight}
                />
              </div>
            </div>

            <div>
              <p className={Styles.pickupRequestText}>
                Request it now or schedule for later
              </p>
              <DateAndTimePicker />
            </div>
            <div className={Styles.homePickupVehicleCardMain}>
              {/* Display Selected Vehicle Price */}
              <div className={Styles.selectedVehiclePriceCard}>
                <p className={Styles.pickupRequestText}>Choose the vehicle</p>
                {selectedVehiclePrice && (
                  <p className={Styles.selectedVehiclePriceText}>
                    {selectedVehiclePrice} €
                  </p>
                )}
              </div>
              <div className="row">
                {loading ? (
                  <p>Loading....</p>
                ) : (
                  vehicleTypeList.map((vehicle, index) => (
                    <div key={index} className="col-md-4">
                      <div
                        className={`${Styles.homePickupVehiclesCard} ${
                          selectedVehicle === vehicle.vehicle_type
                            ? Styles.selected
                            : ""
                        }`}
                        
                      >
                        <button
                          className={Styles.pickupHomeInfoBtnIcon}
                          onClick={() => openModal(vehicle)}
                        >
                          <img
                            className={Styles.homePickupInfo}
                            src={Info}
                            alt="info-Icon"
                          />
                        </button>
                        <img
                          className={`${Styles.homePickupBicycle} ${vehicle.className}`}
                          src={getImage(vehicle)}
                          alt={`${vehicle.vehicle_type} Icon`}
                          onClick={() => {
                            if (destiantionRef.current.value!=='') {
                              setSelectedVehicle(vehicle.vehicle_type);
                              setSelectedVehicleDetails(vehicle);
                              const price = getPriceUsingVechicelType(vehicle.id);
                              setSelectedVehiclePrice(price);
                            } else {
                              alert("Enter pickup and dropoff address.");
                            }
                          }}
                        />
                      </div>
                      <div className={Styles.pickupHomeVehicleTypeCap} >
                        <h4 className={Styles.pickupHomeVehicleTypeByName}>
                          {vehicle.vehicle_type}
                        </h4>
                        <p className={Styles.pickupHomeVehicleCap}>
                          {vehicle.vehicle_type_desc}
                        </p>
                      </div>
                    </div>
                  ))
                )}
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
            <button onClick={handlerContinue} className={Styles.goToOrderDetails}>
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
                  width: "170px",
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
            mapContainerStyle={{ height: "93vh", width: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
      </div>
      {/* ------------ Modal is Here -----------  */}
      <PickupVehicleDimensionsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        vehicle={selectedVehicle}
      />
    </section>
  );
}

export default ConsumerDashboard;
