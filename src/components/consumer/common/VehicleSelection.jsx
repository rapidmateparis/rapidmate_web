import React from "react";
import Styles from "../../../assets/css/home.module.css";
import Info from "../../../assets/images/info.png";
import getImage from "./GetImage";
import { showErrorToast } from "../../../utils/Toastify";
import { useTranslation } from "react-i18next";

const VehicleSelection = ({
  vehicleTypeList,
  selectedVehicle,
  setSelectedVehicle,
  getPriceUsingVehicleType,
  setSelectedVehicleDetails,
  selectedVehiclePrice,
  setSelectedVehiclePrice,
  openModal,
  dropoffLocation,
  handleVehicleChange
}) => {
  const {t}=useTranslation()
  return (
    <>
      <div className={Styles.homePickupVehicleCardMain}>
        <div className={Styles.selectedVehiclePriceCard}>
          <p className={Styles.pickupRequestText}>{t("chooseVehicle")}</p>
          {selectedVehiclePrice && (
            <p className={Styles.selectedVehiclePriceText}>
             <b>€ {selectedVehiclePrice}</b> {''}Excl. VAT
            </p>
          )}
        </div>
        <div className="row">
          {vehicleTypeList?.map((vehicle, index) => (
            <div key={index} className={`col-md-4 ${Styles.CoustomWidth}`}>
              <div
                className={`${Styles.homePickupVehiclesCard} ${
                  selectedVehicle === vehicle.vehicle_type
                    ? Styles.selected
                    : ""
                }`}
                onClick={() => {
                 
                  if (dropoffLocation!=='' && dropoffLocation[0] !=='') {
                    setSelectedVehicle(vehicle.vehicle_type);
                    setSelectedVehicleDetails(vehicle);
                    handleVehicleChange(vehicle?.vehicle_type)
                    const price = getPriceUsingVehicleType(vehicle.id);
                    setSelectedVehiclePrice(price);
                  }else{
                    showErrorToast('Please pickup and dropoff location.')
                  }
                }}
              >
                <button
                  className={Styles.pickupHomeInfoBtnIcon}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    openModal(vehicle)
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

export default VehicleSelection;
