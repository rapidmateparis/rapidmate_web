import React from "react";
import Styles from "../../../assets/css/home.module.css";
import Package from "../../../assets/images/Package.png";
import NoDataImage from "../../../assets/images/NoOrder.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, titleFormat } from "../../../utils/Constants";
import { useSelector } from "react-redux";

function RenderItem({ status = "", locationList = [], orderList = [] }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const getLocationAddress = (locationId) => {
    let result = locationList.filter((location) => location.id == locationId);
    return result[0]?.address;
  };
  const detailHandler = (order_number) => {
    navigate("/consumer/order-detail", {
      state: {
        order: {
          order_number,
        },
        user,
      },
    });
  };
  return (
    <section>
      <div className="row">
        <div className="col-md-12">
          {orderList.length > 0 ? (
            orderList.map((item, index) => (
              <div key={index} onClick={() => detailHandler(item.order_number)}>
                <div className={Styles.pickuphistoryMainCard}>
                  <div className={Styles.pickupHistoryPackageCard}>
                    <img
                      className={Styles.pickupHistoryPackageIcon}
                      src={Package}
                      alt="icon"
                    />
                    <h4 className={Styles.pickupHistoryDeliveredText}>
                      {item?.consumer_order_title}{" "}
                      {item.is_show_datetime_in_title == 1
                        ? item.order_status === "ORDER_PLACED"
                          ? titleFormat(
                              item.schedule_date_time ||
                                item.order_date
                            )
                          : titleFormat(item.updated_on)
                        : ""}
                    </h4>
                  </div>

                  <div className={Styles.pickupHistoryLocationCard}>
                    <div className={Styles.pickupHistoryFromLocaCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryLocIcon}
                        icon={faLocationDot}
                      />
                      <p className={Styles.pickupHistoryFromLoc}>
                        From{" "}
                        <b>{getLocationAddress(item.pickup_location_id)}</b>
                      </p>
                    </div>

                    <div className={Styles.pickupHistoryShowOff} />

                    <div className={Styles.pickupHistoryFromLocaCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryLocIcon}
                        icon={faLocationCrosshairs}
                      />
                      <p className={Styles.pickupHistoryFromLoc}>
                        To <b>{getLocationAddress(item.dropoff_location_id)}</b>
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.pickupHistoryOrderMoneyCard}>
                    <p className={Styles.pickupHistoryOrderId}>
                      Order ID: <span>{item.order_number}</span>
                    </p>
                    <h4 className={Styles.pickupHistoryMoneyText}>
                      {`€ ${
                        typeof item.amount === "number"
                          ? item.amount.toFixed(2)
                          : item.amount
                      }`}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={Styles.pickupHistoryNoDataMainCard}>
              <div className={Styles.pickupHistoryNoDataCard}>
                <img
                  className={Styles.pickupHistoryNodataImage}
                  src={NoDataImage}
                  alt="No-Data"
                />
              </div>
              <div>
                <h4 className={Styles.pickupHistoryNoDatatext}>
                  No orders to show
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  If there is any active order, it will be shown here..
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RenderItem;
