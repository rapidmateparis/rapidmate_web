import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../../assets/css/home.module.css";
import ScheduleImg from "../../../assets/images/schedule-calender.png";
import CommonHeader from "../../../common/CommonHeader";
import Home from "../../../assets/images/home-icon.png";
import { buildAddress } from "../../../utils/Constants";
import { setBranches } from "../../../redux/enterpriseSlice";

function AllCompanyLocations() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {branches } = useSelector((state) => state.enterprise);
   const makeAddress = (location) =>{
     return buildAddress(location.address,location.city,location.state,location.country,location.postal_code)
   }

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
       if (branches.length ==0) {
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
                    Company locations
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
              <div style={{ margin: 30 }}>
                <div>
                  {branches?.map((company, index) => (
                    <div
                      key={index}
                      className={Styles.enterpriseHomeCompanyLocCard}
                    >
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
                          <p className={Styles.enterpriseHomeCompanyAddress}>
                            {makeAddress(company)}
                          </p>
                        </div>
                      </div>

                      <div className={Styles.enterpriseHomeLocSpentCard}>
                        <div className={Styles.enterpriseHomeHrsBookedCard}>
                          <p className={Styles.enterpriseHomeLocHsbooked}>
                            Active booking
                          </p>
                          <h4>{company?.active_order ? company?.active_order: 0}</h4>
                        </div>

                        <div className={Styles.enterpriseHomeHrsBookedCard}>
                          <p className={Styles.enterpriseHomeLocHsbooked}>
                          Scheduled booking
                          </p>
                          <h4>{company?.schedule_order ? company.schedule_order : 0}</h4>
                        </div>

                        <div className={Styles.enterpriseHomeHrsBookedCard}>
                          <p className={Styles.enterpriseHomeLocHsbooked}>
                            All booking
                          </p>
                          <h4>{company?.total ? company?.total : 0}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
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
