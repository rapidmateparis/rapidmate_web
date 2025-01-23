import React, { useEffect, useRef, useState } from "react";
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

import MapComponent from "./MapComponent";
import LocationInput from "./LocationInput";

function MultipleDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [currentLocation, setCurrentLocation] = useState();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const { enterpriseServiceType } = useSelector(
      (state) => state.commonData.commonData
    );
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocations, setDropoffLocations] = useState([""]);
  const [distances, setDistances] = useState([]);

  const handlePickupChange = (location) => {
    setPickupLocation(location);
  };

  const handleDropoffChange = (index, location) => {
    setDropoffLocations((prev) => {
      const updatedLocations = [...prev];
      updatedLocations[index] = location;
      return updatedLocations;
    });
  };

  const addDropoffRow = () => {
    setDropoffLocations((prev) => [...prev, ""]);
  };

  const removeDropoffRow = (index) => {
    setDropoffLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const combinedLocations = [pickupLocation, ...dropoffLocations].filter(
    Boolean
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
              <div className={Styles.homePickupDropAddressCards}>
                <div className={Styles.pickupAddresAutocompleteCard}>
                  <LocationInput
                    onLocationChange={handlePickupChange}
                    title="Enter pickup location"
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
                      onLocationChange={(location) =>
                        handleDropoffChange(index, location)
                      }
                      title="Enter drop-off location"
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
              <button className={Styles.goToOrderDetails}>
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
            <MapComponent locations={combinedLocations} setDistances={setDistances} />
          </div>
        </div>

        <ToastContainer />
      </section>
    </>
  );
}

export default MultipleDelivery;
