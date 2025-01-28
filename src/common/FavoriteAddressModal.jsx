import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../assets/css/FavoriteAddressModal.module.css";

function FavoriteAddressModal({ show, handleClose }) {
  const addresses = [
    {
      name: "John Doe",
      address:
        "18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson",
    },
    {
      name: "Jane Smith",
      address: "221B Baker Street, London, NW1 6XE, UK",
    },
    {
      name: "Alice Johnson",
      address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
    },
  ];

  return (
    <Modal show={show} onHide={handleClose} className={Styles.modalCustom}>
      <Modal.Header>
        <div className={Styles.modalPickupEditAddressHeader}>
          <p className={Styles.vehicleDimensionsTextHead}>Favorite Address</p>
          <FontAwesomeIcon
            className={Styles.modalCloseHeaderBtn}
            icon={faTimes}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        {addresses.map((item, index) => (
          <div key={index} className={Styles.favAddressMainCard}>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className={Styles.favAddressTextCard}>
              <h4>{item.name}</h4>
              <p>{item.address}</p>
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default FavoriteAddressModal;
