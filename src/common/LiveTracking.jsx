import {
  faCopy,
  faLocationCrosshairs,
  faLocationDot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
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
import { API, buildAddress, formatPhoneNumber, getMapsApiKey } from "../utils/Constants";
import {
  getViewEnterpriseOrderDetail,
  getViewOrderDetail,
} from "../data_manager/dataManage";
import Spinners from "./Loader";
import Payment from "../assets/images/Payment-Successful-Icon.png";
import { useTranslation } from "react-i18next";

function LiveTracking() {
  const navigate = useNavigate();
  const [timeLeft30, setTimeLeft30] = useState(30 * 60); // 30 minutes in seconds
  const [timeLeft15, setTimeLeft15] = useState(15 * 60); // 15 minutes in seconds
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const commonData = useSelector((state) => state.commonData.commonData);
  const location = useLocation();
  const { driverDetails, locationList, orderNumber } = location.state || {};
  const [locationLists, setLocationLists] = useState(locationList);
  const [order, setOrder] = useState(null);
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [driverPhone, setDriverPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const userRole = useSelector((state) => state.auth.role);
  const [multipleOrderLocation, setMultipleOrderLocation] = useState([]);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const [markAsComplepleted, setMarkAsCompleted] = useState(false);
  const [pickupLocation,setPickupLocation]=useState(null)
  const [dropoffLocation,setDropoffLocation]=useState([]);
  const [mapKey,setMapKey]=useState(null)
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
   
    if (orderNum) {
      if (user?.userDetails.role == "ENTERPRISE") {
        enterpriseOrderDetail();
      } else {
        orderDetail();
      }
      
    }
    const getMapApiKey = async () => {
          const key = await getMapsApiKey()
          setMapKey(key)
        }
        if(mapKey==null){
          getMapApiKey()
        }
  }, [orderNum]);

  const enterpriseOrderDetail = () => {
    setLoading(true);
    getViewEnterpriseOrderDetail(
      orderNum,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          let data = successResponse[0]._response.order;
          let orderLines = successResponse[0]._response.orderLines;
          if (
            successResponse[0]._response.order?.order_status =="COMPLETED"
          ) {
            setMarkAsCompleted(true);
            if (orderLines && orderLines.length > 0) {
              setMultipleOrderLocation(orderLines);
            }
            setOrder(data);
            setDeliveryBoy(successResponse[0]._response.deliveryBoy);
            setVehicle(successResponse[0]._response.vehicle);

          }else{
            setMarkAsCompleted(false);
            if (orderLines && orderLines.length > 0) {
              setMultipleOrderLocation(orderLines);
            }
            setOrder(data);
            setDeliveryBoy(successResponse[0]._response.deliveryBoy);
            setVehicle(successResponse[0]._response.vehicle);
              
          }
          
        }
      },
      (errorResponse) => {
        setLoading(false);
        console.log("orderDetail==>errorResponse", errorResponse[0]);
      }
    );
  };
  const orderDetail = async () => {
    setLoading(true);
    getViewOrderDetail(
      orderNum,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (
            successResponse[0]._response.order?.order_status =="COMPLETED"
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
      lat: parseFloat(result[0].latitude),
      lng: parseFloat(result[0]?.longitude),
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
      case "ON_THE_WAY_PICKUP":
        return 2;
      case "REACHED":
        return 2;
      case "OTP_VERIFIED":
        return 3;
      case "DELIVERED_OTP_VERIFIED":
        return 4;
      case "ON_THE_WAY_DROP_OFF":
        return 4;
      case "COMPLETED":
        return 4;
      default:
        return 1;
    }
  };

  // Ensure `getStep` is used consistently to initialize and update the step.
  const [currentStep, setCurrentStep] = useState(() => getStep(order));
  const memoizedPickupHomeMap = useMemo(() => {
    if (!mapKey || !pickupLocation || dropoffLocation.length === 0) {
      return null; // Return null or a fallback component if data isn't ready
    }
    return (
      <PickupHomeMap
        pickupLocation={pickupLocation}
        dropoffLocations={dropoffLocation}
        mapApiKey={mapKey}
      />
    );
  }, [mapKey, pickupLocation, dropoffLocation]);
  // Update the current step if the `order` prop changes.
  useEffect(() => {
    if (order) {
      setCurrentStep(getStep(order));
  
      if (user?.userDetails.role === "CONSUMER") { 
        if(pickupLocation==null && dropoffLocation.length===0){
          setPickupLocation(getOrigin(order?.pickup_location_id));
          const dropoff = getOrigin(order?.dropoff_location_id);
          if (dropoff) {
            setDropoffLocation([dropoff]); // Ensure it's set as an array
          } else {
            setDropoffLocation([]); // Default to empty array if null
          }
        }
        
      } else {
        if(pickupLocation==null && dropoffLocation.length===0){
          if(order?.delivery_type_id===1){
            setPickupLocation(getOrigin(order?.pickup_location));
    
            const dropoff = getOrigin(order?.dropoff_location);
            if (dropoff) {
              setDropoffLocation([dropoff]); // Ensure it's set as an array
            } else {
              setDropoffLocation([]); // Default to empty array if null
            }
          }else{
            setPickupLocation(getOrigin(order?.pickup_location));
    
            const formattedDropoffLocations = (multipleOrderLocation || []) // Ensure it's not null
              .map((branch) => getOrigin(branch.dropoff_location))
              .filter((loc) => loc !== null); // Remove null values
      
            setDropoffLocation(formattedDropoffLocations);
          }
        }
      }
      const getOrderFnc =
      user?.userDetails.role === "ENTERPRISE"
        ? enterpriseOrderDetail
        : orderDetail;
    const interval = setInterval(() => getOrderFnc(), 15000);
    return () => clearInterval(interval);
    }

    
    
  }, [order]); // Added dependencies for better reactivity
  

  const steps = [
    t("driver_assigned"),
    t("pickup_in_progress"),
    t("order_picked_up"),
    t("order_arriving_soon"),
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
                        {t("order_completed")}
                      </h4>
                      <Link
                        className={`${Styles.addPickupDetailsCancelBTn} m-5`}
                        style={{ color: "#000" }}
                        to={`/${baseUrl}/orders`}
                      >
                        {t("go_order_lists")}
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

  const actionToCall = () => {
    if (!driverPhone && !order?.delivery_boy_mobile) {
      showErrorToast("Phone number not available");
      return;
    }

    const phoneNumber = formatPhoneNumber(
      driverPhone || order?.delivery_boy_mobile
    );
    setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`; // Ensure it's executed inside a direct click event
    }, 0);
  };
  
  
  
  return (
    <>
      <CommonHeader userData={user} />
      <section>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-3">
            <div className={Styles.pickuporderTrackingMainScroll}>
              <div className={Styles.pickuporderTrackingAddressCardMain}>
                <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupOrderTrackingLocIcon}
                    icon={faLocationDot}
                  />
                  <p className={Styles.pickupOrderTrackingAddressText}>
                    {user?.userDetails?.role == "ENTERPRISE"
                      ? getLocationAddress(order?.pickup_location)
                      : getLocationAddress(order?.pickup_location_id)}
                  </p>
                </div>
                <div className={Styles.pickuporderTrackingBorderShowOff} />
                
                  
                  {user?.userDetails?.role == "ENTERPRISE" &&
                    order?.delivery_type_id === 1 && (
                      <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupOrderTrackingLocCrosshairsIcon}
                    icon={faLocationCrosshairs}
                  />
                      <p className={Styles.pickupOrderTrackingAddressText}>
                        { getLocationAddress(order?.dropoff_location)}
                      </p>
                      </div>
                    )}
                  {user?.userDetails?.role == "CONSUMER" && (
                    <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderTrackingLocCrosshairsIcon}
                      icon={faLocationCrosshairs}
                    />

                    <p className={Styles.pickupOrderTrackingAddressText}>
                      {getLocationAddress(order?.dropoff_location_id)}
                    </p>
                    
                    </div>
                  )}
                
                {multipleOrderLocation && multipleOrderLocation?.length > 0 && multipleOrderLocation?.map((branch,index)=>(
                  <>
                    <div className={Styles.pickupOrderTrackingPickupAddressCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupOrderTrackingLocCrosshairsIcon}
                    icon={faLocationCrosshairs}
                  />
                    <p className={Styles.pickupOrderTrackingAddressText} key={index}>
                    { getLocationAddress(branch?.dropoff_location)}
                  </p>
                  </div>
                  {index !== multipleOrderLocation.length - 1 && <div className={Styles.pickuporderTrackingBorderShowOff} /> }
                 </>
                 
                  ))}
              </div>

              <div className={Styles.PickupOrderTrackingDeliveryInfoCard}>
                <div>
                  <h4 className={Styles.pickupOrdertrackingDeliveryStatus}>
                    {order?.consumer_order_title}
                  </h4>
                  <div>
                    <div className={Styles.pickupOrderTrackingOrderIdCard}>
                      <p className={Styles.pickupOrderTrackingOrderId}>
                        {t("order_id")}: <b>{order?.order_number}</b>
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
                          {t("pickup_otp")}: <b>{order?.otp}</b>
                        </p>
                        <FontAwesomeIcon
                          className={Styles.pickupOrderTrackingCopyIcon}
                          icon={copiedField === "otp" ? faCheck : faCopy}
                          onClick={() => copyToClipboard(order?.otp, "otp")}
                        />
                      </div>
                      {order?.delivered_otp && (
                        <div className={Styles.pickupOrderTrackingOrderIdCard}>
                          <p className={Styles.pickupOrderTrackingOrderId}>
                            {t("delivered_otp")}: <b>{order?.delivered_otp}</b>
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
                      )}
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
                        onClick={actionToCall}
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
                        onClick={actionToCall}
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
            <div className="text-center">
              {memoizedPickupHomeMap}
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default LiveTracking;
