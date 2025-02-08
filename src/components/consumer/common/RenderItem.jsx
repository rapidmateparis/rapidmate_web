import React from "react";
import Styles from "../../../assets/css/home.module.css";
import Package from "../../../assets/images/Package.png";
import NoDataImage from "../../../assets/images/NoOrder.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { titleFormat } from "../../../utils/Constants";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomPagination from "../../../common/CommonPagenation";

function RenderItem({ status = "", locationList = [], orderList = [] }) {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getLocationAddress = (locationId) => {
    const location = locationList.find((loc) => loc.id === locationId);
    return location ? location.address : "Unknown";
  };

  const detailHandler = (order_number) => {
    navigate("/consumer/order-detail", {
      state: { order: { order_number }, user },
    });
  };

  return (
    <section>
      <div className="row">
        <div className="col-md-12">
          {orderList.length > 0 ? (
            <>
              {orderList.map((item, index) => (
                <div key={index} className={Styles.pickuphistoryMainCard}>
                  <div style={{ cursor: "pointer" }} onClick={() => detailHandler(item.order_number)}>
                    <div className={Styles.pickupHistoryPackageCard}>
                      <img className={Styles.pickupHistoryPackageIcon} src={Package} alt="icon" />
                      <h4 className={Styles.pickupHistoryDeliveredText}>
                        {item.consumer_order_title}{" "}
                        {item.is_show_datetime_in_title === 1
                          ? titleFormat(item.order_status === "ORDER_PLACED" ? item.schedule_date_time || item.order_date : item.updated_on)
                          : ""}
                      </h4>
                    </div>

                    <div className={Styles.pickupHistoryLocationCard}>
                      <div className={Styles.pickupHistoryFromLocaCard}>
                        <FontAwesomeIcon className={Styles.pickupHistoryLocIcon} icon={faLocationDot} />
                        <p className={Styles.pickupHistoryFromLoc}>
                          {t("from")} <b>{getLocationAddress(item.pickup_location_id)}</b>
                        </p>
                      </div>

                      <div className={Styles.pickupHistoryShowOff} />

                      <div className={Styles.pickupHistoryFromLocaCard}>
                        <FontAwesomeIcon className={Styles.pickupHistoryLocIcon} icon={faLocationCrosshairs} />
                        <p className={Styles.pickupHistoryFromLoc}>
                          {t("to")} <b>{getLocationAddress(item.dropoff_location_id)}</b>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.pickupHistoryOrderMoneyCard}>
                    <p className={Styles.pickupHistoryOrderId}>
                      {t("order_id")}: <span>{item.order_number}</span>
                    </p>
                    <h4 className={Styles.pickupHistoryMoneyText}>
                      {`€ ${Number(item.amount).toFixed(2)}`}
                    </h4>
                  </div>
                </div>
              ))}
             <CustomPagination totalPages={20} initialPage={1} onPageChange={(page) => console.log("Current Page:", page)} />
            </>
          ) : (
            <div className={Styles.pickupHistoryNoDataMainCard}>
              <div className={Styles.pickupHistoryNoDataCard}>
                <img className={Styles.pickupHistoryNodataImage} src={NoDataImage} alt="No-Data" />
              </div>
              <div>
                <h4 className={Styles.pickupHistoryNoDatatext}>{t("No orders to show")}</h4>
                <p className={Styles.pickupHistoryNodataSubText}>{t("If there is any active order, it will be shown here.")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RenderItem;
