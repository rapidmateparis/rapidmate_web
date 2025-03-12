import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import SadEmoji from "../../assets/images/SadFace-Emoji.png";
import Styles from  "../../assets/css/PickupCancellationModal.module.css";
import { useTranslation } from "react-i18next";

import { Link, useNavigate } from "react-router-dom";

function PickupOrderCancelled({ show, handleClose}) {
  const navigate=useNavigate()
    const handleSaveChanges = () => {
        // Implement save changes logic here, if needed
        handleClose();
        navigate('/consumber/dashboard')
      };
      const {t}=useTranslation();

      return (
        <>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
              <div className={Styles.modalCancellationHeader}>
                <p className={Styles.orderCanceledTextHead}>{t("orderCancelled")}</p>
                <FontAwesomeIcon  className={Styles.modalCloseHeaderBtn} icon={faTimes} onClick={handleSaveChanges} />
              </div>
            </Modal.Header>
            <Modal.Body>
               <div className={Styles.orderCanceledMainCard}>
                  <img className={Styles.orderCanceledSadEmoji} src={SadEmoji} alt="Emoji" />
                  <div>
                    <h6 className={Styles.yourOrderCancelText}>{t("yourOrderIsCancelled")}</h6>
                    <p className={Styles.orderCanceledMsg}>{t("yourOrderIsCancelledDescription")}</p>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <div>
                  <Link to="/consumer/dashboard" className={Styles.cancellationModalSubmitBtn}>{t("ok")}</Link>
               </div>
            </Modal.Footer>
          </Modal>
        </>
      )
}

export default PickupOrderCancelled