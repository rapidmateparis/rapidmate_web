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
import { updateAddressBookforConsumer, updateAddressBookforDeliveryBoy, updateAddressBookforEnterprise } from "../../../data_manager/dataManage";
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
});
function PickupEditAddressModal({
  show,
  handleClose,
  addressData,
  role,
  extId,
}) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    if (role == "CONSUMER") {
      let consumerParams = {
        id: addressData.id,
        consumer_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || addressData?.last_name,
        company_name: data?.company || addressData?.company_name,
        phone: data?.phoneNumber || addressData?.phone,
        email: data?.email || addressData?.email,
      };
      updateAddressBookforConsumer(
        consumerParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address updated successfully");
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
        id: addressData.id,
        delivery_boy_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || addressData?.last_name,
        company_name: data?.company || addressData?.company_name,
        phone: data?.phoneNumber || addressData?.phone,
        email: data?.email || addressData?.email,
      };
      updateAddressBookforDeliveryBoy(
        deliveryboyParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address updated successfully");
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
        id: addressData.id,
        enterprise_ext_id: extId,
        address: data?.address,
        first_name: data?.firstName,
        last_name: data?.lastName || addressData?.last_name,
        company_name: data?.company || addressData?.company_name,
        phone: data?.phoneNumber || addressData?.phone,
        email: data?.email || addressData?.email,
      };
      updateAddressBookforEnterprise(
        enterpriseParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            showSuccessToast("Address updated successfully");
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
      showErrorToast("Unable to update data. Please try again later.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={modalCss.modalPickupEditAddressHeader}>
            <p className={modalCss.vehicleDimensionsTextHead}>
              Edit Address
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
                  defaultValue={addressData?.address}
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
                      defaultValue={addressData?.first_name}
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
                      defaultValue={addressData?.last_name}
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
                    defaultValue={addressData?.company_name}
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
                  defaultValue={addressData?.phone}
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
                    defaultValue={addressData?.email}
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

export default PickupEditAddressModal;
