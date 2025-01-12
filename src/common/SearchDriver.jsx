import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "../assets/css/home.module.css";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import DriverCircle from "../assets/images/DriverBackgroun-Circle.png";
import DriverProfiles from "../assets/images/DriverLoader-Profiles.png";
import PickupCancellationReasonModal from "./PickupCancellationReasonModal";
import { ToastContainer } from "react-toastify";
import { getAllocatedDeliveryBoy, getLocations } from "../data_manager/dataManage";

const SearchDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const {orderNumber} = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null); 
  const [searchMessage, setSearchMessage] = useState("please wait, we are looking for a driver to pick up and deliver your order..");
  const openModal = () => {
    setShowModal(true);
  };


  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  useEffect(() => {

    const getLocationsData = () => {
      getLocations(
        null,
        successResponse => {
          if (successResponse[0]._success) {
            let tempOrderList = successResponse[0]._response;
            const params = {
              userRole: user?.userDetails?.role,
              orderNumber: orderNumber,
            };
         
            getAllocatedDeliveryBoy(
              params,
              successResponse => {
                navigate('/consumer/order-tracking',
                {
                  state: {
                    driverDetails: successResponse[0]._response,
                    locationList: tempOrderList,
                  },
                });
            console.log(successResponse[0]._response)
              },
              errorResponse => {
                console.log(errorResponse[0]._errors.message)
              },
            );
          }
        },
        errorResponse => {
          console.log(errorResponse[0]._errors.message)
        },
      );
    };
    getLocationsData()
    return () => {
      clearInterval();
    };
   
  }, []);

 

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.lookingDriverSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.driverCancelCard}>
                  <button
                    className={Styles.driverCancelModalBtn}
                    onClick={openModal}
                  >
                    Cancel request
                  </button>
                </div>
                <div className={Styles.driverBackgroundMiddleCard}>
                  <img
                    className={Styles.backgroundDriverCircle}
                    src={DriverCircle}
                    alt="Icon"
                  />
                  <div className={Styles.DriverProfileCardMainBg}>
                    <img
                      className={Styles.backgroundDriverCircleProfiles}
                      src={DriverProfiles}
                      alt="Icon"
                    />
                    <h1 className={Styles.lookingDriverText}>
                      Looking for driver
                    </h1>
                    <p className={Styles.lookingDriverSubText}>
                      {searchMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PickupCancellationReasonModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          orderNumber={orderNumber}
          handleReasonSelect={handleReasonSelect}
          setSelectedReason={setSelectedReason}
          selectedReason={selectedReason}
        />
        <ToastContainer />
      </section>
    </>
  );
};

export default SearchDriver;
