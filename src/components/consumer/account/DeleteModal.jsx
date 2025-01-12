import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import Styles from "../../../assets/css/home.module.css";
import { Link } from "react-router-dom";
import { deleteAddressBookforConsumer, deleteAddressBookforDeliveryBoy, deleteAddressBookforEnterprise } from "../../../data_manager/dataManage";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";

function DeleteModal({ show, handleClose, role, extId, rowId }) {
  const deleteAddress = (rowid) => {
    if (role === "CONSUMER") {
      let consumerParams = {
        id:rowid,
      };
      deleteAddressBookforConsumer(
        consumerParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast(successResponse[0]?._response || "Row delete successfully.")
            handleClose();
          }
        },
        (errorResponse) => {
            handleClose();
            let err = "";
            if (errorResponse.errors) {
              err = errorResponse.errors.msg[0].msg;
            } else {
              err = errorResponse[0]._errors.message;
            }
            showErrorToast(err);
        }
      );
    } else if (role === "DELIVERY_BOY") {
      let deliveryBoyParams = {
        id:rowid,
      };
      deleteAddressBookforDeliveryBoy(
        deliveryBoyParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast(successResponse[0]?._response || "Row delete successfully.");
            handleClose();

          }
        },
        (errorResponse) => {
            handleClose();
            let err = "";
            if (errorResponse.errors) {
              err = errorResponse.errors.msg[0].msg;
            } else {
              err = errorResponse[0]._errors.message;
            }
            showErrorToast(err);
        }
      );
    } else if(role == 'ENTERPRISE') {
      let enterpriseParams = {
        id:rowid,
      };
      deleteAddressBookforEnterprise(
        enterpriseParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            handleClose();
            showSuccessToast(successResponse[0]?._response || "Row delete successfully.");
          }
        },
        (errorResponse) => {
            handleClose();
          let err = "";
          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          showErrorToast(err);
        }
      );
    }else{
        showErrorToast("Unable to add data. Please try again later.");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Are you sure want to delete this address?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Link
              onClick={handleClose}
              className={`${Styles.signinBtn}`}
              style={{ marginRight: "10px", padding: "10px 30px" }}
            >
              cancel
            </Link>
            <button className={modalCss.pickupEditAddressSaveBtn} onClick={()=>deleteAddress(rowId)}>Ok</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
