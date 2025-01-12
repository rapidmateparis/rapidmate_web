import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import WalletLogo from "../../../assets/images/Wallet-Logo.png";
import PayPal from "../../../assets/images/PayPal-Logo.png";
import MasterCard from "../../../assets/images/MasterCard-Logo.png";
import PickupAddPaymentMethodsModal from "./PickupAddPaymentMethodsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsumerWallet,
  updateUserProfile,
} from "../../../data_manager/dataManage";
import Calender from "../../../assets/images/Calender-Icon.png";
import { UseFetch } from "../../../utils/UseFetch";
import { updateUserDetails } from "../../../redux/authSlice";
import { showSuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
const DeliveryboyProfile = () => {
  // const user = useSelector((state) => state?.auth?.user.userDetails);
  const dispatch = useDispatch();

  const [selectedCard, setSelectedCard] = useState(null);
  const { lookup, user } = UseFetch();
  const [workType, setWorkType] = useState(
    user?.userDetails?.work_type_id || null
  );

  const handleCardClick = (workTypeId) => {
    setWorkType(workTypeId);
  };

  const continueHandler = (e) => {
    e.preventDefault();
    let profileParams = {
      ext_id: user.userDetails.ext_id,
      work_type_id: workType,
    };
    updateUserProfile(
      user.userDetails.role,
      profileParams,
      (successResponse) => {
        const userDetailsData = {
          ...user.userDetails,
          vehicleAdd: true,
        };
        dispatch(updateUserDetails({ userDetails: userDetailsData }));
        showSuccessToast('Record Updated Successfully.')
      },
      (errorResponse) => {
        console.log("updateUserProfile", errorResponse);
      }
    );
  };

  // const handleCardClick = (cardId) => {
  //   setSelectedCard(cardId);
  // };

  return (
    <section className={Styles.profileChooseSec}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={`${Styles.chooseProfileCard} text-center`}>
              <h2 className={Styles.chooseProfileHeading}>
                Delivery preferance
              </h2>
              <p className={Styles.chooseProfileSubheading}>
                Select how would you like to work?
              </p>
            </div>
          </div>
          {lookup?.workType.map((worktype, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`${Styles.deliveryboyProfileTypeMainCard} ${
                  workType === worktype.id ? Styles.selected : ""
                } p-2`}
                onClick={() => handleCardClick(worktype.id)}
              >
                <div className={Styles.DeliveryboyProfiletypeImgCard}>
                  <img
                    className={Styles.deliveryboyProfileTypeImg}
                    src={Calender}
                    alt="Calender"
                  />
                </div>
                <div>
                  <h4 className={Styles.deliveryboyProfiletypeText}>
                    {worktype.work_type}
                  </h4>
                  <p className={Styles.deliveryboyProfileTypeDiscription}>
                    {worktype.work_type_desc}
                  </p>
                </div>
                <div className={Styles.deliveryboyProfiletypeCircleCard}>
                  <div
                    className={`${Styles.deliveryboyProfileTypeCircle} ${
                      workType === worktype.id ? Styles.checked : ""
                    }`}
                  >
                    {workType === worktype.id && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        <div className="mt-5  d-flex justify-content-end">
            <div
              to="#"
              className={Styles.pickupSignupContinueBtn}
              type="button"
              onClick={continueHandler}
            >
              update
            </div>
          </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DeliveryboyProfile;
