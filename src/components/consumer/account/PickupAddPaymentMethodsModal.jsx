import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addConsumerPaymentMethod } from "../../../data_manager/dataManage";
import { showErrorToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  cardHolderName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Cardholder name must contain only letters and spaces"
    )
    .required("Cardholder name is required"),
  expirationDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    )
    .required("Expiration date is required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});

function PickupAddPaymentMethodsModal({ show, handleClose, getPaymentCard }) {
  const user = useSelector((state) => state.auth.user);
  const [loading,setLoading]=useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Form submit handler
  const onSubmit = (data) => {
    let params = {
      consumer_ext_id: user?.userDetails.ext_id,
      card_number: data?.cardNumber,
      card_holder_name: data?.cardHolderName,
      expiration_date: data?.expirationDate,
      cvv: data?.cvv,
      payment_method_type_id: 1,
    };
    addConsumerPaymentMethod(
      params,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          getPaymentCard();
          handleClose()
        }
      },
      (errorResponse) => {
        setLoading(false);
        console.log(errorResponse[0]._errors.message)
        showErrorToast(errorResponse[0]?._errors.message)
      }
    );
    
  };

  return (
    <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className={modalCss.modalPickupEditAddressHeader}>
          <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
            Add Payment Methods
          </p>
          <FontAwesomeIcon
            className="modalClose-HeaderBtn"
            icon={faTimes}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Enter card number"
                  isInvalid={!!errors.cardNumber}
                />
              )}
            />
            {errors.cardNumber && (
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCardHolderName">
            <Form.Label>Cardholder Name</Form.Label>
            <Controller
              name="cardHolderName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Enter cardholder name"
                  isInvalid={!!errors.cardHolderName}
                />
              )}
            />
            {errors.cardHolderName && (
              <Form.Control.Feedback type="invalid">
                {errors.cardHolderName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formExpirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Controller
              name="expirationDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="MM/YY"
                  isInvalid={!!errors.expirationDate}
                />
              )}
            />
            {errors.expirationDate && (
              <Form.Control.Feedback type="invalid">
                {errors.expirationDate.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="Enter CVV"
                  isInvalid={!!errors.cvv}
                />
              )}
            />
            {errors.cvv && (
              <Form.Control.Feedback type="invalid">
                {errors.cvv.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#FFC72B", borderColor: "#FFC72B" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    <ToastContainer />
    </>
    
  );
}

export default PickupAddPaymentMethodsModal;
