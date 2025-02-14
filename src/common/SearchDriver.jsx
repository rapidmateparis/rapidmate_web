import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "../assets/css/home.module.css";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import DriverCircle from "../assets/images/DriverBackgroun-Circle.png";
import DriverProfiles from "../assets/webImages/LookingForDriver.json";
import PickupCancellationReasonModal from "./PickupCancellationReasonModal";
import { ToastContainer } from "react-toastify";
import {
  getAllocatedDeliveryBoy,
  getLocations,
} from "../data_manager/dataManage";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

const SearchDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {t}=useTranslation()
  const timeoutRef = useRef(null); // Timeout reference for cleanup
  const [retryCount, setRetryCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [searchMessage, setSearchMessage] = useState(
    "Please wait, we are looking for a driver to pick up and deliver your order."
  );
  const user = useSelector((state) => state.auth.user);
  const { orderNumber } = location.state || {};

  const openModal = () => setShowModal(true);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const getLocationsData = () => {
    getLocations(
      null,
      (locationResponse) => {
        if (locationResponse[0]._success) {
          const locationList = locationResponse[0]._response;
          const params = {
            userRole: user?.userDetails?.role,
            orderNumber,
          };

          getAllocatedDeliveryBoy(
            params,
            (driverResponse) => {
              clearTimeout(timeoutRef.current); // Clear timeout if successful
              setRetryCount(null); // Stop retries
              const baseUrl = user?.userDetails?.role
                ?.toLowerCase()
                .replace(/_/g, "");

              navigate(`/${baseUrl}/order-tracking`, {
                state: {
                  driverDetails: driverResponse[0]._response,
                  locationList,
                },
              });
            },
            (errorResponse) => {
              // Retry logic if the driver allocation fails
              timeoutRef.current = setTimeout(() => {
                setRetryCount((prevCount) => prevCount + 1);

                if (retryCount === 5) {
                  navigate("/driver-not-available", {
                    state: { orderNumber },
                  });
                }
              }, 15000); // Retry after 15 seconds
            }
          );
        }
      },
      (errorResponse) => {
        console.error(
          "Location fetch error:",
          errorResponse[0]?._errors?.message
        );
      }
    );
  };

  useEffect(() => {
    if (retryCount !== null && retryCount <= 5) {
      getLocationsData();
    }
  }, [retryCount]);

  useEffect(() => {
    getLocationsData(); // Initial fetch
    return () => {
      // Cleanup on unmount
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.lookingDriverSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.driverCancelCard}>
                <button
                  className={Styles.driverCancelModalBtn}
                  onClick={openModal}
                >
                  {t("cancel_request")}
                </button>
              </div>
              <div className={Styles.driverBackgroundMiddleCard}>
                <div>
                  <Lottie
                    animationData={DriverProfiles}
                    loop={true}
                    className={Styles.driverAnimation}
                  />
                  <div className={Styles.lookingDriverMainTitlesCard}>
                    <h1 className={Styles.lookingDriverText}>
                      {t("looking_for_driver")}
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
