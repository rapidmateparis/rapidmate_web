import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock } from "@fortawesome/free-regular-svg-icons";
import { faMailBulk, faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import Styles from "../assets/css/PickupNotificationModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import customStyle from "../assets/css/home.module.css";

function MessageModal({ show, handleClose }) {
  return (
    <>
      <div>
        <Modal
          className="pickupNotification-modalMain"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <div className={`${Styles.pickupNotificationHeader}`}>
              <p className={Styles.pickupnotificationTitle}>Supports</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <div
                  className={`${customStyle.deliveryboyProfileTypeMainCard} p-1`}
                >
                  <div className={customStyle.DeliveryboyProfiletypeImgCard}>
                    <FontAwesomeIcon icon={faPhone} className={customStyle.textColor} />
                  </div>
                  <div>
                    <h4 className={customStyle.deliveryboyProfiletypeText}>
                      Support phone
                    </h4>
                    <p
                       className={`${customStyle.deliveryboyProfileTypeDiscription} ${customStyle.textColor}`}
                    >
                      +33 75 23 71022
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={`${customStyle.deliveryboyProfileTypeMainCard} p-1`}
                >
                  <div className={customStyle.DeliveryboyProfiletypeImgCard}>
                    <FontAwesomeIcon icon={faMailBulk} className={customStyle.textColor}  />
                  </div>
                  <div>
                    <h4 className={customStyle.deliveryboyProfiletypeText}>
                      Support Email
                    </h4>
                    <p
                      className={`${customStyle.deliveryboyProfileTypeDiscription} ${customStyle.textColor}`}
                    >
                      support@rapidmate.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MessageModal;
