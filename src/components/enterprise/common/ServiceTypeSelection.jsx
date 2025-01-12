import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Info from "../../../assets/images/info.png";
import getImage from "../../consumer/common/GetImage";
import { showErrorToast } from "../../../utils/Toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

const ServiceTypeSelection = ({
  vehicleTypeList,
  selectedVehicle,
  setSelectedVehicle,
  getPriceUsingVehicleType,
  setSelectedVehicleDetails,
  selectedVehiclePrice,
  setSelectedVehiclePrice,
  openModal,
  dropoffLocation,
  selectedServiceType, 
  setSelectedServiceType,
  enterpriseServiceType,
}) => {
  
  const handleServiceTypeClick = (serviceType, vehicleMatch) => {
    
    if (serviceType===1) {
      const vehicle = vehicleTypeList.find(
        (v) => v.id === vehicleMatch
      );
      if (vehicle) {
        if (dropoffLocation !== "") {
          setSelectedVehicle(vehicle.vehicle_type);
          setSelectedVehicleDetails(vehicle);
          const price = getPriceUsingVehicleType(vehicle.id);
          setSelectedVehiclePrice(price);
        } else {
          showErrorToast("Please select a pickup and dropoff location.");
          return 
        }
      }
      

    };
    setSelectedServiceType(serviceType);
  }

  return (
    <>
      <p className={Styles.enterpriseNewScheduleSelectType}>
        Select service type
      </p>

      {/* Delivery Boy with Scooter */}

      {enterpriseServiceType?.map((item, key) => (
        <div
          className={`${Styles.enterpriseselectServicesOptionCard} py-2`}
          onClick={() =>handleServiceTypeClick(item?.id, 2)} 
          key={key}
        >
          <FontAwesomeIcon
            className={Styles.enterpriseSelectServiceTypeCricle}
            icon={selectedServiceType === item?.id  ? faCircleDot : faCircle}
            style={{color:selectedServiceType === item?.id ? "red" : "black",}}
          />
          <p className={Styles.enterpriseSelectServiceTypeText}>
            {item?.service_type}
          </p>
        </div>
      ))}

      {/* Vehicle Selection Section */}
      <div className={Styles.homePickupVehicleCardMain}>
        <div className={Styles.selectedVehiclePriceCard}>
          <p className={Styles.pickupRequestText}>Choose the vehicle</p>
          {selectedVehiclePrice && (
            <p className={Styles.selectedVehiclePriceText}>
              {selectedVehiclePrice} €
            </p>
          )}
        </div>
        <div className="row">
          {vehicleTypeList.map((vehicle, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`${Styles.homePickupVehiclesCard} ${
                  selectedVehicle === vehicle.vehicle_type
                    ? Styles.selected
                    : ""
                }`}
                onClick={() => {
                  if (selectedServiceType ===1) {
                    showErrorToast(
                      "Cannot select another vehicle with this service type."
                    );
                    return;
                  }
                  if (dropoffLocation !== "") {
                    setSelectedVehicle(vehicle.vehicle_type);
                    setSelectedVehicleDetails(vehicle);
                    const price = getPriceUsingVehicleType(vehicle.id);
                    setSelectedVehiclePrice(price);
                  } else {
                    showErrorToast(
                      "Please select a pickup and dropoff location."
                    );
                  }
                }}
              >
                <button
                  className={Styles.pickupHomeInfoBtnIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(vehicle);
                  }}
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
                  alt={vehicle.vehicle_type}
                />
              </div>
              <div className={Styles.pickupHomeVehicleTypeCap}>
                <h4 className={Styles.pickupHomeVehicleTypeByName}>
                  {vehicle.vehicle_type}
                </h4>
                <p className={Styles.pickupHomeVehicleCap}>
                  {vehicle.vehicle_type_desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceTypeSelection;
