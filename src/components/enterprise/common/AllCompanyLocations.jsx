import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../../assets/css/home.module.css";
import ScheduleImg from "../../../assets/images/schedule-calender.png";
import CommonHeader from "../../../common/CommonHeader";
import Home from "../../../assets/images/home-icon.png";
import NoDataImage from "../../../assets/images/NoOrder.png";
import { buildAddress } from "../../../utils/Constants";
import { setBranches } from "../../../redux/enterpriseSlice";
import { useTranslation } from "react-i18next";

function AllCompanyLocations() {
  const {t}=useTranslation()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { branches } = useSelector((state) => state.enterprise);
  const makeAddress = (location) => {
    return buildAddress(
      location.address,
      location.city,
      location.state,
      location.country,
      location.postal_code
    );
  };

  const getBranchList = () => {
    setLoading(true);
    getEnterpriseDashboardInfo(
      user.userDetails.ext_id,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._response) {
          dispatch(
            setBranches(successResponse[0]?._response?.branchOverviewData)
          );
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (branches.length == 0) {
      getBranchList();
    }
  }, [user]);
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            {/* Left Section */}
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                  {t("company_locations")}
                  </h4>
                </div>
                <div>
                  <img
                    className={Styles.enterpriseNewScheduleImg}
                    src={ScheduleImg}
                    alt="Schedule Illustration"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-8">
              <div className={Styles.enterpriseHomeCompanyLocMainCard}>
                <div>
                  {branches && branches.length > 0 ? (
                    branches.map((company, index) => (
                      <div
                        key={index}
                        className={Styles.enterpriseHomeCompanyLocCard}
                      >
                        <div className={Styles.enterpriseCompanyLogoNameCard}>
                          <img
                            className={Styles.enterpriseHomeHomeIcon}
                            src={Home}
                            alt="home-icon"
                          />
                          <div>
                            <h4 className={Styles.enterpriseHomeCompanyName}>
                              {company.branch_name}
                            </h4>
                            <div className={Styles.enterpriseHomeAddressCard}>
                              <FontAwesomeIcon
                                className={Styles.enterpriseHomeLocDotIcon}
                                icon={faLocationDot}
                              />
                              <p
                                className={Styles.enterpriseHomeCompanyAddress}
                              >
                                {makeAddress(company)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={Styles.enterpriseHomeLocSpentCard}>
                          <div className={Styles.enterpriseHomeHrsBookedCard}>
                            <p className={Styles.enterpriseHomeLocHsbooked}>
                            {t("active_bookings")}
                            </p>
                            <h4>{company?.active_order || 0}</h4>
                          </div>

                          <div className={Styles.enterpriseHomeHrsBookedCard}>
                            <p className={Styles.enterpriseHomeLocHsbooked}>
                            {t("shift_bookings")}
                            </p>
                            <h4>{company?.schedule_order || 0}</h4>
                          </div>

                          <div className={Styles.enterpriseHomeHrsBookedCard}>
                            <p className={Styles.enterpriseHomeLocHsbooked}>
                            {t("all_bookings")}
                            </p>
                            <h4>{company?.total || 0}</h4>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={Styles.pickupHistoryNoDataMainCard}>
                      <div className={Styles.pickupHistoryNoDataCard}>
                        <img
                          className={Styles.pickupHistoryNodataImage}
                          src={NoDataImage}
                          alt="No-Data"
                        />
                      </div>
                      <div>
                        <h4 className={Styles.pickupHistoryNoDatatext}>
                        {t("noCompanyLocationsToShow")}
                        </h4>
                        <p className={Styles.pickupHistoryNodataSubText}>
                        {t("noCompanyLocationsShowDes")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllCompanyLocations;
