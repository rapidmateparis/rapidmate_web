import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";

import CommonHeader from "../../common/CommonHeader";
import Package from "../../assets/images/One-TimePackage-big.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
} from "@fortawesome/free-regular-svg-icons";
import {useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getImage from "../consumer/common/GetImage";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SideComponent from "./common/SideComponent";

const EnterpriseCreateShiftSelectServiceType = () => {
  const user = useSelector((state)=>state.auth.user)
  const navigate = useNavigate();
  const location = useLocation()
  const {selectedBranch,serviceType}=location.state
  const {vehicleType,enterpriseServiceType}=useSelector((state)=>state.commonData.commonData)
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleTypeList, setVehicleTypeList] = useState(vehicleType);
  const handleServiceTypeClick = (serviceType, vehicleName) => {
    setSelectedServiceType(serviceType);
    setSelectedVehicle(vehicleName);
  };

 const vehicleHandler = (vehicleId) => {
    if(selectedServiceType?.id==1){
        showErrorToast("Cannot pickup another vehicle")
        return 
    }
    setSelectedVehicle(vehicleId)
 }
 
 const continueHanger = async (e) => {
    e.preventDefault();
    if(selectedVehicle ==null || selectedServiceType ==null){
        showErrorToast('Select service type and vehicle type')
        return
    }

    navigate("/enterprise/set-schedule",{
        state:{
            vehicletypeId:selectedVehicle,
            serviceType:selectedServiceType,
            branch:selectedBranch,
            deliveryType:serviceType
        }
    })
 }

  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user}/>
      {/* Header End Here  */}
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <SideComponent />
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>Select service type</h4>

                <div className={Styles.enterpriseselectServicesOptionCardMain}>
                    {enterpriseServiceType?.map((item,key)=>(
                        <div key={key} className={`${Styles.enterpriseselectServicesOptionCard} ${selectedServiceType?.id === item?.id ? Styles.selected : ""}`}
                         onClick={() => handleServiceTypeClick(item,2)}>
                         <FontAwesomeIcon className={Styles.enterpriseSelectServiceTypeCricle} icon={selectedServiceType?.id === item?.id ? faCircleDot : faCircle} />
                         <p className={Styles.enterpriseSelectServiceTypeText}>
                           {item?.service_type}
                         </p>
                       </div>
                    ))}
                </div>

                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select vehicle type
                </h4>
                <div className={Styles.enterpriseSelectServiceVehicleCardMain}>
                  <div className="row">
                    {vehicleTypeList.map((vehicle, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceVehicleCard
                          } ${
                            selectedVehicle === vehicle.id ? Styles.selected : ""
                          }`}
                          onClick={() => vehicleHandler(vehicle.id)}
                        >
                          <FontAwesomeIcon
                            className={Styles.enterpriseSelectVehicleCircleIcon}
                            icon={
                              selectedVehicle === vehicle.id
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={
                              Styles.enterpriseSelectServiceVehicleName
                            }
                          >
                            {vehicle.vehicle_type}
                          </p>
                          <img
                            className={Styles.enterpriseVehilces}
                            src={getImage(vehicle)}
                            alt={vehicle.vehicle_type}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
               

               
                <div className={Styles.enterpriseSelectServiceNextBtnCard}>
                  <div
                    onClick={continueHanger}
                    className={Styles.enterpriseSelectServiceNextBtn}
                    style={{cursor:"pointer"}}
                  >
                    Next
                  </div>
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

export default EnterpriseCreateShiftSelectServiceType;
