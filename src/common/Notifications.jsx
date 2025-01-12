import { useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import Styles from "../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock, faX } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  deleteNotificationList,
  getNotificationList,
} from "../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import Spinners from "./Loader";

const NotificationLists = () => {
  const user = useSelector((state) => state.auth.user);
  const [notificationList, setNotificationList] = useState([]);
  const [loading,setLoading]=useState(false)
  const getNotification = () => {
    setLoading(true)
    getNotificationList(
      user.userDetails.ext_id,
      (successResponse) => {
        const transformedData = successResponse[0]._response;
        setNotificationList(transformedData);
        setLoading(false)
      },
      (errorResponse) => {
        console.log(errorResponse);
        setLoading(false)

      }
    );
  };

  useEffect(() => {
    getNotification();
  }, [user]);

  const deleteHandler = (rowId) => {
    let params={
        id:rowId
    }
    deleteNotificationList(
        params,
      (successResponse) => {
        if (successResponse[0]._success) {
          showSuccessToast(
            successResponse[0]?._response?.message ||
              "Record delete successfully."
          );
          getNotification();
        }
      },
      (errorResponse) => {
        showErrorToast(errorResponse[0]._errors.message);
      }
    );
  };
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.pickupNotificationsSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.max75}>
              <div>
                <h4 className={Styles.pickupNotificationHeadText}>
                  All notifications
                </h4>

                <div>
                  {loading ? <Spinners /> : notificationList.map((notification, index) => (
                    <div key={index} className={Styles.pickupNotificationCard}>
                      <div
                        className={Styles.pickupnotificationSeceondryMainCard}
                      >
                        <div className={Styles.pickupNotificationMainCard}>
                          <FontAwesomeIcon
                            className={Styles.pickupNotificationBellIcon}
                            icon={faBell}
                          />
                          <div>
                            <h4
                              className={
                                Styles.pickupNotificationDeliveryRouteText
                              }
                            >
                              {notification.title}
                            </h4>
                            <p className={Styles.pickupNotificationDiscription}>
                              {notification.message}
                            </p>
                          </div>
                        </div>

                        <div>
                          <button
                            className={Styles.pickupNotificationCloseBtn}
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteHandler(notification?._id)}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </button>
                          <div className={Styles.pickupnotificationTimeCard}>
                            <FontAwesomeIcon
                              className={Styles.pickupNotificationClockIcon}
                              icon={faClock}
                            />
                            <p className={Styles.pickupnotificationTimeText}>
                              {moment(notification?.createdAt).format(
                                "hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default NotificationLists;
