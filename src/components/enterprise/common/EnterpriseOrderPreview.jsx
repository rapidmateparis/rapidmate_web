import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Truck from "../../../assets/images/Truck.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarImg from "../../../assets/images/Pickup-Order-preview-Banner.png";
import CommonHeader from "../../../common/CommonHeader";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import getImage from "../../consumer/common/GetImage";
import { buildAddress, getLocation } from "../../../utils/Constants";
import { useSelector } from "react-redux";
import OrderViewComponents from "./OrderViewComponents";

const EnterpriseOrderPreview = () => {
  const checkboxTypes = ["checkbox"];
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { order, orderCustomerDetails } = location.state || {};
  const [imageView, setImageView] = useState(null);


  // console.log('order',order)
  // console.log('orderDetails',orderCustomerDetails)
  const [isAddressAdd, setIsAddressAdd] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    navigate("/enterprise/payment", {
      state: {
        order,
        orderCustomerDetails,
        isAddressAdd,
      },
    });
  };

  const handleSaveAddress = (e) => {
    setIsAddressAdd(!isAddressAdd);
  };

  const getOrderAddress = (serviceTypeId, order) => {
    if (serviceTypeId == 2) {
      return buildAddress(
        order?.selectedBranch.address,
        order?.selectedBranch.city,
        order?.selectedBranch.state,
        order?.selectedBranch.country,
        order?.selectedBranch.postal_code
      );
    } else {
      return (
        order?.addPickupLocation?.address +
        "," +
        order?.addPickupLocation?.city +
        "," +
        order?.addPickupLocation?.state +
        "," +
        order?.addPickupLocation?.country +
        "-" +
        order?.addPickupLocation?.postal_code
      );
    }
  };
  const getDropoffLocation = (location) => {
    const result = getLocation(location, location.lat, location.lng);
    return buildAddress(
      result.address,
      result.city,
      result.state,
      result.country,
      result.postal_code
    );
  };
  return (
    <>
      <CommonHeader userData={user} />
      <OrderViewComponents navigate={navigate} order={order} orderCustomerDetails={orderCustomerDetails} getOrderAddress={getOrderAddress} getDropoffLocation={getDropoffLocation} isAddressAdd={isAddressAdd}isMultiple={order?.deliveryType?.id === 2}/>
      </>
  );
};

export default EnterpriseOrderPreview;
