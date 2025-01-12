import React, { useDebugValue, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import BillingAddressBook from "../../../common/BillingAddressBook";
import { Spinner } from "react-bootstrap";
import {
  addConsumerBillingDetails,
  getConsumerBillingDetails,
  updateDeliveryBoyBillingDetails,
} from "../../../data_manager/dataManage";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";

const BillingDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState(null);
  const schema = yup.object().shape({
    firstname: yup
      .string()
      .required("Firstname is required")
      .min(3, "Firstname must be at least 3 characters long"),
    lastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    address: yup
      .string()
      .required("Last name is required")
      .min(6, "Last name must be at least 2 characters long"),
    ...(user?.userDetails?.role === "ENTERPRISE" && {
      company: yup.string().required("Company name is required"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number should contain only digits")
        .min(8, "Phone number must be at least 8 digits"),
    }),
    ...(user?.userDetails?.role === "CONSUMER" ||
      (user?.userDetails?.role === "DELIVERY_BOY" && {
        account: yup
          .object()
          .shape({
            value: yup.string().required("Account is required"),
          })
          .required("Country is required"),
      })),
    postalcode: yup
      .string()
      .required("Postal code is required")
      .matches(/^\d{5}$/, "Postal code must be exactly 5 digits"),
    dninumber: yup.string().required("DNI number is required"),
    country: yup
      .object()
      .shape({
        value: yup.string().required("Country is required"),
      })
      .required("Country is required"),
    city: yup
      .object()
      .shape({
        value: yup.string().required("City is required"),
      })
      .required("City is required"),
    state: yup
      .object()
      .shape({
        value: yup.string().required("State is required"),
      })
      .required("State is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // setLoading(true);
 
    if (user.userDetails.role == "CONSUMER") {
      setLoading(true)
      let params = {
        consumer_ext_id: user.userDetails.ext_id,
        first_name: data.firstname,
        last_name: data.lastname,
        address: data.address,
        city_id: data.city.value,
        state_id: data.state.value,
        country_id: data.country.value,
        dni_number: data.dninumber,
        postal_code: data.postalcode,
        account_type: data.account.value,
      };
      addConsumerBillingDetails(
        params,
        (successResponse) => {
          setLoading(false)
          showSuccessToast("Billing details updated successfully");
        },
        (errorResponse) => {
          setLoading(false)
          console.log("errorResponse", JSON.stringify(errorResponse));
          showErrorToast(errorResponse[0]._errors.message);
        }
      );
    }if(user?.userDetails.role=='ENTERPRSIE'){
      showErrorToast('Enterprise billing not updated.')
    } else {
      setLoading(true);
      let profileParams = {
        delivery_boy_ext_id: user.userDetails.ext_id,
        first_name: data.firstname,
        last_name: data.lastname,
        address: data.address,
        city_id: data.city.value,
        state_id: data.state.value,
        country_id: data.country.value,
        dni_number: data.dninumber,
        postal_code: data.postalcode,
        account_type: data.account.value,
      };
      updateDeliveryBoyBillingDetails(
        profileParams,
        (successResponse) => {
          setLoading(false);
          showSuccessToast("Billing details updated successfully");
        },
        (errorResponse) => {
          setLoading(false);
          showErrorToast(errorResponse[0]._errors.message);
        }
      );
    }
  };

  useEffect(() => {
    getConsumerBillingDetails(
      user.userDetails.ext_id,
      (successResponse) => {
        let resultResponse = successResponse[0]._response;
        setBillingDetails(resultResponse);
      },
      (errorResponse) => {
        console.log("error", errorResponse[0]._errors.message);
      }
    );
  }, []);

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>
              Manage billing address
            </p>
          </div>
        </div>
      </div>
      <BillingAddressBook
        user={user}
        control={control}
        errors={errors}
        setValue={setValue}
        billingDetails={billingDetails}
      />
      <div className={`row ${Styles.manageRow}`}>
        <div className="col-md-12">
          <div
            className={`${Styles.addPickupDetailsBtnCard} d-flex justify-content-end`}
          >
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className={Styles.addPickupDetailsNextBtn}
            >
              {loading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default BillingDetail;
