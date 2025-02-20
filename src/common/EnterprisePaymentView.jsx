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
  convertDurationToMinutes,
  getFileName,
  getLocation,
  localToUTC,
  uploadImage,
} from "../utils/Constants";
import PickupAddPaymentMethodsModal from "../components/consumer/account/PickupAddPaymentMethodsModal";
import moment from "moment";
import localforage from "localforage";
import { useTranslation } from "react-i18next";
import {
  createPaymentCustomer,
  createPaymentInt,
  paymentCardList,
  paymentCardSave,
  payWithSaveCard,
} from "../utils/UseFetch";

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
  vechicleTax,
  customerId,
  paymentMethod,
}) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { order, orderCustomerDetails } = location.state || {};

  // console.log("orderCustomerDetails",orderCustomerDetails)
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
  const [selectOptionCard, setSelectOptionCard] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPayLater, setIsPayLater] = useState(0);
  const [branches, setBranches] = useState(null);
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [saveForLater, setSaveForLater] = useState(false);
  useEffect(() => {
    if (message) {
      showSuccessToast(message);
    }
  }, [message]);
  // Toggle the selected state when the div is clicked
  const handleClick = (paymentId) => {
    if (isSelected) {
      setSelectOptionCard("");
      setSelectedCard("");
    } else {
      setSelectOptionCard(paymentId);
      setSelectedCard(paymentId);
    }
    setIsSelected(!isSelected);
  };
  useEffect(() => {
    const getPaymentCardList = async () => {
      const params = {
        method: paymentMethod,
        customerId,
      };

      const paymentcard = await paymentCardList(params);
      setSavedCards(paymentcard);
    };
    if (customerId) {
      getPaymentCardList();
    }
  }, [customerId]);

  const getOrderAddress = (serviceTypeId, order) => {
    if (serviceTypeId == 2) {
      const location = order?.pickupLoc;
      const result = getLocation(location, location.lat, location.lng);
      return buildAddress(
        result.address,
        result.city,
        result.state,
        result.country,
        result.postal_code
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
  const getDropoffLocation = (location, isShow) => {
    const result = getLocation(location, location.lat, location.lng);
    if (isShow) {
      return result;
    }
    return buildAddress(
      result.address,
      result.city,
      result.state,
      result.country,
      result.postal_code
    );
  };
  const formatDropoffLocations = async (dropoffLoc) => {
    return await Promise.all(
      dropoffLoc.map(async (dropoff, index) => ({
        branch_id: order?.selectedBranch?.id, // Assigning a unique branch_id
        total_hours: convertDurationToMinutes(
          order?.distances?.[index]?.duration || order?.duration
        ),
        distance:
          order?.distances?.[index]?.distance.replace(" km", "") ||
          order?.distance,
        to_latitude: dropoff.lat,
        to_longitude: dropoff.lng,
        amount: order?.selectedVehiclePrice,
        dropoff_location: await addLocation(getDropoffLocation(dropoff, true)),
        delivery_date: moment(orderCustomerDetails?.pickupDate).format(
          "YYYY-MM-DD hh:mm"
        ),
        drop_first_name: getFileName(orderCustomerDetails, "dname", index),
        drop_last_name: getFileName(orderCustomerDetails, "dlastname", index),
        drop_mobile: getFileName(orderCustomerDetails, "dphoneNumber", index),
        drop_notes: getFileName(orderCustomerDetails, "dropoffnote", index),
        drop_email: getFileName(orderCustomerDetails, "demail", index),
        drop_company_name: getFileName(orderCustomerDetails, "dcompany", index),
        destinationDescription: getDropoffLocation(dropoff, false),
      }))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    try {
      let pickupLocationParam = "";
      let dropoffLocationParam = "";
      let pickupLocatiId = "false";
      let dropoffLocatiId = "false";
      if (order?.deliveryType.id == 2) {
        pickupLocationParam = getDropoffLocation(order?.pickupLoc, true);
        dropoffLocationParam = order?.addDestinationLocation;
        pickupLocatiId = await addLocation(pickupLocationParam);

        if (pickupLocatiId == "false") {
          showErrorToast("Something went wrong.");
          return true;
        }
        const getBranchesList = await formatDropoffLocations(order?.dropoffLoc);
        setBranches(getBranchesList);
        setSourceLocationId(pickupLocatiId);
        const passportFormData = new FormData();
        passportFormData.append(
          "file",
          getFileName(orderCustomerDetails, "file", 0)[0]
        );
        const passportResponse = await uploadImage(passportFormData);
        setPackageImageId(passportResponse);
      } else {
        pickupLocationParam = order?.addPickupLocation;
        dropoffLocationParam = order?.addDestinationLocation;
        pickupLocatiId = await addLocation(pickupLocationParam);
        dropoffLocatiId = await addLocation(dropoffLocationParam);

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
      }
    } catch (error) {
      showErrorToast(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isPaylaterFun = async () => {
    setLoading(true);
    setIsPayLater(1);
    try {
      let pickupLocationParam = "";
      let dropoffLocationParam = "";
      let pickupLocatiId = "false";
      let dropoffLocatiId = "false";
      if (order?.deliveryType.id == 2) {
        pickupLocationParam = getDropoffLocation(order?.pickupLoc, true);
        dropoffLocationParam = order?.addDestinationLocation;
        pickupLocatiId = await addLocation(pickupLocationParam);

        if (pickupLocatiId == "false") {
          showErrorToast("Something went wrong.");
          return true;
        }
        const getBranchesList = await formatDropoffLocations(order?.dropoffLoc);
        setBranches(getBranchesList);
        setSourceLocationId(pickupLocatiId);
        const passportFormData = new FormData();
        passportFormData.append(
          "file",
          getFileName(orderCustomerDetails, "file", 0)[0]
        );
        const passportResponse = await uploadImage(passportFormData);
        setPackageImageId(passportResponse);
      } else {
        pickupLocationParam = order?.addPickupLocation;
        dropoffLocationParam = order?.addDestinationLocation;
        pickupLocatiId = await addLocation(pickupLocationParam);
        dropoffLocatiId = await addLocation(dropoffLocationParam);

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
      }
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
    if (sourceLocationId && packageImageId) {
      callPlaceOrder();
    }
    // callPlaceOrder()
  }, [sourceLocationId, packageImageId]);
  const placePickUpOrder = async () => {
    if (!user?.userDetails) {
      showErrorToast("Consumer extended ID missing");
      return;
    }

    const distance = order?.distance;
    const floatDistance = distance
      ? parseFloat(distance.replace(" km", ""))
      : 0;
    const isInstantDate =
      order?.deliveryType.id === 2
        ? order?.isSchedule
        : orderCustomerDetails?.isSchedule;
    const isMultiple = order?.deliveryType.id;
    let requestParams = {
      enterprise_ext_id: user.userDetails.ext_id,
      branch_id: order?.selectedBranch?.id,
      delivery_type_id: order?.deliveryType?.id,
      service_type_id: order?.selectedServiceType,
      vehicle_type_id: order?.selectedVehicleDetails?.id,
      pickup_date: localToUTC(orderCustomerDetails?.pickupDate),
      order_date: isInstantDate
        ? moment(orderCustomerDetails?.pickupDate).format("YYYY-MM-DD hh:mm")
        : "",
      pickup_time: isInstantDate
        ? moment(orderCustomerDetails?.pickupDate).format("hh:mm")
        : orderCustomerDetails?.pickupTime,
      pickup_location_id: sourceLocationId,
      dropoff_location_id: destinationLocationId,
      is_repeat_mode: orderCustomerDetails?.repeatOrder ? 1 : 0,
      repeat_mode: orderCustomerDetails?.selectCheckOption || "",
      repeat_every: orderCustomerDetails?.repeatEvery,
      repeat_until: localToUTC(orderCustomerDetails?.until),
      repeat_day: orderCustomerDetails?.days || "",
      package_photo: packageImageId,
      package_id:
        isMultiple === 2
          ? getFileName(orderCustomerDetails, "packageId", 0)
          : orderCustomerDetails?.packageId,
      distance: floatDistance,
      total_amount: parseFloat(paymentAmount),
      pickup_notes: orderCustomerDetails?.pickupnote,
      is_scheduled_order: orderCustomerDetails?.isSchedule ? 0 : 1,
      drop_first_name: orderCustomerDetails?.dname,
      drop_last_name: orderCustomerDetails?.dlastname,
      drop_mobile: orderCustomerDetails?.dphoneNumber,
      drop_notes: orderCustomerDetails?.dropoffnote,
      drop_email: orderCustomerDetails?.demail,
      drop_company_name: orderCustomerDetails?.dcompany,
    };

    if (orderCustomerDetails?.isSchedule == false) {
      requestParams.schedule_date_time =
        moment(orderCustomerDetails?.pickupDate).format("YYYY-MM-DD") +
        " " +
        orderCustomerDetails?.pickupTime;
    }

    if (promoCodeResponse) {
      requestParams.promo_code = promoCodeResponse.promoCode;
      requestParams.promo_value = promoCodeResponse.discount;
      requestParams.order_amount = parseFloat(totalAmount);
    }
    if (isPayLater) {
      requestParams.is_pay_later = isPayLater;
    }
    if (isMultiple === 2) {
      requestParams.branches = branches;
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
    setMessage("");

    if (selectedCard) {
      // 🔹 Pay with saved card
      const params = {
        amount: paymentAmount.toFixed(2),
        customerId,
        paymentMethodId: selectedCard,
        method: paymentMethod,
      };

      const res = await payWithSaveCard(params);
      setMessage(
        res?.paymentIntent?.status == "succeeded"
          ? "Payment successful!"
          : "Payment failed."
      );

      await createPayment();
    } else {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name:
                user?.userDetails.first_name +
                " " +
                user?.userDetails?.last_name,
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
        if (saveForLater && customerId) {
          const params = {
            customerId,
            paymentMethodId: paymentIntent.payment_method,
            method: paymentMethod,
          };
          const response = await paymentCardSave(params);
          await createPayment();
        }else{
          await createPayment();
        }
        
      } else {
        showErrorToast(
          `Payment not successful. Current status: ${paymentIntent?.status}`
        );
      }
    }
  };

  useEffect(() => {
    if (orderNumber) {
      if (!isPayLater) {
        doPayment();
      } else {
        OnlyForPayLater();
      }
      //
    }
  }, [orderNumber]);
  const OnlyForPayLater = () => {
    if (isPayLater) {
      navigate("/payment-successfull", {
        state: {
          orderNumber: orderNumber,
          date: orderCustomerDetails?.pickupDate,
          isSchedule: orderCustomerDetails?.isSchedule ? false : true,
        },
      });
    }
  };

  useEffect(() => {
    {
      offerDiscount > 0 &&
        setPaymentAmount(calculateFinalPrice(paymentAmount, offerDiscount));
    }
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
      amount: paymentAmount.toFixed(2),
    };
    addPayment(
      requestParams,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          navigate("/payment-successfull", {
            state: {
              orderNumber: orderNumber,
              date: orderCustomerDetails?.pickupDate,
              isSchedule: orderCustomerDetails?.isSchedule ? false : true,
            },
          });
        }
      },
      (errorResponse) => {
        let params = {
          order_number: orderNumber,
          status: "Payment Failed",
        };
        setLoading(false);

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
                  <h2 className={Styles.addPickupDetailsText}>
                    {t("payment")}
                  </h2>
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
                          order?.dropoffLoc?.map((location, index) => (
                            <div className={Styles.paymentInvoiceDetailsText}>
                              <p className={Styles.paymentAddressDetailText}>
                                {t("dropoff")} {index + 1}
                              </p>
                              <p className={Styles.paymentMainDetailsText}>
                                {getDropoffLocation(location, false)?.length <=
                                27
                                  ? getDropoffLocation(location, false)
                                  : `${getDropoffLocation(
                                      location,
                                      false
                                    ).substring(0, 27)}...`}
                              </p>
                            </div>
                          ))
                        ) : (
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
                        )}

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
                            € {totalAmount?.toFixed(2) || 0.0}
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
                            € {paymentAmount?.toFixed(2) || 0.0}
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
                    {/* <div className={Styles.addPickupDetailsBtnCard}> */}
                    {savedCards.length > 0 &&
                      savedCards?.map((cardInfo, index) => (
                        <div
                          onClick={() => handleClick(cardInfo.id)}
                          key={index}
                        >
                          <div className={Styles.paymentMethodAddedCards}>
                            <img
                              className={Styles.paymentMethodMastercardsLogos}
                              src={MasterCard}
                              alt="card"
                            />
                            <div>
                              <p className={Styles.paymentmethodUserEmail}>
                                {cardInfo.card.last4}
                              </p>
                            </div>
                            <button className={Styles.paymentMethodEditBtn}>
                              <FontAwesomeIcon
                                icon={
                                  selectOptionCard == cardInfo.id
                                    ? faCircleCheck
                                    : faCircle
                                }
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    <form onSubmit={handleSubmit}>
                      {!selectedCard && (
                        <>
                          <PaymentElement />
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={saveForLater}
                              onChange={() => setSaveForLater(!saveForLater)}
                              style={{ marginRight: "8px" }}
                            />
                            Save for future payments
                          </label>
                        </>
                      )}
                      <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`${Styles.addPickupDetailsNextBtn} m-2`}
                      >
                        {loading ? t("processing") : t("pay_now")}
                      </button>
                    </form>
                    {user?.userDetails?.is_pay_later == 1 && !selectedCard && (
                      <div
                        onClick={isPaylaterFun}
                        disabled={loading}
                        className={`${Styles.addPickupDetailsNextBtn} m-2`}
                        style={{ cursor: "pointer" }}
                      >
                        {loading ? t("processing") : t("pay_later")}
                      </div>
                    )}

                    {/* </div> */}
                  </div>
                  <div className={`${Styles.addPickupDetailsBtnCard} mt-3`}>
                    <button className={Styles.addPickupDetailsCancelBTn}>
                      {t("cancel")}
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
  const { t } = useTranslation();

  const [clientSecret, setClientSecret] = useState("");
  const { order } = useLocation().state || {};
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [vechicleTax, setVechicleTax] = useState(20);

  const [customerId, setCustomerId] = useState("");
  const [tokens, setTokens] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const navigate = useNavigate();
  const getTaxAmount = () => {
    const amount =
      typeof order.selectedVehiclePrice === "number"
        ? order.selectedVehiclePrice.toFixed(2)
        : parseFloat(order.selectedVehiclePrice).toFixed(2);
    const taxAmount = (parseFloat(amount) * parseFloat(vechicleTax)) / 100;
    return taxAmount ? taxAmount.toFixed(2) : 0;
  };
  useEffect(() => {
    const getCustomerId = async () => {
      const params = {
        email: user?.userInfo.username,
        role: user?.userDetails.role,
        method: paymentMethod,
      };
      const dataRes = await createPaymentCustomer(params);
      setCustomerId(dataRes?.customer?.id);
    };
    getCustomerId();
  }, []);
  useEffect(() => {
    if (order?.selectedVehiclePrice) {
      const calculatedTotalAmount =
        typeof order.selectedVehiclePrice === "number"
          ? order.selectedVehiclePrice.toFixed(2)
          : parseFloat(order.selectedVehiclePrice).toFixed(2);
      const taxAmount =
        (parseFloat(calculatedTotalAmount) * parseFloat(vechicleTax)) / 100;
      const total_Amount = parseFloat(calculatedTotalAmount) + taxAmount;
      if (total_Amount) {
        setTotalAmount(total_Amount);
        setPaymentAmount(total_Amount);
      }
    }
    setTimeout(() => {
      if (!order) {
        navigate("/enterprise/dashboard");
      }
    }, 2000);
  }, [order]);

  useEffect(() => {
    if (paymentAmount > 0 && customerId) {
      const createPaymentIntent = async () => {
        const token = await localforage.getItem("1");
        try {
          const params = {
            amount: paymentAmount,
            currency: "eur",
            customerId,
            method: paymentMethod,
          };
          const paymentInt = await createPaymentInt(params);
          if (paymentInt.clientSecret) {
            setClientSecret(paymentInt.clientSecret);
            setTokens(token);
          }
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      };

      createPaymentIntent();
    }
  }, [customerId]);

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
            customerId={customerId}
            paymentMethod={paymentMethod}
          />
        </Elements>
      ) : (
        <>
          <CommonHeader userData={user} />
          <p>{t("loading")}</p>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default EnterprisePaymentView;
