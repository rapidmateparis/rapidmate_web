import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGear,
  faDownload,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import PackagePickup from "../../assets/images/Pickup-Package-Icon.png";
import PackageDrop from "../../assets/images/PackageDrop.png";
import Package from "../../assets/images/Package.png";
import OrderTag from "../../assets/images/OrderFare-Tag.png";
import MasterCard from "../../assets/images/MasterCard-Logo.png";
import Invoice from "../../assets/images/Invoice-Img.png";
import CommonHeader from "../../common/CommonHeader";
import {
  getAVehicleByTypeId,
  getLocationById,
  getLocations,
  getViewEnterpriseOrderDetail,
  getViewOrderDetail,
} from "../../data_manager/dataManage";
import { API} from "../../utils/Constants";
import { useSelector } from "react-redux";
import DeliveryDetailsMap from "../../common/DeliveryDetailsMap";
import { showErrorToast } from "../../utils/Toastify";
import localforage from "localforage";

const EnterpriseOrder = ({ user, orderNumber, navigate }) => {
  const [orders, setOrders] = useState({});
  const [deliveryboy, setDeliveryboy] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sourceAddress, setSourceAddress] = useState({});
  const [vehicle, setVehicle] = useState({});
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  useEffect(() => {
    orderDetail();
  }, []);
  const goTracking = () => {
    const getLocationsData = () => {
      getLocations(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            let tempOrderList = successResponse[0]._response;
            navigate("/enterprise/order-tracking", {
              state: {
                orderNumber: orderNumber,
                locationList: tempOrderList,
              },
            });
          }
        },
        (errorResponse) => {
          console.log(errorResponse[0]._errors.message);
        }
      );
    };
    getLocationsData();
  };
  const orderDetail = async () => {
    setLoading(true);
    getViewEnterpriseOrderDetail(
      orderNumber,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setOrders(successResponse[0]._response.order);
          setDeliveryboy(successResponse[0]._response.deliveryBoy);
          if (successResponse[0]._response.vehicle) {
            setVehicle(successResponse[0]._response.vehicle);
          }
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location
          );
          getSourceAddress(successResponse[0]._response.order.pickup_location);
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const getDestinationAddress = async (locationId) => {
    setLoading(true);
    getLocationById(
      locationId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setDestinationAddress(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const getSourceAddress = async (locationId) => {
    setLoading(true);
    getLocationById(
      locationId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setSourceAddress(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
        console.log("destination==>errorResponse", errorResponse[0]);
        Alert.alert("Error Alert", errorResponse[0]._errors.message, [
          { text: "OK", onPress: () => {} },
        ]);
      }
    );
  };
  const vehicleDetail = async (vehicleTypeId) => {
    setLoading(true);
    getAVehicleByTypeId(
      vehicleTypeId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setVehicleType(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const downloadInvoice = async (orderNumber, pdfUrl) => {
    try {
      // Fetch the PDF
    const token = await localforage.getItem('1');
    if (!token) {
      showErrorToast("Authorization token not found.");
      return;
    }

    // Fetch the PDF with the token
    const response = await fetch(pdfUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Ensure proper token format
      },
    });
      if (!response.ok) {
        showErrorToast(`Failed to fetch PDF: ${response.statusText}`);
        return
      }
  
      // Convert response to Blob
      const blob = await response.blob();
  
      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${orderNumber}.pdf`; // Use orderNumber as file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      showErrorToast("Failed to download the invoice. Please try again.");
    }
  };
  

  const handleDownload = () => {
    const pdfUrl = API.downloadInvoice + orderNumber+'/enterprise?show=true'
    downloadInvoice(orderNumber, pdfUrl);
  };
  
  return (
    <section className={Styles.pickupDeliveryDetails}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={Styles.max75}>
              <div className={Styles.pickupDeliveryDetailsHead}>
                <div className={Styles.pickupDeliveryDetailsHeaderCard}>
                  <Link to="#" onClick={goBack}>
                    <FontAwesomeIcon
                      className={Styles.pickupHistoryBackspaceButton}
                      icon={faArrowLeft}
                    />
                  </Link>
                  <h4 className={Styles.pickupHistoryHeaderTitle}>
                    Delivery Details
                  </h4>
                </div>
                <Link to="/support-page" className={Styles.pickupDeliveryDetailsSettingsIcon}>
                  <FontAwesomeIcon icon={faGear} />
                </Link>
              </div>
              {/* Map  */}
              <div className={Styles.pickupDeliveryDetailsMapCard}>
                <DeliveryDetailsMap
                  addressData={{
                    sourceAddress: sourceAddress,
                    destinationAddress: destinationAddress,
                  }}
                />
              </div>

              <div className={Styles.pickupDeliveryDetailDriverMainCard}>
                <div className={Styles.pickupDeliveryDetailDrivernameCard}>
                  <img
                    className={Styles.pickupDeliveryDetailDriverImg}
                    src={API.viewImageUrl + deliveryboy?.profile_pic}
                    alt="driver"
                  />
                  <div>
                    <h4 className={Styles.pickupDeliveryDetailDriverName}>
                      {deliveryboy?.first_name} {deliveryboy?.last_name}
                    </h4>
                    <p className={Styles.pickupDeliveryNumberplate}>
                      {vehicle?.plat_no}
                    </p>
                  </div>
                </div>
                <p className={Styles.pickupDevliveryDetailVehicleNumber}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={goTracking}
                    className={Styles.pickupDeliveryDetailDownloadIcon}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHomeLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                  </div>
                </p>
              </div>

              <div className={Styles.pickupDeliveryDetailPackageCard}>
                <img
                  className={Styles.pickupDeliveryDetailPackage}
                  src={PackagePickup}
                  alt="package"
                />
                <div>
                  <p className={Styles.pickupDeliveryDetailDropInfo}>
                    Pickup information
                  </p>
                  <h4 className={Styles.pickupDeliverDetailCompanyName}>
                    {orders?.company_name ? orders?.company_name : ""}
                  </h4>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {sourceAddress.address}, {sourceAddress.city},{" "}
                    {sourceAddress.state}
                  </p>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {orders?.pickup_notes ? orders?.pickup_notes : ""}
                  </p>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailPackageCard}>
                <img
                  className={Styles.pickupDeliveryDetailPackage}
                  src={PackageDrop}
                  alt="package"
                />
                <div>
                  <p className={Styles.pickupDeliveryDetailDropInfo}>
                    Drop off information
                  </p>
                  <h4 className={Styles.pickupDeliverDetailCompanyName}>
                    {orders?.company_name ? orders?.drop_company_name : ""}
                  </h4>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {destinationAddress.address}, {destinationAddress.city},{" "}
                    {destinationAddress.state}
                  </p>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {orders?.drop_notes ? orders?.drop_notes : ""}
                  </p>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                <div>
                  <div className={Styles.pickupDeliveryDetailOrderPrice}>
                    <div className={Styles.pickupDeliveryDetailPickupCard}>
                      <img
                        className={Styles.pickupDeliveryDetailPackageImg}
                        src={Package}
                        alt="icon"
                      />
                      <p className={Styles.pickupDeliveryDetailOrderfareText}>
                        Package Informatiom
                      </p>
                    </div>
                  </div>
                  <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Order Id:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {orders?.order_number ? orders?.order_number : ""}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Vehicle:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {vehicleType?.vehicle_type
                          ? vehicleType?.vehicle_type
                          : ""}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Pickup OTP:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {/* {route.params?.orderItem?.otp} */}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Delivered OTP:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {/* {route.params?.orderItem?.delivered_otp} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                <div>
                  <div className={Styles.pickupDeliveryDetailOrderPrice}>
                    <div className={Styles.pickupDeliveryDetailPickupCard}>
                      <img
                        className={Styles.pickupdeliveryDetailOrderfareIcon}
                        src={OrderTag}
                        alt="icon"
                      />
                      <p className={Styles.pickupDeliveryDetailOrderfareText}>
                        Order fare
                      </p>
                    </div>
                    <h4 className={Styles.pickupDeliveryDetailOrderPriceText}>
                      €{orders?.amount ? orders.amount.toFixed(2) : "0.00"}
                    </h4>
                  </div>
                  <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                    <p className={Styles.pickupDeliveryDetailTraveledDistance}>
                      Travelled {orders?.distance} km
                    </p>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Order fare
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €
                        {orders?.delivery_boy_amount
                          ? orders.delivery_boy_amount.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Waiting
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €0.00
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Platform fee
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €
                        {orders.commission_amount
                          ? orders.commission_amount.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Amount charged
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €{orders.amount ? orders.amount.toFixed(2) : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailMastercardCard}>
                      <img
                        className={Styles.pickupDeliveryDetailMastercardImg}
                        src={MasterCard}
                        alt="mastercard"
                      />
                      <p className={Styles.pickupDeliveryDetailMasterCardtext}>
                        Paid with mastercard
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailInvoiceCard}>
                <div className={Styles.pickupDeliveryDetailInvoiceTextCard}>
                  <img
                    className={Styles.pickupDeliveryDetailsInvoiceImg}
                    src={Invoice}
                    alt="invoice"
                  />
                  <p className={Styles.pickupDeliveryDetailDownloadInvoiceText}>
                    Download invoice
                  </p>
                </div>
                <button  onClick={handleDownload} className={Styles.pickupDeliveryDetailDownloadIcon}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ConsumerOrder = ({ user, order, navigate }) => {
  const orderNumber = order?.order_number;
  const [orders, setOrders] = useState({});
  const [deliveryboy, setDeliveryboy] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sourceAddress, setSourceAddress] = useState({});

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  useEffect(() => {
    orderDetail();
  }, []);

  const goTracking = () => {
    const getLocationsData = () => {
      getLocations(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            let tempOrderList = successResponse[0]._response;
            navigate("/consumer/order-tracking", {
              state: {
                orderNumber: orderNumber,
                locationList: tempOrderList,
              },
            });
          }
        },
        (errorResponse) => {
          console.log(errorResponse[0]._errors.message);
        }
      );
    };
    getLocationsData();
  };
  const orderDetail = async () => {
    setLoading(true);
    getViewOrderDetail(
      orderNumber,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setOrders(successResponse[0]._response.order);
          setDeliveryboy(successResponse[0]._response.deliveryBoy);
          if (successResponse[0]._response.vehicle) {
            setVehicle(successResponse[0]._response.vehicle);
          }
          getDestinationAddress(
            successResponse[0]._response.order.dropoff_location_id
          );
          getSourceAddress(
            successResponse[0]._response.order.pickup_location_id
          );
          vehicleDetail(successResponse[0]._response.order.vehicle_type_id);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const getDestinationAddress = async (locationId) => {
    setLoading(true);
    getLocationById(
      locationId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setDestinationAddress(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };

  const getSourceAddress = async (locationId) => {
    setLoading(true);
    getLocationById(
      locationId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setSourceAddress(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
        console.log("destination==>errorResponse", errorResponse[0]);
        Alert.alert("Error Alert", errorResponse[0]._errors.message, [
          { text: "OK", onPress: () => {} },
        ]);
      }
    );
  };
  const vehicleDetail = async (vehicleTypeId) => {
    setLoading(true);
    getAVehicleByTypeId(
      vehicleTypeId,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          setVehicleType(successResponse[0]._response[0]);
        }
      },
      (errorResponse) => {
        setLoading(false);
      }
    );
  };
  const downloadInvoice = async (orderNumber, pdfUrl) => {
    try {
      // Fetch the PDF
      const token = await localforage.getItem('1');
      if (!token) {
        showErrorToast("Authorization token not found.");
        return;
      }
  
      // Fetch the PDF with the token
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Ensure proper token format
        },
      });
      if (!response.ok) {
        showErrorToast(`Failed to fetch PDF: ${response.statusText}`);
        return
      }
  
      // Convert response to Blob
      const blob = await response.blob();
  
      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${orderNumber}.pdf`; // Use orderNumber as file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      showErrorToast("Failed to download the invoice. Please try again.");
    }
  };
  

  const handleDownload = () => {
    const pdfUrl = API.downloadInvoice + orderNumber+'/consumer?show=true'
    downloadInvoice(orderNumber, pdfUrl);
  };
  return (
    <section className={Styles.pickupDeliveryDetails}>
      <div className="container">
        <div className="row">
          <div className={Styles.max75}>
            <div>
              <div className={Styles.pickupDeliveryDetailsHead}>
                <div className={Styles.pickupDeliveryDetailsHeaderCard}>
                  <Link to="#" onClick={goBack}>
                    <FontAwesomeIcon
                      className={Styles.pickupHistoryBackspaceButton}
                      icon={faArrowLeft}
                    />
                  </Link>
                  <h4 className={Styles.pickupHistoryHeaderTitle}>
                    Delivery Details
                  </h4>
                </div>
                <Link to="/support-page" className={Styles.pickupDeliveryDetailsSettingsIcon}>
                  <FontAwesomeIcon icon={faGear} />
                </Link>
              </div>
              {/* Map  */}
              <div className={Styles.pickupDeliveryDetailsMapCard}>
                <DeliveryDetailsMap
                  addressData={{
                    sourceAddress: sourceAddress,
                    destinationAddress: destinationAddress,
                  }}
                />
              </div>

              <div className={Styles.pickupDeliveryDetailDriverMainCard}>
                <div className={Styles.pickupDeliveryDetailDrivernameCard}>
                  <img
                    className={Styles.pickupDeliveryDetailDriverImg}
                    src={API.viewImageUrl + deliveryboy?.profile_pic}
                    alt="driver"
                  />
                  <div>
                    <h4 className={Styles.pickupDeliveryDetailDriverName}>
                      {deliveryboy?.first_name} {deliveryboy?.last_name}
                    </h4>
                    <p className={Styles.pickupDeliveryNumberplate}>
                      {vehicle?.plat_no}
                    </p>
                  </div>
                </div>
                <p className={Styles.pickupDevliveryDetailVehicleNumber}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={goTracking}
                    className={Styles.pickupDeliveryDetailDownloadIcon}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHomeLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                  </div>
                </p>
              </div>

              <div className={Styles.pickupDeliveryDetailPackageCard}>
                <img
                  className={Styles.pickupDeliveryDetailPackage}
                  src={PackagePickup}
                  alt="package"
                />
                <div>
                  <p className={Styles.pickupDeliveryDetailDropInfo}>
                    Pickup information
                  </p>
                  <h4 className={Styles.pickupDeliverDetailCompanyName}>
                    {orders?.company_name ? orders?.company_name : ""}
                  </h4>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {sourceAddress.address}, {sourceAddress.city},{" "}
                    {sourceAddress.state}
                  </p>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {orders?.pickup_notes ? orders?.pickup_notes : ""}
                  </p>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailPackageCard}>
                <img
                  className={Styles.pickupDeliveryDetailPackage}
                  src={PackageDrop}
                  alt="package"
                />
                <div>
                  <p className={Styles.pickupDeliveryDetailDropInfo}>
                    Drop off information
                  </p>
                  <h4 className={Styles.pickupDeliverDetailCompanyName}>
                    {orders?.company_name ? orders?.drop_company_name : ""}
                  </h4>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {destinationAddress.address}, {destinationAddress.city},{" "}
                    {destinationAddress.state}
                  </p>
                  <p className={Styles.pickupDeliveryDetailCompanyAddress}>
                    {orders?.drop_notes ? orders?.drop_notes : ""}
                  </p>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                <div>
                  <div className={Styles.pickupDeliveryDetailOrderPrice}>
                    <div className={Styles.pickupDeliveryDetailPickupCard}>
                      <img
                        className={Styles.pickupDeliveryDetailPackageImg}
                        src={Package}
                        alt="icon"
                      />
                      <p className={Styles.pickupDeliveryDetailOrderfareText}>
                        Package Informatiom
                      </p>
                    </div>
                  </div>
                  <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Order Id:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {orders?.order_number ? orders?.order_number : ""}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Vehicle:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {vehicleType?.vehicle_type
                          ? vehicleType?.vehicle_type
                          : ""}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Pickup OTP:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {/* {route.params?.orderItem?.otp} */}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Delivered OTP:
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        {/* {route.params?.orderItem?.delivered_otp} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                <div>
                  <div className={Styles.pickupDeliveryDetailOrderPrice}>
                    <div className={Styles.pickupDeliveryDetailPickupCard}>
                      <img
                        className={Styles.pickupdeliveryDetailOrderfareIcon}
                        src={OrderTag}
                        alt="icon"
                      />
                      <p className={Styles.pickupDeliveryDetailOrderfareText}>
                        Order fare
                      </p>
                    </div>
                    <h4 className={Styles.pickupDeliveryDetailOrderPriceText}>
                      €{orders?.amount ? orders.amount.toFixed(2) : "0.00"}
                    </h4>
                  </div>
                  <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                    <p className={Styles.pickupDeliveryDetailTraveledDistance}>
                      Travelled {orders?.distance} km
                    </p>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Order fare
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €
                        {orders?.delivery_boy_amount
                          ? orders.delivery_boy_amount.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Waiting
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €0.00
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Platform fee
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €
                        {orders.commission_amount
                          ? orders.commission_amount.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                      <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                        Amount charged
                      </p>
                      <p className={Styles.pickupDeliveryDetailPricesText}>
                        €{orders.amount ? orders.amount.toFixed(2) : "0.00"}
                      </p>
                    </div>
                    <div className={Styles.pickupDeliveryDetailMastercardCard}>
                      <img
                        className={Styles.pickupDeliveryDetailMastercardImg}
                        src={MasterCard}
                        alt="mastercard"
                      />
                      <p className={Styles.pickupDeliveryDetailMasterCardtext}>
                        Paid with mastercard
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.pickupDeliveryDetailInvoiceCard}>
                <div className={Styles.pickupDeliveryDetailInvoiceTextCard}>
                  <img
                    className={Styles.pickupDeliveryDetailsInvoiceImg}
                    src={Invoice}
                    alt="invoice"
                  />
                  <p className={Styles.pickupDeliveryDetailDownloadInvoiceText}>
                    Download invoice
                  </p>
                </div>
                <button  onClick={handleDownload} className={Styles.pickupDeliveryDetailDownloadIcon}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <>
      <CommonHeader userData={user} />
      {user?.userDetails.role == "CONSUMER" && (
        <ConsumerOrder user={user} order={order} navigate={navigate} />
      )}
      {user?.userDetails.role == "ENTERPRISE" && (
        <EnterpriseOrder user={user} orderNumber={order} navigate={navigate} />
      )}
    </>
  );
}

export default OrderDetail;
