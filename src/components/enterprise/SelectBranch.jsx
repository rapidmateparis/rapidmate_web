import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import ScheduleImg from "../../assets/images/schedule-calender.png";
import Track from "../../assets/images/Track-Order-img.png";
import Package from "../../assets/images/One-TimePackage-big.png";
import Home from "../../assets/images/home-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import { useSelector } from "react-redux";
import { buildAddress } from "../../utils/Constants";
import { getEnterpriseBranch } from "../../data_manager/dataManage";
import { showErrorToast } from "../../utils/Toastify";

const SelectBranch = () => {
  const user = useSelector((state)=>state.auth.user)
  const location=useLocation()
  const serviceType = location.state.servicetype
  const navigate = useNavigate();
  const [enterpriseBranch, setEnterpriseBranches] = useState(null);
  const getBranchLocation = () => {
    getEnterpriseBranch(
      user.userDetails.ext_id,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast(successResponse[0]._response.name);
            } else {
              var branches = [];
              for (
                let index = 0;
                index < successResponse[0]._response.length;
                index++
              ) {
                const element = successResponse[0]._response[index];
                element.isSelected = false;
                branches.push(element);
              }
              setEnterpriseBranches(branches);
            }
          }
        }
      },
      (errorResponse) => {
        showErrorToast(errorResponse[0]._errors.message);
      }
    );
  };


  const getLocationAddress = branchId => {
    let result = enterpriseBranch?.filter(branch => branch.id == branchId);
    return buildAddress(result[0]?.address,result[0]?.city,result[0]?.state,result[0]?.country,result[0]?.postal_code);
  };
  useEffect(() => {
    getBranchLocation();
  }, [user]);
  useEffect(() => {
    if (!serviceType) {
      navigate('/enterprise/schedules');
    }
  }, [serviceType, navigate]);

  const handleRoute = (branch) =>{
    if(!branch) {
      showErrorToast('Undefined branch')
      return 
    }
    navigate(`/enterprise/${serviceType?.delivery_type?.toLowerCase().replace(/ /g, '-')}`, { state: { selectedBranch: branch,serviceType:serviceType } })
  }
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
                    {serviceType?.delivery_type}
                  </h4>
                </div>
                <div>
                  <img
                    className={Styles.enterpriseOneTimePackageImg}
                    src={Package}
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
                  {enterpriseBranch?.map((branch, index) => (
                    <div
                      key={index}
                      onClick={()=>handleRoute(branch)}
                    >
                      <div className={Styles.enterpriseOneTimeCompanyLocCard}>
                        <img
                          className={Styles.enterpriseOneTimeHomeIcon}
                          src={Home}
                          alt="icon"
                        />
                        <h4 className={Styles.enterpriseOneTimeCompanyName}>
                          {branch?.branch_name}
                        </h4>
                        <div
                          className={Styles.enterpriseOneTimeCompanyAddressCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.enterpriseOneTimeLocDot}
                            icon={faLocationDot}
                          />
                          <p className={Styles.enterpriseOneTimeCompanyAddress}>
                            {getLocationAddress(branch?.id)?.length <= 28 ? getLocationAddress(branch?.id) : `${getLocationAddress(branch?.id).substring(0, 28)}...`}
                          </p>
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
};

export default SelectBranch;
