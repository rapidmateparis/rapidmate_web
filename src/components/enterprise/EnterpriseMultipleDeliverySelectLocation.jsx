import React from "react";
import { Link } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import Track from "../../assets/images/Track-Order-img.png";
import Calender from "../../assets/images/Calender-withBg.png";
import Home from "../../assets/images/home-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import { useSelector } from "react-redux";

const EnterpriseMultipleDeliverySelectLocation = () => {
  const user = useSelector((state)=>state.auth.user)
  const company = [
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
  ];

  return (
    <>
      {/* Header Start Here */}
      <CommonHeader userData={user}/>
      {/* Header End Here */}
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                    One time delivery
                  </h4>
                  <img
                    className={Styles.enterpriseOneTimeTrackImg}
                    src={Track}
                    alt="img"
                  />
                </div>
                <div>
                  <img
                    className={Styles.enterpriseMultipleCalenderImg}
                    src={Calender}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select company location
                </h4>

                <div className={Styles.enterpriseOneTimeCompanyLocMainCard}>
                  {company.map((company, index) => (
                    <Link
                      key={index}
                      to="/enterprises-multiple-deliveries-serviceselect"
                    >
                      <div className={Styles.enterpriseOneTimeCompanyLocCard}>
                        <img
                          className={Styles.enterpriseOneTimeHomeIcon}
                          src={Home}
                          alt="icon"
                        />
                        <h4 className={Styles.enterpriseOneTimeCompanyName}>
                          {company.name}
                        </h4>
                        <div
                          className={Styles.enterpriseOneTimeCompanyAddressCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.enterpriseOneTimeLocDot}
                            icon={faLocationDot}
                          />
                          <p className={Styles.enterpriseOneTimeCompanyAddress}>
                            {company.address}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseMultipleDeliverySelectLocation;
