import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from  "../assets/css/PickupCancellationModal.module.css";
import PickupOrderCancelled from "../components/consumer/PickupOrderCancelled";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { cancelOrderConsumer } from "../data_manager/dataManage";
import { useTranslation } from "react-i18next";

function PickupCancellationReasonModal({ show, handleClose, orderNumber,handleReasonSelect,setSelectedReason,selectedReason }) {
  const [showOrderCancelModal, setOrderCancelModal] = useState(false); // State to manage ResetPasswordModal visibility
  const handleShowOrderCancelModal = () => setOrderCancelModal(true);
  const handleCloseCancelModal = () => setOrderCancelModal(false);
  const [laoding,setLoading]=useState(false);
  const {t}=useTranslation();

  const handleReasonSubmit = () => {
    if (!selectedReason) {
      showErrorToast('Please select a reason'); // Alert if no reason selected
      return;
    }

    setLoading(true);
    let params = {
      order_number: orderNumber,
      cancel_reason_id: selectedReason.id,
      cancel_reason: selectedReason.reason,
    };
    cancelOrderConsumer(
      params,
      successResponse => {
        setLoading(false);
        showSuccessToast(successResponse[0]._response);
      },
      errorResponse => {
        setLoading(false);
        showErrorToast(errorResponse[0]._errors.message);
        return 
      },
    );
    handleShowOrderCancelModal();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={Styles.modalCancellationHeader}>
            <p className={Styles.cancellationReasonText}>{t("cancellationReason")}</p>
            <FontAwesomeIcon className={Styles.modalCloseHeaderBtn} icon={faTimes} onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {[
              { id: 1, reason: t("changeOfPlans") },
              { id: 2, reason: t("iWantChangeDeliveryTime") },
              { id: 3, reason: t("incorrectAddressInformation") },
              { id: 4, reason: t("foundAnotherPerson") },
              { id: 5, reason: t("itTakingLong") },
            ].map((reason, key) => (
              <div
                className={`${Styles.cancellationReasonCard} ${selectedReason?.id === reason.id ? Styles.selected : ""}`}
                onClick={() => handleReasonSelect(reason)}
                key={key}
              >
                <div className={Styles.cancellationModalReasonCircle}>
                  {selectedReason?.id === reason.id && <FontAwesomeIcon className={Styles.reasonCancellationCheckIcon} icon={faCheck} />}
                </div>
                <p className={Styles.cancellationReasonTextDetails}>{reason.reason}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button onClick={handleReasonSubmit} className={Styles.cancellationModalSubmitBtn}>{t("submit")}</button>
          </div>
        </Modal.Footer>
      </Modal>

      {showOrderCancelModal && (
        <PickupOrderCancelled
          show={showOrderCancelModal}
          handleClose={handleCloseCancelModal}
        />
      )}
    </>
  );
}

export default PickupCancellationReasonModal;
