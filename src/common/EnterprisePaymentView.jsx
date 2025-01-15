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
  createEnterpriseOrder,
  createPickupOrder,
  getEnterprisePaymentMethod,
} from "../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import {
  addLocation,
  BASE_URL,
  buildAddress,
  getLocation,
  localToUTC,
  uploadImage,
} from "../utils/Constants";
import PickupAddPaymentMethodsModal from "../components/consumer/account/PickupAddPaymentMethodsModal";
import moment from "moment";

const stripePromise = loadStripe(
  "pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e"
);

const PaymentPage = ({
  clientSecret,
  totalAmount,
  setTotalAmount,
  paymentAmount,
  setPaymentAmount,
}) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const { order, orderCustomerDetails } = location.state || {};

 
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
  const [paymentCard, setPaymentCard] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const openAddModal = () => {
    setShowAddModal(true);
  };
 
  // Toggle the selected state when the div is clicked
  const handleClick = (paymentcard) => {
     setIsSelected(paymentcard);
    
  };
  // console.log("order", order);
  // console.log("ordercus", orderCustomerDetails);

  const getOrderAddress = (serviceTypeId, order) => {
    if (serviceTypeId == 2) {
      return buildAddress(
        order?.selectedBranch.address,
        order?.selectedBranch.city,
        order?.selectedBranch.state,
        order?.selectedBranch.country,
        order?.selectedBranch.postal_code
      );
    } else {
      return (
        order?.addPickupLocation?.address +
        "," +
        order?.addPickupLocation?.city +
        "," +
        order?.addPickupLocation?.state +
        "," +
        order?.addPickupLocation?.country +
        "-" +
        order?.addPickupLocation?.postal_code
      );
    }
  };
  const getDropoffLocation = (location) => {
    const result = getLocation(location, location.lat, location.lng);
    return buildAddress(
      result.address,
      result.city,
      result.state,
      result.country,
      result.postal_code
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (order?.deliveryType.id == 2) {
      showErrorToast(
        "Multiple deliveries not available service for this moment."
      );
      return;
    }
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
    if (!user?.userDetails) {
      showErrorToast("Consumer extended ID missing");
      return;
    }

    const distance = order?.distance;
    const floatDistance = distance
      ? parseFloat(distance.replace(" km", ""))
      : 0;
    const isInstantDate=orderCustomerDetails?.isSchedule
    let requestParams = {
      enterprise_ext_id: user.userDetails.ext_id,
      branch_id: order?.selectedBranch?.id,
      delivery_type_id: order?.deliveryType?.id,
      service_type_id: order?.selectedServiceType,
      vehicle_type_id: order?.selectedVehicleDetails?.id,
      pickup_date: localToUTC(orderCustomerDetails?.pickupDate),
      order_date: isInstantDate ? moment(orderCustomerDetails?.pickupDate).format('YYYY-MM-DD hh:mm'):'',
      pickup_time: isInstantDate ? moment(orderCustomerDetails?.pickupDate).format('hh:mm') : orderCustomerDetails?.pickupTime,
      pickup_location_id: sourceLocationId,
      dropoff_location_id: destinationLocationId,
      is_repeat_mode: orderCustomerDetails?.repeatOrder ? 1 : 0,
      repeat_mode: orderCustomerDetails?.selectCheckOption || "",
      repeat_every: orderCustomerDetails?.repeatEvery,
      repeat_until: localToUTC(orderCustomerDetails?.until),
      repeat_day:orderCustomerDetails?.days || "",
      package_photo: packageImageId,
      package_id: orderCustomerDetails?.packageId,
      distance: floatDistance,
      total_amount: parseFloat(paymentAmount),
      pickup_notes: orderCustomerDetails?.pickupnote,
      is_scheduled_order: orderCustomerDetails?.isSchedule ? 1 : 0,

      drop_first_name: orderCustomerDetails?.dname,
      drop_last_name: orderCustomerDetails?.dlastname,
      drop_mobile: orderCustomerDetails?.dphoneNumber,
      drop_notes: orderCustomerDetails?.dropoffnote,
      drop_email: orderCustomerDetails?.demail,
      drop_company_name: orderCustomerDetails?.dcompany
    };

    if(orderCustomerDetails?.isSchedule==false){
      requestParams.schedule_date_time=moment(orderCustomerDetails?.pickupDate).format('YYYY-MM-DD') + ' ' + orderCustomerDetails?.pickupTime
    }

    if (promoCodeResponse) {
      requestParams.promo_code = promoCodeResponse.promoCode;
      requestParams.promo_value = promoCodeResponse.discount;
      requestParams.order_amount = parseFloat(totalAmount);
    }
    // console.log(requestParams)
    try {
      setLoading(true);

      createEnterpriseOrder(
        requestParams,
        (successResponse) => {
          setLoading(false);

          if (successResponse[0]?._success) {
            // console.log("createEnterpriseOrder", successResponse[0]._response);
            setOrderNumber(successResponse[0]._response[0]?.order_number);
          } else {
            showErrorToast("Order creation failed. Please try again.");
          }
        },
        (errorResponse) => {
          setLoading(false);

          const err =
            errorResponse?.errors?.msg?.[0]?.msg ||
            errorResponse[0]?._errors?.message ||
            "An error occurred";
          showErrorToast(err);
        }
      );
    } catch (error) {
      setLoading(false);
      console.error("Error placing order:", error);
      showErrorToast("An unexpected error occurred. Please try again.");
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
    getEnterprisePaymentMethod(
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
  }, []);

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
              date:orderCustomerDetails?.pickupDate,
              isSchedule:orderCustomerDetails?.isSchedule ? false : true,
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

  const pickupLocation = buildAddress(
    order?.addPickupLocation?.address,
    order?.addPickupLocation?.city,
    order?.addPickupLocation?.state,
    order?.addPickupLocation?.country,
    order?.addPickupLocation?.postal_code
  );
  const dropOffLocation = buildAddress(
    order?.addDestinationLocation?.address,
    order?.addDestinationLocation?.city,
    order?.addDestinationLocation?.state,
    order?.addDestinationLocation?.country,
    order?.addDestinationLocation?.postal_code
  );

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
                  <h2 className={Styles.addPickupDetailsText}>Payment</h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    Please select a payment method
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
                        Order Summary
                      </p>

                      <div>
                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Pickup
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {getOrderAddress(order?.deliveryType?.id, order)
                              ?.length <= 27
                              ? getOrderAddress(order?.deliveryType?.id, order)
                              : `${getOrderAddress(
                                  order?.deliveryType?.id,
                                  order
                                ).substring(0, 27)}...`}
                          </p>
                        </div>
                        {order?.deliveryType?.id === 2 ? (
                          order?.dropoffLocation?.map((location, index) => (
                            <div className={Styles.paymentInvoiceDetailsText}>
                              <p className={Styles.paymentAddressDetailText}>
                                Drop-off
                              </p>
                              <p className={Styles.paymentMainDetailsText}>
                                {getDropoffLocation(location)?.length <= 27
                                  ? getDropoffLocation(location)
                                  : `${getDropoffLocation(location).substring(
                                      0,
                                      27
                                    )}...`}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className={Styles.paymentInvoiceDetailsText}>
                            <p className={Styles.paymentAddressDetailText}>
                              Drop-off
                            </p>
                            <p className={Styles.paymentMainDetailsText}>
                              {dropOffLocation?.length <= 27
                                ? dropOffLocation
                                : `${dropOffLocation.substring(0, 27)}...`}
                            </p>
                          </div>
                        )}

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Vehicle type
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.selectedVehicleDetails?.vehicle_type}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Distance
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.distance}
                          </p>
                        </div>

                        <div className={Styles.paymentInvoiceDetailsText}>
                          <p className={Styles.paymentAddressDetailText}>
                            Time
                          </p>
                          <p className={Styles.paymentMainDetailsText}>
                            {order?.duration}
                          </p>
                        </div>

                        <div className={Styles.paymentTotalAmountCard}>
                          <p className={Styles.paymentTotalAmounttext}>
                            Total amount
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
                        Credit & Debit Cards
                      </p>

                      {paymentCard?.map((cardInfo, index) => (
                        <div onClick={() => handleClick(cardInfo)} key={index}>
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
                                {cardInfo.card_number?.replace(
                                  /\d(?=\d{4})/g,
                                  "*"
                                )}
                              </p>
                            </div>
                            <button className={Styles.paymentMethodEditBtn}>
                              <FontAwesomeIcon
                                icon={
                                  isSelected.id == cardInfo.id
                                    ? faCircleCheck
                                    : faCircle
                                }
                              />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className={Styles.paymentsOffCreaditCardInfo}>
                        <FontAwesomeIcon
                          className={Styles.paymentsCardsInfoCircle}
                          icon={faCircleInfo}
                        />
                        <p className={Styles.paymentCreditCardOfferText}>
                          20% off on city bank credit card!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* <div className={Styles.addPickupDetailsBtnCard}> */}
                    <form onSubmit={handleSubmit}>
                      <PaymentElement />
                      <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`${Styles.addPickupDetailsNextBtn} m-2`}
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </button>
                    </form>
                    {message && <p>{showSuccessToast(message)}</p>}
                    {/* </div> */}
                  </div>
                  <div className={`${Styles.addPickupDetailsBtnCard} mt-3`}>
                    <button className={Styles.addPickupDetailsCancelBTn}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PickupAddPaymentMethodsModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </>
  );
};

function EnterprisePaymentView() {
  const user = useSelector((state) => state.auth.user);

  const [clientSecret, setClientSecret] = useState("");
  const { order } = useLocation().state || {};
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (order?.selectedVehiclePrice) {
      const calculatedTotalAmount =
        typeof order.selectedVehiclePrice === "number"
          ? order.selectedVehiclePrice.toFixed(2)
          : parseFloat(order.selectedVehiclePrice).toFixed(2);

      setTotalAmount(calculatedTotalAmount);
      setPaymentAmount(calculatedTotalAmount);
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
        try {
          const response = await fetch(
            `${BASE_URL}payment/create-payment-intent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
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
          />
        </Elements>
      ) : (
        <>
          <CommonHeader userData={user} />
          <p>Loading...</p>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default EnterprisePaymentView;
