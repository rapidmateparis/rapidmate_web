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
import MapComponent from "./MapComponent";
const libraries = ["places"];

function MultipleDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const user =useSelector((state)=>state.auth.user)
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocations, setDropoffLocations] = useState([]);

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
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.requestPickupSec}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-3">
            <div className={Styles.requestPickupMaincard}>
              <p className={Styles.pickupRequestText}>Request a Pick up!</p>
              

              
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
            
            <MapComponent locations={combinedLocations} />
          </div>
        </div>

       
        <ToastContainer />
      </section>
    </>
  );
}

export default MultipleDelivery;
