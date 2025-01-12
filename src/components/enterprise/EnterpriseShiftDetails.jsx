import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faGear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Home from "../../assets/images/home-icon.png";
import Driver from "../../assets/images/Driver-Image.jpeg";
import Calender from "../../assets/images/Calender-withBg.png";
import CommonHeader from "../../common/CommonHeader";
import MasterCard from "../../assets/images/MasterCard-Logo.png";
import OrderTag from "../../assets/images/OrderFare-Tag.png";
import Invoice from "../../assets/images/Invoice-Img.png";
import { useSelector } from "react-redux";
import { getAVehicleByTypeId, getLocationById, getViewEnterpriseOrderDetail } from "../../data_manager/dataManage";
import { buildAddress } from "../../utils/Constants";

const EnterpriseShiftDetails = () => {
  const user = useSelector((state)=>state.auth.user)
  const {vehicleType}=useSelector((state)=>state.commonData.commonData)
  const location =useLocation()
  const {order,branches}=location.state
  const [orders, setOrders] = useState({});
  const [deliveryboy, setDeliveryboy] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
    const [sourceAddress, setSourceAddress] = useState({});
    const [loading,setLoading]=useState(false)
  
  const getBranch = (branchId) => {
    let result = branches?.filter((branch) => branch.id == branchId);

    if(result==undefined){
      return {
        branch_name:"not found",
        address:"not found"
      }
    }else{
      return {
        branch_name:result && result[0]?.branch_name,
        address:buildAddress(result[0]?.address,result[0]?.city,result[0]?.state,result[0]?.country,result[0]?.postal_code)
      }
    }
    
  };

  const getVehicleType= (vehicleId) =>{
    const vehicletype= vehicleType?.filter((vehicle) => vehicle.id == vehicleId);
    return vehicletype
  }



  const orderDetail = async () => {
      setLoading(true);
      getViewEnterpriseOrderDetail(
        order,
        (successResponse) => {
          setLoading(false);
          if (successResponse[0]._success) {
            setOrders(successResponse[0]._response.order);
            setDeliveryboy(successResponse[0]._response.deliveryBoy);
          }
        },
        (errorResponse) => {
          setLoading(false);
        }
      );
  };



  useEffect(()=>{
    orderDetail()
  },[order])
 

  // console.log("order",orders)
  return (
    <>
      <CommonHeader userData={user}/>
      <section className={Styles.pickupHistorySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.enterpriseShiftDetailsHeaderCard}>
                  <p className={Styles.pickupHistoryHeaderTitle}>
                    Shift Details
                  </p>
                  <Link>
                    <FontAwesomeIcon
                      className={Styles.enterpriseShiftDetailGearIcon}
                      icon={faGear}
                    />
                  </Link>
                </div>
                <div className={Styles.enterpriseShiftDetailCompanyDetailCard}>
                  <div className={Styles.enterpriseShiftDetailHomeIconCard}>
                    <img
                      className={Styles.enterpriseShiftDetailHomeIcon}
                      src={Home}
                      alt="homeIcon"
                    />
                    <h4 className={Styles.enterpriseShiftDetailCompanyName}>
                      {getBranch(order?.branch_id)?.branch_name}
                    </h4>
                  </div>
                  <div className={Styles.enterpriseShiftDetailAddresCard}>
                    <FontAwesomeIcon
                      className={Styles.enterpriseShiftDetailLocDotIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.enterpriseShiftDetailAddressText}>
                    {getBranch(order?.branch_id)?.address}
                    </p>
                  </div>
                </div>

                <div className={Styles.enterpriseShiftDetailDriverCardMain}>
                  <div className={Styles.enterpriseShiftDetailDriverCard}>
                    <img
                      className={Styles.enterpriseShiftDetailDriverImg}
                      src={Driver}
                      alt="img"
                    />
                    <h4 className={Styles.enterpriseShiftDetailDriverName}>
                      John Doe
                    </h4>
                  </div>
                  <p className={Styles.enterpriseShiftDetailDrivertruckDetails}>
                    VOLVO FH16 2022
                  </p>
                </div>

                <div className={Styles.enterpriseShiftDetailCalenderCardMain}>
                  <div className={Styles.enterpriseShiftDetailCalenderCard}>
                    <img
                      className={Styles.enterpriseShiftDetailCalenderImg}
                      src={Calender}
                      alt="calender-icon"
                    />
                    <p className={Styles.enterpriseShiftDetailStarteddatetime}>
                      Started 11 AM to 04 PM
                    </p>
                  </div>
                  <div
                    className={Styles.enterpriseShiftDetailShiftDurationCard}
                  >
                    <p
                      className={Styles.enterpriseShiftDetailShiftDurationText}
                    >
                      Total duration: <b>5 hours</b>
                    </p>
                    <p
                      className={Styles.enterpriseShiftDetailShiftDurationText}
                    >
                      Total deliveries: <b>12</b>
                    </p>
                  </div>
                  <p className={Styles.enterpriseShiftDetailVehiclenameType}>
                    {getVehicleType(orders?.vehicle_type_id)?.vehicle_type} sdfsd
                  </p>
                </div>

                <div className={Styles.pickupDeliveryDetailOrderfareMainCard}>
                  <div>
                    <div className={Styles.pickupDeliveryDetailOrderPrice}>
                      <div className={Styles.pickupDeliveryDetailPickupCard}>
                        <img
                          className={Styles.pickupdeliveryDetailOrderfareIcon}
                          src={OrderTag}
                          alt="icon"
                        />
                        <p className={Styles.pickupDeliveryDetailOrderfareText}>
                          Order fare
                        </p>
                      </div>
                      <h4 className={Styles.pickupDeliveryDetailOrderPriceText}>
                        €000
                      </h4>
                    </div>
                    <div className={Styles.pickupDeliveryDetailPickuppriceCard}>
                      <p
                        className={Styles.pickupDeliveryDetailTraveledDistance}
                      >
                        Travelled 12 km in 32 mins
                      </p>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Order fare
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €000
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Waiting
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €0.00
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Platform fee
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €000
                        </p>
                      </div>
                      <div className={Styles.pickupDeliveryDetailsAllPriceCard}>
                        <p className={Styles.pickupDeliveryDetailOrderfaretext}>
                          Amount charged
                        </p>
                        <p className={Styles.pickupDeliveryDetailPricesText}>
                          €000
                        </p>
                      </div>
                      <div
                        className={Styles.pickupDeliveryDetailMastercardCard}
                      >
                        <img
                          className={Styles.pickupDeliveryDetailMastercardImg}
                          src={MasterCard}
                          alt="mastercard"
                        />
                        <p
                          className={Styles.pickupDeliveryDetailMasterCardtext}
                        >
                          Paid with mastercard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.pickupDeliveryDetailInvoiceCard}>
                  <div className={Styles.pickupDeliveryDetailInvoiceTextCard}>
                    <img
                      className={Styles.pickupDeliveryDetailsInvoiceImg}
                      src={Invoice}
                      alt="invoice"
                    />
                    <p
                      className={Styles.pickupDeliveryDetailDownloadInvoiceText}
                    >
                      Download invoice
                    </p>
                  </div>
                  <button className={Styles.pickupDeliveryDetailDownloadIcon}>
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseShiftDetails;
