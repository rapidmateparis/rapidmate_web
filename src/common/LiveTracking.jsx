import {
  faCopy,
  faLocationCrosshairs,
  faLocationDot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import Package from "../assets/images/Order-Tracking-Package.png";
import Truck from "../assets/images/truck-image.png";
import Chat from "../assets/images/Chat-Icon.png";
import Call from "../assets/images/Call-Icon.png";
import Driver from "../assets/images/Driver-Image.jpeg";
import Styles from "../assets/css/home.module.css";
import PickupHomeMap from "./PickupHomeMap";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { API, buildAddress } from "../utils/Constants";
import { getViewOrderDetail } from "../data_manager/dataManage";
import Spinners from "./Loader";
import Payment from "../assets/images/Payment-Successful-Icon.png";

function LiveTracking() {
  const navigate = useNavigate();
  const [timeLeft30, setTimeLeft30] = useState(30 * 60); // 30 minutes in seconds
  const [timeLeft15, setTimeLeft15] = useState(15 * 60); // 15 minutes in seconds
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const commonData = useSelector((state)=>state.commonData.commonData)
  
  const location = useLocation();
  const { driverDetails, locationList, orderNumber } = location.state || {};
  const [locationLists, setLocationLists] = useState(locationList);
  const [order, setOrder] = useState(null);
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [driverPhone, setDriverPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markAsComplepleted, setMarkAsCompleted] = useState(false);
  const [orderNum, setOrderNum] = useState(
    driverDetails == undefined
      ? orderNumber
      : driverDetails?.order?.order_number
  );

  const [copiedField, setCopiedField] = useState(null);
  useEffect(() => {
    if (deliveryBoy?.phone) {
      setDriverPhone(deliveryBoy.phone);
    }
    const orderDetail = async () => {
      setLoading(true);
      getViewOrderDetail(
        orderNum,
        (successResponse) => {
          setLoading(false);
          if (successResponse[0]._success) {
            if (
              successResponse[0]._response.order?.order_status == "COMPLETED"
            ) {
              setMarkAsCompleted(true);
              setOrder(successResponse[0]._response.order);
              setDeliveryBoy(successResponse[0]._response.deliveryBoy);
              if (successResponse[0]._response.vehicle) {
                setVehicle(successResponse[0]._response.vehicle);
              }
            } else {
              setMarkAsCompleted(false);
              setOrder(successResponse[0]._response.order);
              setDeliveryBoy(successResponse[0]._response.deliveryBoy);
              if (successResponse[0]._response.vehicle) {
                setVehicle(successResponse[0]._response.vehicle);
              }
            }
          }
        },
        (errorResponse) => {
          setLoading(false);
        }
      );
    };
    if (orderNum) {
      orderDetail();
    }
  }, [orderNum]);

  const openModal = () => {
    setShowModal(true);
  };

  const getLocationAddress = (locationId) => {
    let result = locationLists?.filter((location) => location.id == locationId);
    return buildAddress(
      result[0]?.address,
      result[0]?.city,
      result[0]?.state,
      result[0]?.country,
      result[0]?.postal_code
    );
  };

  const getOrigin = (locationId) => {
    let result = locationLists?.filter((location) => location.id == locationId);
    const params = {
      lat: result[0].latitude,
      lng: result[0]?.longitude,
    };
    return params;
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 3000);
      },
      () => {
        // Handle clipboard failure if needed (e.g., log error)
      }
    );
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // useEffect(() => {
  //   const interval30 = setInterval(() => {
  //     setTimeLeft30((prevTime) => {
  //       if (prevTime <= 0) {
  //         clearInterval(interval30);
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);
  //   const interval15 = setInterval(() => {
  //     setTimeLeft15((prevTime) => {
  //       if (prevTime <= 0) {
  //         clearInterval(interval15);
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval30);
  //     clearInterval(interval15);
  //   };
  // }, []);

  const ProgressStep = ({ stepNumber, stepText, isActive, isCompleted }) => {
    return (
      <div
        className={`progress-step ${isActive ? "active" : ""} ${
          isCompleted ? "completed" : ""
        }`}
      >
        <div className="circle">{stepNumber}</div>
        <div className="step-text">{stepText}</div>
      </div>
    );
  };

  
  const getStep = (order) => {
    switch (order?.order_status) {
      case 'ON_THE_WAY_PICKUP':
        return 2;
      case 'OTP_VERIFIED':
        return 3;
      case 'ON_THE_WAY_DROP_OFF':
        return 4;
      case 'COMPLETED' :
        return 4;
      default:
        return 1;
    }
  };
  
  // Ensure `getStep` is used consistently to initialize and update the step.
  const [currentStep, setCurrentStep] = useState(() => getStep(order));
  
  // Update the current step if the `order` prop changes.
  useEffect(() => {
    setCurrentStep(getStep(order));
  }, [order]);

  const steps = [
    "A driver is assigned to you",
    "Pickup in Progress",
    "Your order has been picked up for delivery",
    "Order arriving soon!!",
  ];
  if (order == null) {
    return <Spinners />;
  }
 
  if (markAsComplepleted) {
    return (
      <>
        <CommonHeader userData={user} />
        <section className={Styles.deliveryboyThankyouSec}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className={Styles.deliveryboyThankyoumainCard}>
                  <div>
                    <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                      <img
                        className={Styles.PaymentSuccessfulImage}
                        src={Payment}
                        alt="Payment-Img"
                      />
                    </div>
                    <div>
                      <h4 className={Styles.deliveryboyThankyouSignupText}>
                        Order has been completed!
                      </h4>
                      <Link
                        className={`${Styles.addPickupDetailsCancelBTn} m-5`}
                        style={{ color: "#000" }}
                        to="/consumer/orders"
                      >
                        Go order Lists
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <CommonHeader userData={user} />
      <section>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-3">
            <div>
              <div className={Styles.pickuporderTrackingAddressCardMain}>
                <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupOrderTrackingLocIcon}
                    icon={faLocationDot}
                  />
                  <p className={Styles.pickupOrderTrackingAddressText}>
                    {getLocationAddress(order?.pickup_location_id)}
                  </p>
                </div>
                <div className={Styles.pickuporderTrackingBorderShowOff} />
                <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupOrderTrackingLocCrosshairsIcon}
                    icon={faLocationCrosshairs}
                  />
                  <p className={Styles.pickupOrderTrackingAddressText}>
                    {getLocationAddress(order?.dropoff_location_id)}
                  </p>
                </div>
              </div>

              <div className={Styles.PickupOrderTrackingDeliveryInfoCard}>
                <div>
                  <h4 className={Styles.pickupOrdertrackingDeliveryStatus}>
                    {order?.consumer_order_title}
                  </h4>
                  <div>
                    <div className={Styles.pickupOrderTrackingOrderIdCard}>
                      <p className={Styles.pickupOrderTrackingOrderId}>
                        Order ID: <b>{order?.order_number}</b>
                      </p>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderTrackingCopyIcon}
                        icon={copiedField === "order_number" ? faCheck : faCopy}
                        onClick={() =>
                          copyToClipboard(order?.order_number, "order_number")
                        }
                      />
                    </div>
                    <div className={Styles.pickupOrderOtpCard}>
                      <div className={Styles.pickupOrderTrackingOrderIdCard}>
                        <p className={Styles.pickupOrderTrackingOrderId}>
                          Pickup OTP: <b>{order?.otp}</b>
                        </p>
                        <FontAwesomeIcon
                          className={Styles.pickupOrderTrackingCopyIcon}
                          icon={copiedField === "otp" ? faCheck : faCopy}
                          onClick={() => copyToClipboard(order?.otp, "otp")}
                        />
                      </div>

                      <div className={Styles.pickupOrderTrackingOrderIdCard}>
                        <p className={Styles.pickupOrderTrackingOrderId}>
                          Delivered OTP: <b>{order?.delivered_otp}</b>
                        </p>
                        <FontAwesomeIcon
                          className={Styles.pickupOrderTrackingCopyIcon}
                          icon={
                            copiedField === "delivered_otp" ? faCheck : faCopy
                          }
                          onClick={() =>
                            copyToClipboard(
                              order?.delivered_otp,
                              "delivered_otp"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <p className={Styles.pickupOrderTrackingTimerCondown}>
                      Pickup in: <b>{formatTime(timeLeft30)}</b>
                    </p>
                  </div> */}
                  <div className={Styles.pickupOrderTrackingPackageImgCard}>
                    <img
                      className={Styles.pickupOrderTrackingPackageImg}
                      src={Package}
                      alt="Package"
                    />
                    {/* <h4 className={Styles.pickuporderTrackingEstimatedTime}>
                      {formatTime(timeLeft15)}
                    </h4>
                    <p className={Styles.pickupOrderTrackingEstimateText}>
                      Estimated delivery time
                    </p> */}
                  </div>
                  <div>
                    <div className="progress-container">
                      {steps.map((text, index) => (
                        <ProgressStep
                          key={index}
                          stepNumber={index + 1}
                          stepText={text}
                          isActive={currentStep === index + 1}
                          isCompleted={currentStep > index + 1}
                        />
                      ))}
                      {/* <button
                        className={Styles.pickupOrderTrackingChatButton}
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Next
                      </button> */}
                    </div>
                  </div>

                  <div className={Styles.pickupOrderTrackingDriverCard}>
                    <div className={Styles.pickupOrderTrackingDriverTruckCard}>
                      <img
                        className={Styles.pickupOrderTrackingDriverImg}
                        src={
                          deliveryBoy?.profile_pic
                            ? API.viewImageUrl +
                              deliveryBoy?.profile_pic?.replace(
                                /\.(png|jpg|jpeg|webp)$/,
                                ""
                              )
                            : Driver
                        }
                        alt="Driver"
                      />
                    </div>
                    <div>
                      <h4 className={Styles.pickupOrderTrackingDriverName}>
                        {deliveryBoy?.first_name + " " + deliveryBoy?.last_name}
                      </h4>
                      <p className={Styles.pickupOrderTrackingTruckInfo}>
                        {vehicle?.modal} {vehicle?.plat_no}
                      </p>
                    </div>
                    <div className={Styles.pickupOrderTrackingButtonCard}>
                      <button
                        onClick={() => {
                          if (driverPhone) {
                            window.location.href = `tel:${driverPhone}`;
                          } else {
                            alert("Phone number not available");
                          }
                        }}
                        className={Styles.pickupOrderTrackingChatButton}
                      >
                        <img
                          className={Styles.pickupOrderTrackingChatIcon}
                          src={Chat}
                          alt="chat"
                        />
                      </button>
                      <button
                        className={Styles.pickupOrderTrackingChatButton}
                        onClick={() => {
                          if (driverPhone) {
                            window.location.href = `tel:${driverPhone}`;
                          } else {
                            alert("Phone number not available");
                          }
                        }}
                      >
                        <img
                          className={Styles.pickupOrderTrackingCallIcon}
                          src={Call}
                          alt="call"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div>
              <PickupHomeMap
                latitude={getOrigin(order?.pickup_location_id)}
                longitude={getOrigin(order?.dropoff_location_id)}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default LiveTracking;
