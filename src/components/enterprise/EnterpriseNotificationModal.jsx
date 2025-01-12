import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/PickupNotificationModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteNotificationList, getNotificationList } from "../../data_manager/dataManage";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../utils/Toastify";

function EnterpriseNotificationModal({ show, handleClose }) {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState([]);
  const {role, user } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const getNotification = () => {
    getNotificationList(
      user.userDetails.ext_id,
      (successResponse) => {
        const transformedData = successResponse[0]._response;
        setNotificationList(transformedData);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  };
  useEffect(() => {
    getNotification();
  }, [user]);

  const handleNext = (e) => {
    e.preventDefault();
    navigate(`/${baseUrl}/notifications`);
  };

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
      <div>
        <Modal
          className="pickupNotification-modalMain"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <div className={`${Styles.pickupNotificationHeader}`}>
              <p className={Styles.pickupnotificationTitle}>Notifications</p>
              {/* <button
                onClick={handleClose}
                className={Styles.pickupNotificationClearBtn}
              >
                Clear all
              </button> */}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              {notificationList?.slice(0, 5).map((info, index) => (
                <div key={index} className={Styles.pickupNotificationModalCard}>
                  <FontAwesomeIcon
                    className={Styles.pickupNotificationNotificationBell}
                    icon={faBell}
                  />
                  <div>
                    <h4 className={Styles.pickupNotificationDeliveryStatus}>
                      {info?.title}
                    </h4>
                    <p className={Styles.pickupNotificationDeliverydiscription}>
                      {info?.message}
                    </p>
                    <div className={Styles.pickupNotificationClockTimeCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupNotificationClockIcon}
                        icon={faClock}
                      />
                      <p className={Styles.pickupNotificationDeliveryTime}>
                        {moment(info?.createdAt).format("hh:mm A")}
                      </p>
                    </div>
                  </div>
                  <div>
                  <FontAwesomeIcon
                    className={Styles.pickupNotificationNotificationClose}
                    icon={faX}
                    style={{cursor:"pointer"}}
                    onClick={() => deleteHandler(info?._id)}
                  />
                  </div>
                  
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <div
                onClick={handleNext}
                style={{ cursor: "pointer" }}
                className={Styles.pickupNotificationSeeallBtn}
              >
                See all
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default EnterpriseNotificationModal;
