import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Styles from "../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPercent,
  faCheck,
  faCircleInfo,
  faClose,
  faCircleCheck,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import MasterCard from "../assets/images/MasterCard-Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import getImage from "../components/consumer/common/GetImage";
import {
  addPayment,
  checkPromoCode,
  createPickupOrder,
  getConsumerPaymentMethod,
} from "../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { addLocation, BASE_URL, localToUTC, uploadImage } from "../utils/Constants";
import PickupAddPaymentMethodsModal from "../components/consumer/account/PickupAddPaymentMethodsModal";
import localforage from "localforage";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
  "pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e"
);

const PaymentPage = ({
  clientSecret,
  totalAmount,
  setTotalAmount,
  paymentAmount,
  setPaymentAmount,
  t,
  getTaxAmount,
  vechicleTax
}) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { order, orderCustomerDetails, dropoffDetail } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [offerDiscount, setOfferDiscount] = useState(order?.paymentDiscount);
  const [promoCodeResponse, setPromoCodeResponse] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [sourceLocationId, setSourceLocationId] = useState("");
  const [destinationLocationId, setDestinationLocationId] = useState("");
  const [packageImageId, setPackageImageId] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentCard, setPaymentCard] = useState(null);
  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Toggle the selected state when the div is clicked
  const handleClick = (paymentcard) => {
    setIsSelected(paymentcard);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    try {
      const pickupLocationParam = order?.addPickupLocation;
      const dropoffLocationParam = order?.addDestinationLocation;
      const pickupLocatiId = await addLocation(pickupLocationParam);
      const dropoffLocatiId = await addLocation(dropoffLocationParam);
      if (pickupLocatiId == "false") {
        showErrorToast("Something went wrong.");
        return true;
      }
      if (dropoffLocatiId == "false") {
        showErrorToast("Something went wrong.");
        return true;
      }
      setSourceLocationId(pickupLocatiId);
      setDestinationLocationId(dropoffLocatiId);
      const passportFormData = new FormData();
      passportFormData.append("file", orderCustomerDetails?.file[0]);
      const passportResponse = await uploadImage(passportFormData);
      setPackageImageId(passportResponse);
    } catch (error) {
      showErrorToast(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callPlaceOrder = async () => {
      await placePickUpOrder();
    };
    if (sourceLocationId && destinationLocationId && packageImageId) {
      callPlaceOrder();
    }
    // callPlaceOrder()
  }, [sourceLocationId, destinationLocationId, packageImageId]);
  const placePickUpOrder = async () => {
    if (user.userDetails) {
      if (order.isSchedule) {
        var scheduleParam = {
          schedule_date_time: localToUTC(order?.date),
        };
      }
      const distance = order?.distance;
      const floatDistance = distance
        ? parseFloat(distance.replace(" km", ""))
        : 0;
      let requestParams = {
        consumer_ext_id: user.userDetails.ext_id,
        service_type_id: order?.isSchedule ? 1 : 2,
        vehicle_type_id: order?.selectedVehicleDetails.id,
        pickup_location_id: sourceLocationId || 1,
        dropoff_location_id: destinationLocationId || 2,
        distance: floatDistance,
        total_amount: parseFloat(paymentAmount),
        discount: offerDiscount,
        pickup_notes: orderCustomerDetails?.pickupNotes || "",
        mobile: orderCustomerDetails?.phoneNumber,
        company_name: orderCustomerDetails?.company || "",

        drop_first_name: dropoffDetail?.first_name || "",
        drop_last_name: dropoffDetail?.last_name || "",
        drop_mobile: dropoffDetail?.phone ? "+" + dropoffDetail.phone : "",
        drop_email: dropoffDetail.email,
        drop_company_name: dropoffDetail?.company || "",
        drop_notes: dropoffDetail?.dropoff_note || "",
        package_photo: packageImageId,
        ...scheduleParam,
        order_date: localToUTC(),
      };

      if (promoCodeResponse) {
        requestParams.promo_code = promoCodeResponse.promoCode;
        requestParams.promo_value = promoCodeResponse.discount;
        requestParams.order_amount = parseFloat(totalAmount);
      }

      setLoading(true);
      createPickupOrder(
        requestParams,
        (successResponse) => {
          if (successResponse[0]._success) {
            setLoading(false);
            setOrderNumber(successResponse[0]._response[0].order_number);
          }
        },
        (errorResponse) => {
          setLoading(false);

          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          showErrorToast(err);
        }
      );
    } else {
      showErrorToast("Consumer extended ID missing");
    }
  };

  const doPayment = async () => {
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name:
              user?.userDetails.first_name + " " + user?.userDetails?.last_name,
            email: user?.userDetails.email || "",
            address: {
              line1: order?.addPickupLocation?.address,
              city: order?.addPickupLocation?.city,
              postal_code: order?.addPickupLocation?.postal_code,
              country: order?.addPickupLocation?.country,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      showErrorToast(error.message);
    }

    if (paymentIntent?.status === "succeeded") {
      setMessage("Payment successful!");
      await createPayment();
    } else {
      showErrorToast(
        `Payment not successful. Current status: ${paymentIntent?.status}`
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    if (orderNumber) {
      doPayment();
    }
  }, [orderNumber]);
  const getPaymentCard = () => {
    getConsumerPaymentMethod(
      user?.userDetails.ext_id,
      (successResponse) => {
        if (successResponse[0]._success) {
         setPaymentCard(successResponse[0]._response);
        }
      },
      (errorResponse) => {
        console.log(errorResponse[0]._errors.message);
      }
    );
  };
  useEffect(() => {
    {
      offerDiscount > 0 &&
        setPaymentAmount(calculateFinalPrice(paymentAmount, offerDiscount));
    }
    
    getPaymentCard();
  }, [user]);

  const handleApplyCoupon = () => {
    let params = {
      promoCode: promoCode,
      orderAmount: paymentAmount,
    };
    checkPromoCode(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const promoResponse = successResponse[0]._response[0];
          setPromoCodeResponse(promoResponse);
          setPaymentAmount(successResponse[0]._response[0].totalAmount);
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
      }
    );
  };
  const calculateFinalPrice = (originalPrice, discountPercentage) => {
    const discount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discount;
    return finalPrice.toFixed(2);
  };

  const createPayment = async () => {
    let requestParams = {
      order_number: orderNumber,
      amount: paymentAmount,
    };
    addPayment(
      requestParams,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          navigate("/payment-successfull", {
            state: {
              orderNumber: orderNumber,
              date:order?.date,
              isSchedule:order?.isSchedule,
            },
          });
        }
      },
      (errorResponse) => {
        let params = {
          order_number: orderNumber,
          status: "Payment Failed",
        };
        showErrorToast("Payment Failed.");
      }
    );
  };

  const pickupLocation =
    order?.addPickupLocation?.address +
    "," +
    order?.addPickupLocation?.city +
    "," +
    order?.addPickupLocation?.state +
    "," +
    order?.addPickupLocation?.country +
    "-" +
    order?.addPickupLocation?.postal_code;
  const dropOffLocation =
    order?.addDestinationLocation?.address +
    "," +
    order?.addDestinationLocation?.city +
    "," +
    order?.addDestinationLocation?.state +
    "," +
    order?.addDestinationLocation?.country +
    "-" +
    order?.addDestinationLocation?.postal_code;
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.addPickupDetailsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.max75}>
                <div>
                  <Link className={Styles.addPickupDetailsBackArrow} href="#">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Link>
                  <h2 className={Styles.addPickupDetailsText}>{t("payment")}</h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    {t("select_payment_method")}
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className={Styles.paymentInvoiceCardMain}>
                      <div className={Styles.paymentInvoiceTruckImageCard}>
                        <img
                          className={Styles.paymentInvoiveTruckIcon}
                          src={getImage(order?.selectedVehicleDetails)}
                          alt="icon"
                        />
                      </div>

                      <p className={Styles.paymentOrderSummaryText}>
                        {t("order_summary")}
                      </p>

                      <div>
                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            {t("pickup")}
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {pickupLocation?.length <= 27
                              ? pickupLocation
                              : `${pickupLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            {t("dropoff")}
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {dropOffLocation?.length <= 27
                              ? dropOffLocation
                              : `${dropOffLocation.substring(0, 27)}...`}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            {t("vehicle_type")}
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.selectedVehicleDetails?.vehicle_type}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            {t("distance")}
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.distance}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            {t("time")}
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.duration}
                          </p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                          {t("estimated_cost")}
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>
                            € {totalAmount || 0.0}
                          </p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            {t("tax")} {vechicleTax}%
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>
                            € {getTaxAmount() || 0.0}
                          </p>
                        </div>

                        {/* <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            {t("discount")}
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>
                            € {paymentAmount || 0.0}
                          </p>
                        </div> */}

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            {t("total_amount")}
                          </p>
                          <p className={Styles.paymentTotalAmounttext}>
                            € {paymentAmount || 0.0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={Styles.promoCodeCardPayments}>
                        <FontAwesomeIcon
                          className={Styles.paymentPromoCodeIcon}
                          icon={faPercent}
                        />
                        <Form.Control
                          className={Styles.promoCodeInputPayment}
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          disabled={promoCodeResponse ? true : false}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        {promoCodeResponse ? (
                          <button
                            className={Styles.paymentApplyCouponBtn}
                            onClick={() => {
                              setPromoCodeResponse(null);
                              setPaymentAmount(totalAmount);
                            }}
                          >
                            <FontAwesomeIcon icon={faClose} />
                          </button>
                        ) : (
                          <button
                            className={Styles.paymentApplyCouponBtn}
                            onClick={handleApplyCoupon}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        )}
                      </div>
                      <p className={Styles.paymentDebitCreditCardsText}>
                        {t("credit_debit_cards")}
                      </p>

                      <div className={Styles.paymentAllCardsDataShow}>
                        {paymentCard && paymentCard?.map((cardInfo, index) => (
                          <div onClick={()=>handleClick(cardInfo)} key={index}>
                            <div className={Styles.paymentMethodAddedCards}>
                              <img
                                className={Styles.paymentMethodMastercardsLogos}
                                src={MasterCard}
                                alt="card"
                              />
                              <div>
                                <p className={Styles.paymentMethodCardName}>
                                  {cardInfo?.card_holder_name}
                                </p>
                                <p className={Styles.paymentmethodUserEmail}>
                                  {cardInfo.card_number?.replace(/\d(?=\d{4})/g, "*")}
                                </p>
                              </div>
                              <button className={Styles.paymentMethodEditBtn}>
                                <FontAwesomeIcon
                                  icon={isSelected.id==cardInfo.id ? faCircleCheck : faCircle}
                                />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div>
                          <div className={Styles.paymentAddCardMain } >
                            <div
                              onClick={openAddModal}
                              className={`${Styles.paymentAddCardBtn}`}
                              style={{cursor:"pointer"}}
                            >
                              
                              <p className={`${Styles.paymentAddCardText} p-2`}>
                              <FontAwesomeIcon icon={faCirclePlus} /> {t("add_new_card")}
                              </p>
                            </div>
                            
                          </div>
                        </div>
                      </div>

                      <div className={Styles.paymentsOffCreaditCardInfo}>
                        <FontAwesomeIcon
                          className={Styles.paymentsCardsInfoCircle}
                          icon={faCircleInfo}
                        />
                        <p className={Styles.paymentCreditCardOfferText}>
                          20% {t("city_bank_offer")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                      <PaymentElement />
                      <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`${Styles.addPickupDetailsNextBtn} m-2`}
                      >
                        {loading ? t("processing") : t("pay_now")}
                      </button>
                    </form>
                    {message && <p>{showSuccessToast(message)}</p>}
                  </div>
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <button className={Styles.addPickupDetailsCancelBTn} onClick={()=>navigate('/consumer/dashboard')}>
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PickupAddPaymentMethodsModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        getPaymentCard={()=>getPaymentCard()}
      />
      <ToastContainer />
    </>
  );
};

function PaymentView() {
  const {t}=useTranslation()
  const user = useSelector((state) => state.auth.user);
  const [clientSecret, setClientSecret] = useState("");
  const { order } = useLocation().state || {};
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const navigate = useNavigate();
  const [vechicleTax, setVechicleTax] = useState(20);
  const getTaxAmount = () => {
    const amount =
      typeof order.selectedVehiclePrice === "number"
      ? order.selectedVehiclePrice.toFixed(2)
      : parseFloat(order.selectedVehiclePrice).toFixed(2);
    const taxAmount = (parseFloat(amount) * parseFloat(vechicleTax)) / 100;
    return taxAmount ? taxAmount.toFixed(2) : 0;

  };
  useEffect(() => {
    if (order?.selectedVehiclePrice) {
      const calculatedTotalAmount =
        typeof order.selectedVehiclePrice === "number"
          ? order.selectedVehiclePrice.toFixed(2)
          : parseFloat(order.selectedVehiclePrice).toFixed(2);
          const taxAmount = (parseFloat(calculatedTotalAmount) * parseFloat(vechicleTax)) / 100;
          const total_Amount = parseFloat(calculatedTotalAmount) + taxAmount;
          if(total_Amount){
            setTotalAmount(total_Amount);
            setPaymentAmount(total_Amount);
          }
    }
    setTimeout(() => {
      if (!order) {
        navigate("/consumer/dashboard");
      }
    }, 2000);
  }, [order]);

  useEffect(() => {
    if (paymentAmount > 0) {
      const createPaymentIntent = async () => {
        const token = await localforage.getItem('1');
        try {
          const response = await fetch(
            `${BASE_URL}payment/create-payment-intent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json",'Authorization': token },
              body: JSON.stringify({
                amount: paymentAmount, // Convert to cents for Stripe
                currency: "eur",
              }),
            }
          );

          const data = await response.json();

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Failed to fetch client secret:", data);
          }
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      };

      createPaymentIntent();
    }
  }, [paymentAmount]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
    defaultValues: { billingDetails: { address: { country: "FR" } } },
  };

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentPage
            clientSecret={clientSecret}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            paymentAmount={paymentAmount}
            setPaymentAmount={setPaymentAmount}
            t={t}
            getTaxAmount={getTaxAmount}
            vechicleTax={vechicleTax}
          />
        </Elements>
      ) : (
        <>
          <CommonHeader userData={user} />
          <p>Loading...</p>
        </>
      )}
      
    </div>
  );
}

export default PaymentView;
