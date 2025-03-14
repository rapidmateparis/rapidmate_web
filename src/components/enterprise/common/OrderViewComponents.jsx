import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import SidebarImg from "../../../assets/images/Pickup-Order-preview-Banner.png";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import getImage from "../../consumer/common/GetImage";
import { getFileName } from "../../../utils/Constants";
import { useTranslation } from "react-i18next";
import localforage from "localforage";

const OrderViewComponents = ({
  navigate,
  order,
  orderCustomerDetails,
  getOrderAddress,
  getDropoffLocation,
  isAddressAdd,
  isMultiple,
}) => {
  const {t}=useTranslation()
  const [imageView, setImageView] = useState(null);
  const [imageViews, setImageViews] = useState({});
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

  useEffect(()=>{
    const getLocalData =  async () =>{
      
      if(!isMultiple){
        const savefile=await localforage.getItem("uploadedFile")
        if(savefile){
          setImageView(URL.createObjectURL(savefile[0]))
          
        }
      }else{
       
        order?.dropoffLoc?.map(async(v,i)=>{
          const savedFile = await localforage.getItem("file-"+i);
         
          if (savedFile) {
            const urlImg=URL.createObjectURL(savedFile[0])
            setImageViews((prev) => ({
              ...prev,
              [i]: urlImg,
            }));
          }
        })
      }
      
    }
    getLocalData()
  },[])

  
  return (
    <>
    
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
                  <h2 className={Styles.addPickupDetailsText}>{t("order_preview")}</h2>
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
                      {getOrderAddress(order?.deliveryType?.id, order)}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  {isMultiple ? (
                    order?.dropoffLoc?.map((location, index) => (
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
                        {orderCustomerDetails?.company}
                      </h5>
                    </div>
                    {!isMultiple && (
                      <div>
                        <img
                          className={Styles.PickupOrderPreviewTruckImage}
                          src={imageView}
                          alt="icon"
                        />
                      </div>
                    )}
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

                {isMultiple ? (
                  order?.dropoffLoc?.map((location, index) => (
                    <div className={Styles.pickupOrderPreviewVehicleCard} key={index}>
                      <p
                        className={Styles.pickupOrderPreviewVehicleDetailsText}
                      >
                       {t("dropoff_details")} {index + 1}
                      </p>
                      <div
                        className={Styles.pickupOrderPreviewVehicleDetailsCard}
                      >
                        <div>
                          <h5 className={Styles.pickupOrderPreviewVehicleType}>
                            {getFileName(orderCustomerDetails,"dname",index)}
                            {" "}{getFileName(orderCustomerDetails,"dlastname",index)}
                          </h5>
                          <p className={Styles.pickupOrderPreviewCompanyName}>
                            {getFileName(orderCustomerDetails,"dcompany",index)}
                          </p>
                        </div>
                        <div>
                        <img
                          className={Styles.PickupOrderPreviewTruckImage}
                          src={imageViews[index]}
                          alt="icon"
                        />
                      </div>
                      </div>

                      <div
                        className={
                          Styles.pickupOrderPreviewAdminDetailsMainCard
                        }
                      >
                        <div
                          className={Styles.pickupOrderPreviewAdminDetailsCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupOrderglobeIcon}
                            icon={faGlobe}
                          />
                          <p className={Styles.pickupOrderAdminEmail}>
                          {getFileName(orderCustomerDetails,"demail",index)}
                          </p>
                        </div>

                        <div
                          className={Styles.pickupOrderPreviewAdminDetailsCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupOrderglobeIcon}
                            icon={faPhone}
                          />
                          <p className={Styles.pickupOrderAdminEmail}>
                            {getFileName(orderCustomerDetails,"dphoneNumber",index)}
                          </p>
                        </div>
                      </div>

                      <div
                        className={Styles.pickupOrderPreviewAdminDetailsCard}
                      >
                        <FontAwesomeIcon
                          className={`${Styles.pickupOrderglobeIcon} me-2`}
                          icon={faCommentDots}
                        />
                        <p className={Styles.pickupOrderPreviewPickupNotes}>
                          {" "}
                          {getFileName(orderCustomerDetails,"dropoffnote",index)}
                          
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={Styles.pickupOrderPreviewVehicleCard}>
                    <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                      {t("dropoff_details")}
                    </p>
                    <div
                      className={Styles.pickupOrderPreviewVehicleDetailsCard}
                    >
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
                      <div
                        className={Styles.pickupOrderPreviewAdminDetailsCard}
                      >
                        <FontAwesomeIcon
                          className={Styles.pickupOrderglobeIcon}
                          icon={faGlobe}
                        />
                        <p className={Styles.pickupOrderAdminEmail}>
                          {orderCustomerDetails?.demail}
                        </p>
                      </div>

                      <div
                        className={Styles.pickupOrderPreviewAdminDetailsCard}
                      >
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
                )}

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

                {/* <div>
                  <div className={`mb-3 ${Styles.checkboxCard}`}>
                    <Form.Check
                      type="checkbox"
                      id={`default-checkbox`}
                      label={t("save_addresses")}
                      defaultChecked={isAddressAdd}
                      className={`${Styles.saveAddresslaterCheckBox}`}
                    />
                  </div>
                </div> */}

                <div className={Styles.addPickupDetailsBtnCard}>
                  <div
                    className={Styles.addPickupDetailsCancelBTn}
                    onClick={() => navigate(-1)}
                    style={{ color: "#000", cursor: "pointer" }}
                  >
                    {t("back")}
                  </div>

                  <div
                    onClick={submitHandler}
                    className={Styles.addPickupDetailsNextBtn}
                    style={{ cursor: "pointer" }}
                  >
                    {t("proceed_to_payment")}
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

export default OrderViewComponents;
