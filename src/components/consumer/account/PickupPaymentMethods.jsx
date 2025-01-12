import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import WalletLogo from "../../../assets/images/Wallet-Logo.png";
import PayPal from "../../../assets/images/PayPal-Logo.png";
import MasterCard from "../../../assets/images/MasterCard-Logo.png";
import PickupAddPaymentMethodsModal from "./PickupAddPaymentMethodsModal";
import { useSelector } from "react-redux";
import { getConsumerWallet, getDeliveryBoyWallet, getEnterprisePaymentMethod } from "../../../data_manager/dataManage";

const PickupPaymentMethods = () => {
  const user = useSelector((state) => state?.auth?.user.userDetails);
  const [showAddModal, setShowAddModal] = useState(false); // State for add modal
  const [walletAmount, setWalletAmount] = useState("0.00");
  const [loading,setLoading]=useState(false)
  
  useEffect(() => {
    setLoading(true);
  
    const handleSuccess = (successResponse) => {
      setLoading(false);
      setWalletAmount(successResponse[0]?._response?.balance);
    };
  
    const handleError = () => {
      setLoading(false);
    };
  
    const fetchWallet = () => {
      const extId = user?.ext_id;
      if (!extId) return;
  
      switch (user?.role) {
        case 'CONSUMER':
          getConsumerWallet(extId, handleSuccess, handleError);
          break;
  
        case 'DELIVERY_BOY':
          getDeliveryBoyWallet(extId, handleSuccess, handleError);
          break;
  
        default:
          getEnterprisePaymentMethod(extId, handleSuccess, handleError);
          break;
      }
    };
  
    fetchWallet();
  }, [user]);
  
  const openAddModal = () => {
    setShowAddModal(true);
  };
  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Payment methods</p>
            <button onClick={openAddModal} className={Styles.addressBookPlusIconBtn}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div>
            <div className={Styles.paymentMethodWalletCard}>
              <div className={Styles.paymentMethodWalletHeader}>
                <p className={Styles.paymentMethodwalletHeading}>
                  Rapid<b>Mate</b>
                </p>
                <img
                  className={Styles.paymentMethodWalletLogo}
                  src={WalletLogo}
                  alt="logo"
                />
              </div>

              <div className={Styles.paymentMethodWalletBalanceCard}>
                <p className={Styles.paymentMethodWalletBalance}>
                {loading ? <p>Loading...</p> : <p>€ {walletAmount}</p>}
                </p>
                <p className={Styles.paymentMethodWalletText}>Wallet balance</p>
              </div>

              <div className={Styles.paymentMethodWalletActionBtn}>
                
                {user?.role =="DELIVERY_BOY" && <button className={Styles.paymentMethodWithdrawBtn}>Withdraw</button> }
                {user?.role !=="DELIVERY_BOY" && <button className={Styles.paymentMethodWithdrawBtn}>Add funds</button>}
                
              </div>
            </div>

            <div>
              <p className={Styles.paymentMethodCardsText}>Cards</p>

              {/* <div className={Styles.paymentMethodAddedCards}>
                <p className={Styles.paymentmethodUserEmail} style={{textAlign:'center',width:"100%"}}>Data not found.</p>
              </div> */}

              <div className={Styles.paymentMethodAddedCards}>
                <img
                  className={Styles.paymentMethodMastercardsLogos}
                  src={MasterCard}
                  alt="card"
                />
                <div>
                  <p className={Styles.paymentMethodCardName}>Axis Bank</p>
                  <p className={Styles.paymentmethodUserEmail}>**** **** **** 1234</p>
                </div>
                <button className={Styles.paymentMethodEditBtn}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PickupAddPaymentMethodsModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </section>
  );
};

export default PickupPaymentMethods;
