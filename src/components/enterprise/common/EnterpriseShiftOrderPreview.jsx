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

function EnterpriseShiftOrderPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, orderCustomerDetails, dropoffDetail } = location.state || {};
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const [isAddressAdd, setIsAddressAdd] = useState(false);
  // console.log(order)
  const checkboxTypes = ["checkbox"];
  const user = useSelector((state) => state.auth.user);
  const submitHandler = async (e) => {
    e.preventDefault();

    navigate(`/${baseUrl}/payment`, {
      state: {
        order,
        orderCustomerDetails,
        dropoffDetail,
        isAddressAdd,
      },
    });
  };
  const handleSaveAddress = (e) => {
    setIsAddressAdd(!isAddressAdd);
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
                      3891 Ranchview , California 62639
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      1901 Thornridge Cir. Shiloh, California
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
                          John Doe
                        </h4>
                        <p
                          className={
                            Styles.enterpriseShiftRequestNewDeliveryTruckDetails
                          }
                        >
                          VOLVO FH16 2022
                        </p>
                      </div>
                      <div
                        className={
                          Styles.enterpriseShiftRequestNewDeliveryVehicleImg
                        }
                      >
                        <img src={Pickup} alt="img" />
                      </div>
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
                      Adam Smith
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                      Adam Inc.
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
                      adaminc@email.com
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                      +33 1 23 45 67 89
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                    Lorem ipsum dolor sit amet consectetur. Ornare faucibus ac ultricies sed penatibus. Integer sit sagit tis tempor cursus amet. Nunc cursus cras fermen tum elit pulvinar amet.
                    </p>
                  </div>
                </div>

                <div className={Styles.EnterpriseShiftAddPickupDetailsBtnCard}>
                  <Link
                    to="#"
                    className={Styles.addPickupDetailsNextBtn}
                  >
                    Place Order
                  </Link>
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
