import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/PickupCancellationModal.module.css";
import BicycleImage from "../../assets/images/Modal-Bicycle.png";
import ScooterImage from "../../assets/images/Modal-Scooter.png";
import CarImage from "../../assets/images/Modal-Car.png";
import PartnerImage from "../../assets/images/Modal-Partner.png";
import PickupImage from "../../assets/images/Modal-Van.png";
import VanImage from "../../assets/images/Modal-Pickup.png";
import TruckImage from "../../assets/images/Modal-Truck.png";
import OtherImage from "../../assets/images/Modal-Other.png";

function PickupVehicleDimensionsModal({ show, handleClose, vehicle }) {
  const getVehicleImage = (name) => {
    switch (name) {
      case "Cycle":
        return BicycleImage;
      case "Scooter":
        return ScooterImage;
      case "Car":
        return CarImage;
      case "Partner":
        return PartnerImage;
      case "Van":
        return VanImage;
      case "Pickup":
        return PickupImage;
      case "Truck":
        return TruckImage;
      case "Other":
        return OtherImage;
      default:
        return null;
    }
  };

  const vehicleImage = getVehicleImage(vehicle?.vehicle_type);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className={Styles.modalCancellationHeader}>
          <p className={Styles.vehicleDimensionsTextHead}>Vehicle dimensions</p>
          <FontAwesomeIcon
            className={Styles.modalCloseHeaderBtn}
            icon={faTimes}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className={Styles.modalImageContainer}>
            {vehicleImage && (
              <img
                src={vehicleImage}
                alt={`${vehicle?.vehicle_type} Image`}
                className={Styles.modalVehicleImage}
              />
            )}
          </div>
          {vehicle && (
            <div>
              <div className={Styles.vehicleDimensionsCountCard}>
                <p className={Styles.vehicleDimensionsCounts}>1</p>
                <p className={Styles.vehicleDimensionsLength}>
                  Length <b>{vehicle.length}</b>
                </p>
              </div>

              <div className={Styles.vehicleDimensionsCountCard}>
                <p className={Styles.vehicleDimensionsCounts}>2</p>
                <p className={Styles.vehicleDimensionsLength}>
                  Height <b>{vehicle.height}</b>
                </p>
              </div>

              <div className={Styles.vehicleDimensionsCountCard}>
                <p className={Styles.vehicleDimensionsCounts}>3</p>
                <p className={Styles.vehicleDimensionsLength}>
                  Width <b>{vehicle.width}</b>
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <div>
          <button className={Styles.VehicleDimensionsModalSubmitBtn}>Ok</button>
        </div>
      </Modal.Footer> */}
    </Modal>
  );
}

export default PickupVehicleDimensionsModal;
