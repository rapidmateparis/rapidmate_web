import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import WalletLogo from "../../../assets/images/Wallet-Logo.png";
import MasterCard from "../../../assets/images/MasterCard-Logo.png";
import PickupAddPaymentMethodsModal from "./PickupAddPaymentMethodsModal";
import { useSelector } from "react-redux";
import {
  getConsumerPaymentMethod,
  getConsumerWallet,
  getDeliveryBoyWallet,
  getEnterprisePaymentMethod,
} from "../../../data_manager/dataManage";
import { useTranslation } from "react-i18next";
import { createPaymentCustomer, paymentCardList, removePaymentCard } from "../../../utils/UseFetch";

const PickupPaymentMethods = () => {
  const user = useSelector((state) => state?.auth?.user);
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false); // State for add modal
  const [walletAmount, setWalletAmount] = useState("0.00");
  const [paymentCard, setPaymentCard] = useState([]);
  const [customerId,setCustomerId]=useState(null)
  const [paymentMethod,setPaymentMethod]=useState('stripe')


  const [loading, setLoading] = useState(false);

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
      const extId = user?.userDetails.ext_id;
      if (!extId) return;

      switch (user?.userDetails.role) {
        case "CONSUMER":
          getConsumerWallet(extId, handleSuccess, handleError);
          break;

        case "DELIVERY_BOY":
          getDeliveryBoyWallet(extId, handleSuccess, handleError);
          break;

        default:
          getEnterprisePaymentMethod(extId, handleSuccess, handleError);
          break;
      }
    };

    fetchWallet();

   const  getCustomerId = async () =>{
    const params={
      email:user?.userInfo.username,
      role:user?.userDetails.role,
      method:paymentMethod,
    }
    const dataRes=await createPaymentCustomer(params)
    setCustomerId(dataRes?.customer?.id)
  }
  if(user){
    getCustomerId()
  }

     
  }, [user]);
  const getPaymentCardList=async () =>{
    const params={
      method:paymentMethod,
      customerId
    }
    const paymentcard=await paymentCardList(params)
    setPaymentCard(paymentcard)
  }
  useEffect(()=>{
   
    if(customerId){
      getPaymentCardList()
    }
  },[customerId])

  const openAddModal = () => {
    setShowAddModal(true);
  };
  const removeCard = async (paymentMethodId) => {
    try {
      const params={
        method:paymentMethod,
        paymentMethodId
      }
      const res= await removePaymentCard(params)
      getPaymentCardList(); 
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };
  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          {user?.userDetails.role == "DELIVERY_BOY" ? (
            <div className={Styles.addressBookAddressCard}>
              <p className={Styles.addressBookHeaderTitleText}>
                {t("wallets_balance")}
              </p>
            </div>
          ) : (
            <div
              className={Styles.addressBookAddressCard}
              onClick={openAddModal}
              style={{ cursor: "pointer" }}
            >
              <p className={Styles.addressBookHeaderTitleText}>
                {t("payment_methods")}
              </p>
              <button className={Styles.addressBookPlusIconBtn}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}

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
                <p className={Styles.paymentMethodWalletText}>
                  {t("wallets_balance")}
                </p>
              </div>

              <div className={Styles.paymentMethodWalletActionBtn}>
                {user?.userDetails.role == "DELIVERY_BOY" && (
                  <button className={Styles.paymentMethodWithdrawBtn}>
                    {t("withdraw")}
                  </button>
                )}
                {user?.userDetails.role !== "DELIVERY_BOY" && (
                  <button className={Styles.paymentMethodWithdrawBtn}>
                    {t("add_funds")}
                  </button>
                )}
              </div>
            </div>

            {user?.userDetails.role !== "DELIVERY_BOY" && (
              <div>
                <p className={Styles.paymentMethodCardsText}>{t("cards")}</p>

                {/* <div className={Styles.paymentMethodAddedCards}>
                <p className={Styles.paymentmethodUserEmail} style={{textAlign:'center',width:"100%"}}>Data not found.</p>
              </div> */}
                {paymentCard.length > 0 ?
                  (paymentCard?.map((cardInfo, index) => (
                    <div className={Styles.paymentMethodAddedCards}>
                      <img
                        className={Styles.paymentMethodMastercardsLogos}
                        src={MasterCard}
                        alt="card"
                      />
                      <div>
                        
                        <p className={Styles.paymentmethodUserEmail}>
                        **** **** **** {cardInfo?.card.last4}
                        </p>
                      </div>
                      <button className={Styles.paymentMethodEditBtn} onClick={()=>removeCard(cardInfo.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))) : (<>
                    
                      
                      <div className="text-center">
                        
                        <p className={Styles.paymentMethodEditBtn}>
                          Data not found.
                        </p>
                      </div>
                 
                  </>)}
              </div>
            )}
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
