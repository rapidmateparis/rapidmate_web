import React from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import Package from "../../../assets/images/Package.png"; // Replace with the actual path to the image
import moment from "moment";
import Calender from "../../../assets/images/Calender-withBg.png";
import { buildAddress } from "../../../utils/Constants";

function OrderCardBox({ order, locationList,vehicleTypeList,branches}) {
  const getLocationAddress = (locationId) => {
    let result = locationList.filter((location) => location.id == locationId);
    return buildAddress(
      result[0]?.address,
      result[0]?.city,
      result[0]?.state,
      result[0]?.country,
      result[0]?.postal_code
    );
  };

  const getVehicleType = vehicleId => {
    let result = vehicleTypeList.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  const getBranchAddress = branchId => {
    let result = branches.filter(branch => branch.branch_id == branchId);
    return buildAddress(
        result[0]?.address,
        result[0]?.city,
        result[0]?.state,
        result[0]?.country,
        result[0]?.postal_code
      );
  };

  return (
    <>
      {order?.delivery_type_id === 3 ? (
        <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
          <div>
            <div className={Styles.enterpriseHomePackagedeliveryInfoCard}>
              <div className={Styles.enterpriseHomePackageImgCard}>
                <img
                  className={Styles.enterpriseHomePackage}
                  src={Calender}
                  alt="Icon"
                />
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeDotCircleResturent}
                  icon={faCircle}
                />
              </div>

              <div className={Styles.enterpriseHomeShiftHeaderCard}>
                <p className={Styles.enterpriseHomePickupTimeinfo}>
                  {order.slots[0]
                    ? moment(order.slots[0].from_time, "HH:mm:ss").format("hh A")
                    : "--"}
                  {" to "}
                  {order.slots[0]
                    ? moment(order.slots[0].to_time, "HH:mm:ss").format("hh A")
                    : "--"}
                </p>

                <p className={Styles.enterpriseHomePickupTimeinfo}>
                  {order.slots[0]
                    ? moment(order.slots[0].to_time, "HH:mm:ss").diff(
                        moment(order.slots[0].from_time, "HH:mm:ss")
                      ) / 3600000
                    : "0"}{" "}
                  hours shift
                </p>
              </div>
            </div>

            <div className={Styles.enterpriseHomeAddressFromCard}>
              <FontAwesomeIcon
                className={Styles.enterpriseHomeAddresslocDotIcon}
                icon={faLocationDot}
              />
              <p className={Styles.enterpriseHomeAddressText}>
                <b>{getBranchAddress(order?.branch_id).length <=27 ? getBranchAddress(order?.branch_id) : getBranchAddress(order?.branch_id).substring(0,27)+"..." }</b>
              </p>
            </div>

            <div className={Styles.enterpriseHomeOrderidCard}>
              <p className={`${Styles.enterpriseHomeOrderIdText} ${order?.order_status ==="COMPLETED" ? 'bg-info rounded p-1' : 'p-1 bg-warning'}`}>
                <span>{order.order_status.replace(/_/g, ' ')}</span>
              </p>

              <p className={Styles.enterpriseHomeOrderIdText}>{getVehicleType(order?.vehicle_type_id)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.enterpriseHomeDeliveryHistoryCard}>
          <div>
            <div className={Styles.enterpriseHomePackagedeliveryInfoCard}>
              <div className={Styles.enterpriseHomePackageImgCard}>
                <img
                  className={Styles.enterpriseHomePackage}
                  src={Package}
                  alt="Icon"
                />
                <FontAwesomeIcon
                  className={Styles.enterpriseHomeDotCircleResturent}
                  icon={faCircle}
                />
              </div>
              <p className={Styles.enterpriseHomePickupTimeinfo}>
                {order?.consumer_order_title}
              </p>
            </div>

            <div className={Styles.enterpriseHomeAddressFromCard}>
              <FontAwesomeIcon
                className={Styles.enterpriseHomeAddresslocDotIcon}
                icon={faLocationDot}
              />
              <p className={Styles.enterpriseHomeAddressText}>
                From{" "}
                <b>
                  {getLocationAddress(order.pickup_location).length <= 27
                    ? getLocationAddress(order.pickup_location)
                    : getLocationAddress(order.pickup_location)?.substring(
                        0,
                        27
                      ) + "..."}
                </b>
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
                  {getLocationAddress(order.dropoff_location).length <= 27
                    ? getLocationAddress(order.dropoff_location)
                    : getLocationAddress(order.dropoff_location)?.substring(
                        0,
                        27
                      ) + "..."}
                </b>
              </p>
            </div>

            <div className={Styles.enterpriseHomeOrderidCard}>
              <p className={Styles.enterpriseHomeOrderIdText}>
                Order ID: <span>{order?.order_number}</span>
              </p>
              <p className={Styles.enterpriseHomeOrderIdText}>{getVehicleType(order?.vehicle_type_id)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderCardBox;
