import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
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
import SidebarImg from "../assets/images/Pickup-Order-preview-Banner.png";
import CommonHeader from "../common/CommonHeader";
import getImage from "../components/consumer/common/GetImage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createConsumerAddressBook } from "../data_manager/dataManage";
import { showErrorToast } from "../utils/Toastify";
import { ToastContainer } from "react-toastify";
import Spinners from "./Loader";
import localforage from "localforage";
const checkboxTypes = ["checkbox"];
function OrderView() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const { order } = useSelector((state) => state.orderDetails);
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const [isAddressAdd, setIsAddressAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageView, setImageView] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (isAddressAdd) {
      const pickupLoc = order?.pickupLocation;
      const dropOffloc = order?.dropoffLocation;
      if (pickupLoc) {
        let pickupAddressLocation = {
          consumer_ext_id: user?.userDetails.ext_id,
          address: pickupLoc?.address,
          first_name: order?.orderCustomerDetails?.name,
          last_name: order?.orderCustomerDetails?.lastName || "",
          company_name: order?.orderCustomerDetails?.company || "",
          phone: order?.orderCustomerDetails?.phoneNumber || "",
          email: order?.orderCustomerDetails?.email || "",
          comments: "",
        };
        createConsumerAddressBook(
          pickupAddressLocation,
          (successResponse) => {
            if (successResponse[0]._success) {
              setLoading(false);
            }
          },
          (errorResponse) => {
            setLoading(false);
            let err = "";
            if (errorResponse.errors) {
              err = errorResponse.errors.msg[0].msg;
            } else {
              err = errorResponse[0]._errors.message;
            }
            showErrorToast(err);
          }
        );
      }
      if (dropOffloc) {
        let dropoffLocation = {
          consumer_ext_id: user?.userDetails.ext_id,
          address: dropOffloc?.address,
          first_name: order?.orderCustomerDetails?.name,
          last_name: order?.orderCustomerDetails?.lastName || "",
          company_name: order?.orderCustomerDetails?.company || "",
          phone: order?.orderCustomerDetails?.phoneNumber || "",
          email: order?.orderCustomerDetails?.email || "",
          comments: "",
        };

        createConsumerAddressBook(
          dropoffLocation,
          (successResponse) => {
            if (successResponse[0]._success) {
              setLoading(false);
            }
          },
          (errorResponse) => {
            setLoading(false);
            let err = "";
            if (errorResponse.errors) {
              err = errorResponse.errors.msg[0].msg;
            } else {
              err = errorResponse[0]._errors.message;
            }
            showErrorToast(err);
          }
        );
      }

    }
    {loading ? <Spinners/> : navigate(`/${baseUrl}/payment`); }
  };
  const handleSaveAddress = (e) => {
    setIsAddressAdd(!isAddressAdd);
  };

  useEffect(()=>{
    const getLocalData =  async () =>{
      const savefile=await localforage.getItem("uploadedFile")
      if(savefile){
        setImageView(URL.createObjectURL(savefile[0]))
        
      }
    }
    getLocalData()
  },[])

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
                  <h2 className={Styles.addPickupDetailsText}>
                    {t("order_preview")}
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    {t("review_order_details")}
                  </p>
                </div>

                <div className={Styles.pickupOrderPreviewAddresCard}>
                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {order?.addPickupLocation?.address + ","}{" "}
                      {order?.addPickupLocation?.city +
                        "," +
                        order?.addPickupLocation?.state +
                        "," +
                        order?.addPickupLocation?.country +
                        "-" +
                        order?.addPickupLocation?.postal_code}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {order?.addDestinationLocation?.address + ","}{" "}
                      {order?.addDestinationLocation?.city +
                        "," +
                        order?.addDestinationLocation?.state +
                        "," +
                        order?.addDestinationLocation?.country +
                        "-" +
                        order?.addDestinationLocation?.postal_code}
                    </p>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    {t("vehicle_details")}
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
                    {t("pickup_details")}
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {order?.orderCustomerDetails?.name +
                          " " +
                          order?.orderCustomerDetails?.lastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {order?.orderCustomerDetails?.company}
                      </p>
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
                        {order?.orderCustomerDetails?.email}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {"+" + order?.orderCustomerDetails?.phoneNumber}
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
                      {order?.orderCustomerDetails?.pickupnote}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    {t("dropoff_details")}
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {order?.orderCustomerDetails?.dname +
                          " " +
                          order?.orderCustomerDetails?.dlastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {order?.orderCustomerDetails?.dcompany}
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
                        {order?.orderCustomerDetails?.demail}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {"+" + order?.orderCustomerDetails?.dphoneNumber}
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
                      {order?.orderCustomerDetails?.dropoffnote}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    {t("estimated_cost")}
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
                  {checkboxTypes.map((type) => (
                    <div
                      key={`default-${type}`}
                      className={`mb-3 ${Styles.checkboxCard}`}
                    >
                      <Form.Check
                        type={type}
                        id={`default-${type}`}
                        label={t("save_addresses")}
                        checked={isAddressAdd}
                        className={`${Styles.saveAddresslaterCheckBox}`}
                        onClick={(e) => setIsAddressAdd(e.target.checked)}
                      />
                    </div>
                  ))}
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <div
                    className={Styles.addPickupDetailsCancelBTn}
                    onClick={()=>navigate(-1)}
                    style={{ color: "#000",cursor:"pointer"}}
                  >
                    {t("back")}
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={submitHandler}
                    className={Styles.addPickupDetailsNextBtn}
                  >
                    {t("proceed_to_payment")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default OrderView;
