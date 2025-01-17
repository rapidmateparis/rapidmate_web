import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Styles from "../../../assets/css/DeliveryboyAssignedModal.module.css";
import Driver from "../../../assets/images/Driver-Image.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DeliveryboyAssignedModal = ({ show, handleClose }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleEmailSubmit = () => {
    // Handle email submission logic here
    setShowOtpModal(true);
    handleClose();
  };

  const handleCloseOtpModal = () => setShowOtpModal(false);

  return (
    <section>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-main"
      >
        <Modal.Header>
          <div className={Styles.modalMainHeader}>
            <FontAwesomeIcon
              className={Styles.modalBackClose}
              onClick={handleClose}
              icon={faArrowLeft}
            />
            <div className={Styles.driverlogoHeaderMainCard}>
              <div>
                <img className={Styles.driverImgSmall} src={Driver} alt="Logo" />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={Styles.DeliveryboyTitleHeaderCard}>
            <h2 className={Styles.forgotPasswordTitle}>Delivery boy assigned</h2>
            <p className={Styles.forgotPasswordSubtitle}>
              John Doe accepted your delivery schedule
            </p>
          </div>

          <div className={Styles.enterpriseDeliveryboyProfileCard}>
            <p className={Styles.enterpriseDeliveryboyProfileText}>
              John Doe’s profile:
            </p>
            <div className={Styles.enterpriseDeliveryboyDeliveriesMainCard}>
              <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>20</h4>
                <p className={Styles.enterpriseDeliveryboyDeliveriesText}>
                  Deliveries
                </p>
              </div>

              <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>80</h4>
                <p className={Styles.enterpriseDeliveryboyDeliveriesText}>
                  Total hours
                </p>
              </div>

              <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>4.9</h4>
                <p className={Styles.enterpriseDeliveryboyDeliveriesText}>Rating</p>
              </div>
            </div>
          </div>

          <div className={Styles.enterpriseDeliveryboyScheduleOverviewMainCard}>
            <div className={Styles.enterpriseDeliveryboyScheduleOverviewCard}>
              <p className={Styles.enterpriseDeliveryboyProfileText}>
                Schedule overview:
              </p>
              <div className={Styles.enterpriseDeliveryboyDeliveriesMainCard}>
                <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                  <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>20</h4>
                  <p className={Styles.enterpriseDeliveryboyDeliveriesText}>
                    Deliveries
                  </p>
                </div>

                <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                  <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>80</h4>
                  <p className={Styles.enterpriseDeliveryboyDeliveriesText}>
                    Total hours
                  </p>
                </div>

                <div className={Styles.enterpriseDeliveryboyDeliveriesCard}>
                  <h4 className={Styles.enterpriseDeliveryboyDeliveriesCount}>4.9</h4>
                  <p className={Styles.enterpriseDeliveryboyDeliveriesText}>Rating</p>
                </div>
              </div>
              <div className={Styles.enterpriseDeliveryboyScheduleDateTimeCard}>
                <p className={Styles.enterpriseDeliveryboyScheduleFrom}>
                  From <b>20-02-24,</b>
                </p>
                <p className={Styles.enterpriseDeliveryboyScheduleFrom}>
                  To <b>10-03-24,</b>
                </p>
              </div>
              <p className={Styles.enterpriseDeliveryboyScheduleDtailsText}>
                Some days have different time slots, please see details!
              </p>
            </div>
            <div>
              <Link className={Styles.enterpriseDeliveryboyScheduleSeeDetailsCard}>
                <p className={Styles.enterpriseDeliveryboyScheduleSeeDetailsText}>
                  See details
                </p>
                <FontAwesomeIcon
                  className={Styles.enterpriseDeliveryboyScheduleSeeDetailsRightIcon}
                  icon={faArrowRight}
                />
              </Link>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={Styles.enterpriseDeliveryboyScheduleFooter}>
          <div>
            <button onClick={handleEmailSubmit} className={Styles.enterpriseDeliveryboyScheduledOkBtn}>Ok</button>
          </div>
          <div className={Styles.enterpriseDeliveryboyScheduledGotoBtnCard}>
           <Link to="/" className={Styles.enterpriseDeliveryboyScheduledGotoBtn}>Go to shift page</Link>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default DeliveryboyAssignedModal;
