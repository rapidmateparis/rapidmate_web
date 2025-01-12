import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faX,
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Package from "../../assets/images/Package.png";
import Styles from "../../assets/css/home.module.css";
import CalenderEvent from './setting/CalenderEvent'
import CommonHeader from '../../common/CommonHeader';
import { useSelector } from 'react-redux';

function EnterprisePlanning() {
  const user = useSelector((state)=>state.auth.user)
  return (
    <>
    <CommonHeader userData={user}/>
    <section className={Styles.enterprisePlaningSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.enterprisePlannigHeadCard}>
                <h4 className={Styles.enterprisePlanningTitle}>Planning</h4>
                <div className={Styles.enterprisePlannigFilterScheduleCard}>
                  <button className={Styles.enterprisePlanningFilterBtn}>
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                  <Link to="/enterprise/schedules" className={Styles.enterprisePlanningNewScheduleBtn}>
                    <FontAwesomeIcon
                      className={Styles.enterprisePlanningPlusIcon}
                      icon={faPlus}
                    />
                    New schedule
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div>
                <div className={Styles.enterprisePlanningCalenderMain}>
                  <CalenderEvent />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div>
                <div>
                  <div className={Styles.enterprisePlannigdDateHeader}>
                    <p className={Styles.enterprisePlannigdDateText}>June 4, 2024</p>
                    <button className={Styles.enterprisePlannigDateCloseIcon}>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>
                  <div className={Styles.enterprisePlannigDeliveryByDateMainCard}>
                    <div className={Styles.enterprisePlaningPackageMainCard}>
                      <div className={Styles.enterprisePlaningPackageHeaderCard}>
                        <img
                          className={Styles.enterprisePlaningPackageImg}
                          src={Package}
                          alt="img"
                        />
                        <p className={Styles.enterprisePlaningPackageInfo}>
                          Pickup on Jun 2, 2024 at 11:30 AM
                        </p>
                      </div>
                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          From <b>North Street, ABC</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressToCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          To <b>5th Avenue, XYZ</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseFooterCardId}>
                        <p className={Styles.enterpriseHomeOrderIdText}>
                          Order ID: <span>98237469</span>
                        </p>
                      </div>
                    </div>

                    <div className={Styles.enterprisePlaningPackageMainCard}>
                      <div className={Styles.enterprisePlaningPackageHeaderCard}>
                        <img
                          className={Styles.enterprisePlaningPackageImg}
                          src={Package}
                          alt="img"
                        />
                        <p className={Styles.enterprisePlaningPackageInfo}>
                          Pickup on Jun 2, 2024 at 11:30 AM
                        </p>
                      </div>
                      <div className={Styles.enterpriseHomeAddressFromCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          From <b>North Street, ABC</b>
                        </p>
                      </div>

                      <div className={Styles.enterpriseHomeAddressToCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeAddresslocDotIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.enterpriseHomeAddressText}>
                          To <b>5th Avenue, XYZ</b>
                        </p>
                      </div>

                      <div className="enterpriseFooter-CardId">
                        <p className="enterpriseHome-orderIdText">
                          Order ID: <span>98237469</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EnterprisePlanning
