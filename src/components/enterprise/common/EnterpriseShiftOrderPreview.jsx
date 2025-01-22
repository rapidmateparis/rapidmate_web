import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
  faGlobe,
  faPhone,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarImg from "../../../assets/images/Pickup-Order-preview-Banner.png";
import CommonHeader from "../../../common/CommonHeader";
import Driver from "../../../assets/images/Driver-Image.jpeg";
import Pickup from "../../../assets/images/Pickup.png";
import { useSelector } from "react-redux";
import { buildAddress, getLocation } from "../../../utils/Constants";
import getImage from "../../consumer/common/GetImage";
import { showErrorToast } from "../../../utils/Toastify";

function EnterpriseShiftOrderPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order,dropoffDetail } = location.state || {};
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const { vehicleType } = useSelector((state) => state.commonData.commonData);
  
  const user = useSelector((state) => state.auth.user);

  
    const getOrderAddress = (order) => {
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
    };

    const getOrderdAddress = (order) => {
      return (
        order?.addDestinationLocation?.address +
        "," +
        order?.addDestinationLocation?.city +
        "," +
        order?.addDestinationLocation?.state +
        "," +
        order?.addDestinationLocation?.country +
        "-" +
        order?.addDestinationLocation?.postal_code
      );
    };

    const getVehicleType = (vehicleId) => {
      let result = vehicleType?.filter((vehicle) => vehicle.id == vehicleId);
      return result[0]?.vehicle_type;
    };

  const submitHandler = async (e) => {
    e.preventDefault();
    showErrorToast("Under the development.....")
    // navigate(`/${baseUrl}/payment`, {
    //   state: {
    //     order,
    //     orderCustomerDetails,
    //     dropoffDetail,
    //     isAddressAdd,
    //   },
    // });
  };

  
 

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.addPickupDetailsSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.addpickupDetailSidecardMain}>
                <img
                  className={Styles.orderPreviewDetailSidecardboxIcon}
                  src={SidebarImg}
                  alt="icon"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className={Styles.pickupOrderPreviewMainCard}>
                <div>
                  <h2 className={Styles.addPickupDetailsText}>Order preview</h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    Let’s review your order details. if it looks ok please
                    submit your order
                  </p>
                </div>

                <div className={Styles.pickupOrderPreviewAddresCard}>
                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                    {getOrderAddress(order)}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {getOrderdAddress(order)}
                    </p>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Delivery boy details
                  </p>
                  <div className={Styles.enterpriseShiftPreviewMain}>
                    <div
                      className={Styles.enterpriseShiftRequestNewDeliveryCard}
                    >
                      <img
                        className={
                          Styles.enterpriseShiftRequestNewDeliveryDriverImg
                        }
                        src={Driver}
                        alt="img"
                      />
                      <div>
                        <h4
                          className={
                            Styles.enterpriseShiftRequestNewDeliveryDriverName
                          }
                        >
                          {order?.slot?.first_name + " "+order?.slot?.last_name}
                        </h4>
                        <p
                          className={
                            Styles.enterpriseShiftRequestNewDeliveryTruckDetails
                          }
                        >
                          {getVehicleType(order?.vehicle_type_id)}
                        </p>
                      </div>
                      <div
                        className={
                          Styles.enterpriseShiftRequestNewDeliveryVehicleImg
                        }
                      >
                        <img src={getImage({id:order?.vehicle_type_id})} alt={`${getVehicleType(order?.vehicle_type_id)} Icon`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Dropoff details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                      {dropoffDetail?.name+ " "+ dropoffDetail?.lastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                      {dropoffDetail?.company}
                      </p>
                    </div>
                  </div>

                  <div
                    className={Styles.pickupOrderPreviewAdminDetailsMainCard}
                  >
                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faGlobe}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                      {dropoffDetail?.email}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                      +{dropoffDetail?.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                    {dropoffDetail?.pickupnote}
                    </p>
                  </div>
                </div>

                <div className={Styles.EnterpriseShiftAddPickupDetailsBtnCard}>
                  <div
                                      onClick={submitHandler}
                                      className={Styles.addPickupDetailsNextBtn}
                                      style={{ cursor: "pointer" }}
                                    >
                    Place Order
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

export default EnterpriseShiftOrderPreview;
