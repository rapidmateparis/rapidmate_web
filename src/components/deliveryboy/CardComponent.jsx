import React from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Package from "../../assets/images/Package.png";
import { formatDate } from "../../utils/Constants";

function CardComponent({ orderList = [], locationList = [],msg=''}) {
 
  const getLocationAddress = (locationId) => {
    let result = locationList.filter((location) => location.id === locationId);
    return result[0]?.address || "Unknown Address";
  };
  return (
    <>
      {orderList.length > 0 ? (
        orderList.map((order, index) => (
          <div className="col-md-3" key={index}>
            <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
              <div className={Styles.enterpriseHomePackagedeliveryInfoCard}>
                <div className={Styles.enterpriseHomePackageImgCard}>
                  <img
                    className={Styles.enterpriseHomePackage}
                    src={Package}
                    alt="Package"
                  />
                </div>
                <p className={Styles.enterpriseHomePickupTimeinfo}>
                  Pickup in {formatDate(order.delivery_date).date +' '+ formatDate(order.delivery_date).time || "N/A"}
                </p>
              </div>
              <div className={Styles.enterpriseHomeAddressFromCard}>
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeAddresslocDotIcon}
                  icon={faLocationDot}
                />
                <p className={Styles.enterpriseHomeAddressText}>
                  From{" "}
                  <b>{getLocationAddress(order.pickup_location_id) || "N/A"}</b>
                </p>
              </div>
              <div className={Styles.enterpriseHomeAddressToCard}>
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeAddresslocDotIcon}
                  icon={faLocationCrosshairs}
                />
                <p className={Styles.enterpriseHomeAddressText}>
                  To{" "}
                  <b>
                    {getLocationAddress(order.dropoff_location_id) || "N/A"}
                  </b>
                </p>
              </div>
              <div className={Styles.enterpriseHomeOrderidCard}>
                <p className={Styles.enterpriseHomeOrderIdText}>
                  Order ID: <span>{order.order_number}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-md-12">
          <div
            className={Styles.enterpriseHomeDeliveryHistoryCard}
            style={{ textAlign: "center" }}
          >
            <p className={Styles.enterpriseHomePickupTimeinfo}>
              {msg}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
