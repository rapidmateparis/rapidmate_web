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

const EnterpriseOrderPreview = () => {
  const checkboxTypes = ["checkbox"];
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { order, orderCustomerDetails } = location.state || {};
  const [imageView, setImageView] = useState(
    URL.createObjectURL(orderCustomerDetails?.file[0]) || null
  );


  console.log('order',order)
  console.log('orderDetails',orderCustomerDetails)
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
      <section className={Styles.addPickupDetailsSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.addpickupDetailSidecardMain}>
                <img
                  className={Styles.addpickupDetailSidecardboxIcon}
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
                    proceed to payment
                  </p>
                </div>

                <div className={Styles.pickupOrderPreviewAddresCard}>
                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationDot}
                    />

                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {getOrderAddress(order?.serviceType?.id, order)}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  {order?.serviceType?.id === 2 ? (
                    order?.dropoffLocation?.map((location, index) => (
                      <div
                        key={index}
                        className={Styles.pickupOrderPreviewPickupAddressCard}
                      >
                        <FontAwesomeIcon
                          className={Styles.pickupOrderPreviewLocationIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p
                          className={Styles.pickuporderPreviewPickupAddressText}
                        >
                          {getDropoffLocation(location)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderPreviewLocationIcon}
                        icon={faLocationCrosshairs}
                      />
                      <p className={Styles.pickuporderPreviewPickupAddressText}>
                        {`${order?.addDestinationLocation?.address}, ${order?.addDestinationLocation?.city}, ${order?.addDestinationLocation?.state}, ${order?.addDestinationLocation?.country}-${order?.addDestinationLocation?.postal_code}`}
                      </p>
                    </div>
                  )}
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Vehicle details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {order?.selectedVehicleDetails?.vehicle_type}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {order?.selectedVehicleDetails?.vehicle_type_desc}
                      </p>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={getImage(order?.selectedVehicleDetails)}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Pickup details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {orderCustomerDetails?.company}
                      </h5>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={imageView}
                        alt="icon"
                      />
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
                        {orderCustomerDetails?.email}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {"+" + orderCustomerDetails?.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                      {" "}
                      {orderCustomerDetails?.pickupnote}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Dropoff details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {orderCustomerDetails?.dname +
                          " " +
                          orderCustomerDetails?.dlastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {orderCustomerDetails?.dcompany}
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
                        {orderCustomerDetails?.demail}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {orderCustomerDetails?.dphoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                      {" "}
                      {orderCustomerDetails?.dropoffnote}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Estimated cost
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        € {order?.selectedVehiclePrice}
                      </h5>
                      <div className={Styles.pickupOrderPreviewCompanyName}>
                        <div className={Styles.pickupOrderNormalDetailsCard}>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            {order?.distance}
                          </p>
                          <p
                            className={`${Styles.pickupOrderPreviewNormalDetails} ${Styles.pickupPreviewB}`}
                          >
                            {order?.selectedVehicleDetails?.vehicle_type}
                          </p>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            {order?.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className={Styles.PickupOrderEuroTextBig}>
                        € {order?.selectedVehiclePrice}
                      </h1>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={`mb-3 ${Styles.checkboxCard}`}>
                    <Form.Check
                      type="checkbox"
                      id={`default-checkbox`}
                      label={"Save these addresses for later"}
                      defaultChecked={isAddressAdd}
                      className={`${Styles.saveAddresslaterCheckBox}`}
                    />
                  </div>
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <Link
                    className={Styles.addPickupDetailsCancelBTn}
                    onClick={() => navigate(-1)}
                    style={{ color: "#000", cursor: "pointer" }}
                  >
                    Back
                  </Link>

                  <div
                    onClick={submitHandler}
                    className={Styles.addPickupDetailsNextBtn}
                    style={{ cursor: "pointer" }}
                  >
                    Proceed to payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseOrderPreview;
