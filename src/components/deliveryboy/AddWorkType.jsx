import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Shift from "../../assets/images/Calender-Icon.png";
import PickupDrop from "../../assets/images/Location-Icon.png";
import Both from "../../assets/images/Calender-Both.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UseFetch } from "../../utils/UseFetch";
import { updateUserProfile } from "../../data_manager/dataManage";
import { logout, updateUserDetails } from "../../redux/authSlice";
import localforage from "localforage";
import { useTranslation } from "react-i18next";
function AddWorkType() {
   const {t}=useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lookup, user } = UseFetch();
  const [workType, setWorkType] = useState(
    user?.userDetails?.work_type_id || null
  );
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
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
        dispatch(logout());
        localforage.clear();
        navigate("/thanks");
      },
      (errorResponse) => {
        console.log("updateUserProfile", errorResponse);
      }
    );
  };

  const getImageSrc = (workType) => {
    switch (workType) {
      case "Shift wise":
        return Shift;
      case "Pickup and dropoff deliveries":
        return PickupDrop;
      case "Both":
        return Both;
      default:
        return Shift;
    }
  };
  return (
    <section className={Styles.profileChooseSec}>
      <div className="container">
        <div>
          <Link
            className={Styles.logoCard}
            to={!isAuthenticated && !role ? "/" : `/${baseUrl}/add-work-type`}
          >
            <img className={Styles.logo} src={Logo} alt="logo" />
            <h2 className={Styles.companyName}>Rapidmate</h2>
          </Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className={Styles.chooseProfileCard}>
              <h2 className={Styles.chooseProfileHeading}>
              {t("select_work_type")}
              </h2>
              <p className={Styles.chooseProfileSubheading}>
              {t("changeWorkTypeDes")}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {lookup?.workType.map((worktype, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`${Styles.deliveryboyProfileTypeMainCard} ${
                  workType === worktype.id ? Styles.selected : ""
                }`}
                onClick={() => handleCardClick(worktype.id)}
              >
                <div className={Styles.DeliveryboyProfiletypeImgCard}>
                  <img
                    className={Styles.deliveryboyProfileTypeImg}
                    src={getImageSrc(worktype.work_type)}
                    alt="Img"
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
          <div className="mt-5">
            <Link
              to="#"
              className={Styles.pickupSignupContinueBtn}
              type="button"
              onClick={continueHandler}
            >
              {t("saveContinue")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddWorkType;
