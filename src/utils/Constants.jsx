import moment from "moment";
import { getLocationId, uploadDocumentsApi } from "../data_manager/dataManage";

export const HTTPMethod = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};

export const PORT = {
  qa: "3009",
  uat: "3000",
  prod: "3008",
};
export const MAPS_API_KEY = "AIzaSyC_pj9pk_9fMHL0JDsgstUXlc67nqB97zw";
export const BASE_URL = `http://16.171.224.246:${PORT.qa}/api/`;

export const apiHost = {
  // baseURL: 'http://10.0.2.2:3005/api/',
  // baseURL: "http://www.api.astafa.in/api/",
  // baseURL: "https://api.astafa.in/api/",
  baseURL: "http://16.171.224.246:3000/api/",
  apiKey: "",
};

export const API = {
  loginAuthenticateUrl: BASE_URL + "authuser/login",
  signUpUrl: BASE_URL + "authuser/signup",
  signupVerifyUrl: BASE_URL + "authuser/signupverify",
  forgotPasswordUrl: BASE_URL + "authuser/forgotpassword",
  resetPasswordUrl: BASE_URL + "authuser/resetpassword",
  serviceTypeUrl: BASE_URL + "servicetypes",
  locationIdUrl: BASE_URL + "locations",
  orderPickupUrl: BASE_URL + "order",
  viewOrderListUrl: BASE_URL + "order",
  countryList: BASE_URL + "country",
  stateList: BASE_URL + "state",
  cityList: BASE_URL + "city",
  vehicles: BASE_URL + "vehicles",
  viewDeliveryBoyOrderUrl: BASE_URL + "order/deliveryboy/",
  viewConsumerOrderUrl: BASE_URL + "order/consumer/",
  payment: BASE_URL + "payment",
  documentsUpload: BASE_URL + "documents/upload",
  vehicletypesUrl: BASE_URL + "vehicletypes",
  planningSetupUrl: BASE_URL + "planning",
  updateUserProfile: BASE_URL,
  viewImageUrl: BASE_URL + "documents/view/",
  lookupDataUrl: BASE_URL + "lookup",
  getAllocatedDeliveryBoy: BASE_URL + "order/allocated/details?o=",
  viewOrderDetail: BASE_URL + "order/view/",
  enterprisebranch: BASE_URL + "enterprisebranch/get/",
  enterpriseOrder: BASE_URL + "enterprise/order/",
  getNotificationUrl: BASE_URL + "notification/list/",
  createDeliveryBoyAddressUrl: BASE_URL + "daddressbook/create",
  getDeliveryBoyAddressListUrl: BASE_URL + "daddressbook/list/",
  addressBookUpdateDeliveryBoyUrl: BASE_URL + "daddressbook/update",
  addressBookUpDeleteDeliveryBoyUrl: BASE_URL + "daddressbook/delete/",
  createConsumerAddressUrl: BASE_URL + "caddressbook/create",
  getConsumerAddressListUrl: BASE_URL + "caddressbook/list/",
  // addressBookUpdateConsumerUrl: BASE_URL + "caddressbook/update",
  addressBookUpDeleteConsumerUrl: BASE_URL + "caddressbook/delete/",
  getCompanyListUrl: BASE_URL + "deliveryboy/connections/",
  getDistancePriceListUrl: BASE_URL + "vehicletypes/price/list?d=",
  getFaqListUrl: BASE_URL + "faq",
  enterprisebranchCreate: BASE_URL + "enterprisebranch",
  cancelOrderUrl: BASE_URL + "order/cancel",
  deliveryBoyPlanningSetupDateList: BASE_URL + "order/deliveryboy/plan/list",
  checkPromoCodeUrl: "promocode/check",
  orderRequestActionUrl: BASE_URL + 'order/deliveryboy/request/action',
  changePasswordUrl: BASE_URL + "authuser/changepassword",
  getEnterpriseAddressListUrl: BASE_URL + "enterprise/address/list/",
  createEnterpriseAddressUrl: BASE_URL + "enterprise/address/create",
  addressBookUpdateEnterpriseUrl: BASE_URL + "enterprise/address/update",
  addressBookDeleteEnterpriseUrl: BASE_URL + "enterprise/address/delete/",
  consumerWalletUrl: BASE_URL + "consumer/wallet/balance/",
  enterpriseDashboardUrl: BASE_URL + "enterprise/dashboard/",
  enterpriseOrdersUrl: "/enterprise/order/getbyext/",
  viewEnterpriseOrderDetail: BASE_URL + 'enterprise/order/view/',
  getDeliveryBoyWalletUrl: BASE_URL + 'deliveryboy/wallet/balance/',
  getDeliveryBoyTransactionUrl: BASE_URL + 'deliveryboy/wallet/transaction/',
  orderStatusUpdateUrl: BASE_URL + 'order/update/status',
  consumerPaymentMethodUrl: BASE_URL + 'consumer/paymentmethod',
  consumerBillingDetailsUrl: BASE_URL + 'consumer/billing/address/update',
  getconsumerBillingDetailsUrl: BASE_URL + 'consumer/billing/address/get/',
  enterprisePlanSearch: BASE_URL + 'enterprise/order/plan/search',
  imageViewUrl: BASE_URL + 'documents/view/',
  enterprisePaymentMethod:
    BASE_URL + 'enterprise/paymentmethod/getpaymentcard/',
  verifyOrderOTP: BASE_URL + 'order/otp/verify',
  verifyOrderDeliveryOTP: BASE_URL + 'order/delivered/otp/verify',
  enterprisePaymentMethodUrl: BASE_URL + 'enterprise/paymentmethod',
  searchOrder: BASE_URL + 'enterprise/order/search',
  calendarPlanDate: BASE_URL + 'order/deliveryboy/plan/calendar/data/',
  deleteNotification:BASE_URL + 'notification/',

  notificationCount:BASE_URL + 'notification/count/',

  deliveryBoyBillingAddressUpdate:BASE_URL + 'deliveryboy/billing/address/update/',
  deliveryBoyBillingAddressGet: BASE_URL + 'deliveryboy/billing/address/get/'
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formateDate = `${year}-${month}-${day}`;
  const formateTime = `${hours}:${minutes}`;
  const res = {
    date: formateDate,
    time: formateTime,
  };
  return res;
};

export const uploadImage = async (formData) => {
  return new Promise((resolve, reject) => {
    uploadDocumentsApi(
      formData,
      (successResponse) => {
        resolve(JSON.parse(successResponse).id);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
};

export const extractAddress = (components, type) => {
  const component = components.find((comp) => comp.types.includes(type));
  return component ? component.long_name : "";
};

export const getLocation = (location, lat, long) => {
  let displayName = location.displayedAddress
    ? location.displayedAddress
    : extractAddress(location.components, "subpremise");
  const buildAddress = (...parts) => parts.filter(Boolean).join(",");
  const locationAddress = {
    location_name: buildAddress(
      displayName,
      extractAddress(location.components, "route")
    ),
    address: buildAddress(
      displayName,
      extractAddress(location.components, "route"),
      extractAddress(location.components, "sublocality_level_3"),
      extractAddress(location.components, "sublocality_level_2")
    ),
    city: extractAddress(location.components, "locality"),
    state: extractAddress(location.components, "administrative_area_level_1"),
    country: extractAddress(location.components, "country"),
    postal_code: extractAddress(location.components, "postal_code"),
    latitude: lat,
    longitude: long,
  };
  return locationAddress;
};

export const addLocation = (locationParams) => {
  return new Promise((resolve, reject) => {
    getLocationId(
      locationParams,
      (successResponse) => {
        if (successResponse[0]._success) {
          resolve(successResponse[0]._response.location_id);
        } else {
          reject("false");
        }
      },
      (errorResponse) => {
        let errorMessage = "";
          if (errorResponse.errors && errorResponse.errors.msg) {
            errorMessage = errorResponse.errors.msg[0].msg;
          } else if (errorResponse[0] && errorResponse[0]._errors) {
            errorMessage = errorResponse[0]._errors.message;
          } else {
            errorMessage = "Unknown error occurred.";
          }
          console.error("Error in addLocation:", errorMessage);
          resolve("false");
      }
    );
  });
};



export const buildAddress = (...parts) => parts.filter(Boolean).join(",");

export const localToUTC=(date=new Date(),timezone,format='YYYY-MM-DD HH:mm:ss')=>{
  return moment(date,timezone || Intl.DateTimeFormat().resolvedOptions().timeZone).utc().format(format)
}

export const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) {
    // For short local parts, show fewer characters
    return `${localPart.charAt(0)}***@${domain}`;
  }
  const visiblePart = localPart.substring(0, 3);
  const maskedPart = "*".repeat(localPart.length - 3);
  return `${visiblePart}${maskedPart}@${domain}`;
};


export const titleFormat=(date=new Date())=>{
  return moment(date).format(DATE_FORMAT.titleFormat);
}

export const DATE_FORMAT ={
  titleFormat:'MMM DD, YYYY [at] hh:mm A'
}