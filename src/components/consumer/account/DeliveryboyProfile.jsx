import React, {useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  getConsumerWallet,
  updateUserProfile,
} from "../../../data_manager/dataManage";
import Shift from "../../../assets/images/Calender-Icon.png";
import PickupDrop from "../../../assets/images/Location-Icon.png";
import Both from "../../../assets/images/Calender-Both.png";
import { UseFetch } from "../../../utils/UseFetch";
import { updateUserDetails } from "../../../redux/authSlice";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
const DeliveryboyProfile = () => {
  // const user = useSelector((state) => state?.auth?.user.userDetails);
  const {t}=useTranslation()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
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
    setLoading(true)
    updateUserProfile(
      user.userDetails.role,
      profileParams,
      (successResponse) => {
        const userDetailsData = {
          ...user.userDetails,
          vehicleAdd: true,
          work_type_id:workType,
        };
       
          dispatch(updateUserDetails({ userDetails: userDetailsData }));
          setSuccessMessage(t("record_updated"))
          setTimeout(() => setSuccessMessage(""), 2200);

        setLoading(false)
      },
      (errorResponse) => {
        setLoading(false)
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
        <div className="row">
          <div className="col-md-12">
            <div className={`${Styles.chooseProfileCard} text-center`}>
              <h2 className={Styles.chooseProfileHeading}>
                {t("delivery_preference")}
              </h2>
              <p className={Styles.chooseProfileSubheading}>
                {t("select_work_type")}
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
          
        </div>
        <div className="mt-5  d-flex justify-content-between">
        <p className="text-success">{successMessage}</p>

            <div
              to="#"
              className={Styles.pickupSignupContinueBtn}
              type="button"
              onClick={continueHandler}
            >
              {loading ? <Spinner /> : t("update")}
            </div>

          </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DeliveryboyProfile;