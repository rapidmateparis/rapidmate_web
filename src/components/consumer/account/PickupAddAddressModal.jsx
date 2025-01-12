import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import Styles from "../../../assets/css/home.module.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";
import {
  createConsumerAddressBook,
  createDeliveryBoyAddressBook,
  createEnterpriseAddressBook,
} from "../../../data_manager/dataManage";
const schema = yup.object().shape({
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 6 characters long"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "First Name must be at least 6 characters long"),
  lastName: yup.string(),
  company: yup.string(),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should contain only digits")
    .min(8, "Phone number must be at least 8 digits"),
  email: yup.string(),
  comments: yup.string(),
});
function PickupAddAddressModal({ show, handleClose, role, extId }) {
  const [loading, setLoading] = useState(false);
  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    if (role == "CONSUMER") {
      let consumerParams = {
        consumer_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || "",
        company_name: data?.company || "",
        phone: data?.phoneNumber || "",
        email: data?.email || "",
        comments: data?.comments || "",

      };
      createConsumerAddressBook(
        consumerParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address added successfully");
            handleClose();
            setLoading(false);
          }
        },
        (errorResponse) => {
          setLoading(false);
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
    } else if (role == "DELIVERY_BOY") {
      let deliveryboyParams = {
        delivery_boy_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || "",
        company_name: data?.company || "",
        phone: data?.phoneNumber || "",
        email: data?.email || "",
        comments: data?.comments || "",

      };

      console.log("params => ", deliveryboyParams);
      createDeliveryBoyAddressBook(
        deliveryboyParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address added successfully");
            handleClose();
            setLoading(false);
          }
        },
        (errorResponse) => {
          setLoading(false);
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
    } else if (role == "ENTERPRISE") {
      let enterpriseParams = {
        enterprise_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || "",
        company_name: data?.company || "",
        phone: data?.phoneNumber || "",
        email: data?.email || "",
        comments: data?.comments || "",
      };
      createEnterpriseAddressBook(
        enterpriseParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address added successfully");
            handleClose();
            setLoading(false);
          }
        },
        (errorResponse) => {
          setLoading(false);
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
    } else {
      showErrorToast("Unable to add data. Please try again later.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={modalCss.modalPickupEditAddressHeader}>
            <p className={modalCss.vehicleDimensionsTextHead}>
              Add New Address
            </p>
            <FontAwesomeIcon
              className={modalCss.modalCloseHeaderBtn}
              icon={faTimes}
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label
                htmlFor="address"
                className={Styles.addPickupDetailFormLabels}
              >
                Address
              </label>
              <div className={Styles.pickupSignupContainer}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Type here..."
                      style={{ width: "100%", padding: "5px" }}
                      className={Styles.signupUserName}
                    />
                  )}
                />
              </div>
              {errors.address && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className={Styles.addPickupDetailFormLabels}
                  >
                    First Name
                  </label>

                  <div className={Styles.pickupSignupContainer}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Type here..."
                          style={{ width: "100%", padding: "5px" }}
                          className={Styles.signupUserName}
                        />
                      )}
                    />
                  </div>
                  {errors.firstName && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="lastName"
                    className={Styles.addPickupDetailFormLabels}
                  >
                    Last Name
                  </label>

                  <div className={Styles.pickupSignupContainer}>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type={"text"}
                          placeholder="Type here..."
                          style={{ width: "100%", padding: "5px" }}
                          className={Styles.signupUserName}
                        />
                      )}
                    />
                  </div>
                  {errors.lastName && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label
                  htmlFor="company"
                  className={Styles.addPickupDetailFormLabels}
                >
                  Company
                </label>
                <div className={Styles.pickupSignupContainer}>
                  <Controller
                    name="company"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here..."
                        style={{ width: "100%", padding: "5px" }}
                        className={Styles.signupUserName}
                      />
                    )}
                  />
                </div>
                {errors.company && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      country={"fr"}
                      value={value}
                      countryCodeEditable={false}
                      onChange={onChange}
                      inputStyle={{
                        width: "100%",
                        paddingLeft: "42px",
                      }}
                      dropdownStyle={{ borderColor: "#ccc" }}
                      enableSearch
                      searchPlaceholder="Search country"
                      specialLabel=""
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className={Styles.addPickupDetailFormLabels}
                >
                  Email
                </label>
                <div className={Styles.pickupSignupContainer}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type={"text"}
                        placeholder="Type here..."
                        style={{ width: "100%", padding: "5px" }}
                        className={Styles.signupUserName}
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
              <label
                  htmlFor="comments"
                  className={Styles.addPickupDetailFormLabels}
                >
                  Comments
                </label>
                <div className={Styles.pickupSignupContainer}>
                  <Controller
                    name="comments"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <textarea
                        {...field}
                        type="text"
                        row={2}
                        placeholder="Type here..."
                        style={{ width: "100%", padding: "5px" }}
                        className={Styles.signupUserName}
                      />
                    )}
                  />
                </div>
                {errors.comments && (
                  <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                    {errors.comments.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className={modalCss.pickupEditAddressSaveBtn}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PickupAddAddressModal;
