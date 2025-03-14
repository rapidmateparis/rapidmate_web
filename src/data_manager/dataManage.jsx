import React from "react";
import {axiosCall} from '../api_manager/ApiManager';
import {API, HTTPMethod} from '../utils/Constants';

export const authenticateUser = (params, successCallback, errorCallback) => {
  axiosCall(
    API.loginAuthenticateUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const signUpUser = (params, successCallback, errorCallback) => {
  axiosCall(
    API.signUpUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const signUpVerifyApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.signupVerifyUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const forgotPasswordApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.forgotPasswordUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const resetPasswordApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.resetPasswordUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getServiceTypeApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.serviceTypeUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocationId = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createPickupOrder = (params, successCallback, errorCallback) => {
  // console.log('createPickupOrder', params, API.orderPickupUrl);
  axiosCall(
    API.orderPickupUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewOrdersList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.viewOrderListUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCountryList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.countryList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getStateList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.stateList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCityList = (params, successCallback, errorCallback) => {
  axiosCall(
    API.cityList,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addVehicleApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.vehicles,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocations = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyViewOrdersList = (
  postParams,
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.viewDeliveryBoyOrderUrl +
      postParams.extentedId +
      '?status=' +
      postParams.status,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerViewOrdersList = (
  postParams,
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.viewConsumerOrderUrl + postParams.extentedId +'?status=' +postParams.status+'&page='+postParams.page+'&size='+postParams.size,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addPayment = (params, successCallback, errorCallback) => {
  // console.log('addPayment', params, API.payment);
  axiosCall(
    API.payment,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const uploadDocumentsApi = (params, successCallback, errorCallback) => {
  const myHeaders = new Headers();
  // myHeaders.append('upload_type', 'ORDER_DOC');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: params,
    redirect: 'follow',
  };

  fetch(API.documentsUpload, requestOptions)
    .then(response => response.text())
    .then(result => successCallback(result))
    .catch(error => errorCallback(error));
};

export const getAllVehicleTypes = (params, successCallback, errorCallback) => {
  axiosCall(
    API.vehicletypesUrl,
    HTTPMethod.GET,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const planningSetupUpdate = (params, successCallback, errorCallback) => {
  axiosCall(
    API.planningSetupUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCurrentPlanningSetup = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.planningSetupUrl +
      `?year=${params.year}&month=${params.month}&week=${params.week}&ext_id=${params.ext_id}`,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateUserProfile = (
  userRole,
  params,
  successCallback,
  errorCallback,
) => {
  let setUrl =
    userRole == 'CONSUMER'
      ? 'consumer'
      : userRole == 'DELIVERY_BOY'
      ? 'deliveryboy'
      : 'enterprise';
  axiosCall(
    API.updateUserProfile + setUrl,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLookupData = (params, successCallback, errorCallback) => {
  axiosCall(
    API.lookupDataUrl,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAllocatedDeliveryBoy = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    params.userRole=='CONSUMER' ? API.getAllocatedDeliveryBoy + params.orderNumber : API.getAllocatedEnterpriseDeliveryBoy + params.orderNumber,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewOrderDetail = (param, successCallback, errorCallback) => {
  axiosCall(
    API.viewOrderDetail + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getLocationById = (params, successCallback, errorCallback) => {
  axiosCall(
    API.locationIdUrl + '/' + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getAVehicleByTypeId = (param, successCallback, errorCallback) => {
  axiosCall(
    API.vehicletypesUrl + '/' + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseBranch = (params, successCallback, errorCallback) => {
  axiosCall(
    API.enterprisebranch + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getNotificationList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getNotificationUrl + param + '?page=1&size=15',
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createEnterpriseOrder = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterpriseOrder,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createDeliveryBoyAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createDeliveryBoyAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createConsumerAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createConsumerAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getDeliveryBoyAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getConsumerAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCompanyList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getCompanyListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDistancePriceList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getDistancePriceListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getFaqsList = (param, successCallback, errorCallback) => {
  axiosCall(
    API.getFaqListUrl,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateAddressBookforConsumer = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpdateConsumerUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforDeliveryBoy = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpDeleteDeliveryBoyUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforConsumer = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpDeleteConsumerUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createEnterpriseBranch = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisebranchCreate,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const cancelOrderConsumer = (params, successCallback, errorCallback) => {
  axiosCall(
    API.cancelOrderUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const downloadInvoiceOrder = (
  params,
  successCallback,
  errorCallback,
) => {
  // console.log('print_data==>', API.orderPickupUrl + '/invoice/' + params);
  axiosCall(
    API.orderPickupUrl + '/invoice/' + params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyListUsingDate = (
  params,
  successCallback,
  errorCallback,
) => {
  // console.log('print_data==>', API.deliveryBoyPlanningSetupDateList, params);
  axiosCall(
    API.deliveryBoyPlanningSetupDateList,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const checkPromoCode = (params, successCallback, errorCallback) => {
  axiosCall(
    API.checkPromoCodeUrl,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderRequestAction = (params, successCallback, errorCallback) => {
  console.log('orderRequestAction==>', API.orderRequestActionUrl, params);
  axiosCall(
    API.orderRequestActionUrl,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};
export const changeUserPassword = (param, successCallback, errorCallback) => {
  axiosCall(
    API.changePasswordUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseAddressBookList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getEnterpriseAddressListUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateAddressBookforDeliveryBoy = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpdateDeliveryBoyUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};
export const createEnterpriseAddressBook = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.createEnterpriseAddressUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};
export const updateAddressBookforEnterprise = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookUpdateEnterpriseUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteAddressBookforEnterprise = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.addressBookDeleteEnterpriseUrl + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const deleteNotificationList = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.deleteNotification + param.id,
    HTTPMethod.DELETE,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerWallet = (param, successCallback, errorCallback) => {
  axiosCall(
    API.consumerWalletUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseDashboardInfo = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterpriseDashboardUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterpriseOrders = (param, successCallback, errorCallback) => {
  var url = API.enterpriseOrdersUrl + param;
  axiosCall(
    url,
    HTTPMethod.GET,
    null,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getViewEnterpriseOrderDetail = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.viewEnterpriseOrderDetail + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyWallet = (param, successCallback, errorCallback) => {
  console.log('url', API.getDeliveryBoyWalletUrl + param);
  axiosCall(
    API.getDeliveryBoyWalletUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyTransactions = (
  param,
  successCallback,
  errorCallback,
) => {
  let tempUrl = API.getDeliveryBoyTransactionUrl + param.extId;
  if (param?.searchText) {
    tempUrl += '?o=' + param.searchText;
  }
  if (param?.durationType) {
    tempUrl += '?durationType=' + param.durationType;
  }
  console.log('url', tempUrl);

  axiosCall(
    tempUrl,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};


//update here 

export const orderStatusUpdate = (param, successCallback, errorCallback) => {
  console.log('url', API.orderStatusUpdateUrl, param);
  axiosCall(
    API.orderStatusUpdateUrl,
    HTTPMethod.PUT,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};



export const addConsumerPaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.consumerPaymentMethodUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerPaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.consumerPaymentMethodUrl +'/'+ param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addConsumerBillingDetails = (
  param,
  successCallback,
  errorCallback,
) => {
  console.log('url', API.consumerBillingDetailsUrl, param);
  axiosCall(
    API.consumerBillingDetailsUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const fetchEnterprisePlans = (param, successCallback, errorCallback) => {
  axiosCall(
    API.enterprisePlanSearch,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getConsumerBillingDetails = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.getconsumerBillingDetailsUrl + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};



export const getConsumerViewOrdersListBySearch = (
  postParams,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url',
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=N&o=${postParams.orderNumber}`,
  );
  axiosCall(
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=N&o=${postParams.orderNumber}`,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyViewOrdersListBySearch = (
  postParams,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url',
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=${postParams.filterCriteria}&o=${postParams.orderNumber}`,
  );
  axiosCall(
    API.viewConsumerOrderUrl +
      `${postParams.extentedId}?status=${postParams.status}&orderType=${postParams.filterCriteria}&o=${postParams.orderNumber}`,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};


export const updateEnterpriseBranch = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log('url', API.enterprisebranchCreate + '/' + params.id);
  axiosCall(
    API.enterprisebranchCreate + '/' + params.id,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getEnterprisePaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisePaymentMethod + param,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateUserProfileEnterprise = (
  params,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.updateUserProfile + 'enterprise',
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderOPTVerify = (params, successCallback, errorCallback) => {
  console.log('url==>orderOPTVerify', API.verifyOrderOTP, params);
  axiosCall(
    API.verifyOrderOTP,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const orderOPTVerifyForDelivery = (
  params,
  successCallback,
  errorCallback,
) => {
  console.log(
    'url==>orderOPTVerifyForDelivery',
    API.verifyOrderDeliveryOTP,
    params,
  );
  axiosCall(
    API.verifyOrderDeliveryOTP,
    HTTPMethod.PUT,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const addEnterprisePaymentMethod = (
  param,
  successCallback,
  errorCallback,
) => {
  axiosCall(
    API.enterprisePaymentMethodUrl,
    HTTPMethod.POST,
    param,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const searchOrderApi = (params, successCallback, errorCallback) => {
  axiosCall(
    API.searchOrder,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getCalendarPlanDate = (params, successCallback, errorCallback) => {
  axiosCall(
    API.calendarPlanDate + params.delivery_boy_ext_id,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const updateDeliveryBoyBillingDetails = (params, successCallback, errorCallback) => {
  console.log(params,API.deliveryBoyBillingAddressUpdate)
  axiosCall(
    API.deliveryBoyBillingAddressUpdate,
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDeliveryBoyBillingDetails = (params, successCallback, errorCallback) => {
  console.log('URL ',API.deliveryBoyBillingAddressGet+params)
  axiosCall(
    API.deliveryBoyBillingAddressGet+params,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getTaxDetails = (params,successCallback, errorCallback) => {
  console.log('URL ',API.vechicleTaxList)
  axiosCall(
    API.vechicleTaxList,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};


export const getMapKey = (params,successCallback, errorCallback) => {
  axiosCall(
    API.getMapKey,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const getDireactionsTimes = (params,successCallback, errorCallback) => {
  axiosCall(
    API.getDirections+`?origin=${params.lat}&destination=${params.lng}&mode=${params.mode}`,
    HTTPMethod.GET,
    {},
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createPaymentCust = (params, successCallback, errorCallback) => {
 const apiBase=API[params.method]
  axiosCall(
    apiBase+'create-customer',
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createPaymentIntent = (params, successCallback, errorCallback) => {
 const apiBase=API[params.method]
  
  axiosCall(
    apiBase+'create-payment-intent',
    HTTPMethod.POST,
    params,
    response => {
      successCallback(response);
    },
    errorResponse => {
      errorCallback(errorResponse);
    },
  );
};

export const createPaymentCard = (params, successCallback, errorCallback) => {
  const apiBase=API[params.method]
   
   axiosCall(
     apiBase+'list-cards/'+params.customerId,
     HTTPMethod.GET,
     null,
     response => {
       successCallback(response);
     },
     errorResponse => {
       errorCallback(errorResponse);
     },
   );
 };

 export const payWithCardList=(params, successCallback, errorCallback) => {
  const apiBase=API[params.method]
   axiosCall(
     apiBase+'pay',
     HTTPMethod.POST,
     params,
     response => {
       successCallback(response);
     },
     errorResponse => {
       errorCallback(errorResponse);
     },
   );
 };

 export const saveCard=(params, successCallback, errorCallback) => {
  const apiBase=API[params.method]
   axiosCall(
     apiBase+'save-card',
     HTTPMethod.POST,
     params,
     response => {
       successCallback(response);
     },
     errorResponse => {
       errorCallback(errorResponse);
     },
   );
 };

 export const removeCard=(params, successCallback, errorCallback) => {
  const apiBase=API[params.method]
   axiosCall(
     apiBase+'remove-card',
     HTTPMethod.POST,
     params,
     response => {
       successCallback(response);
     },
     errorResponse => {
       errorCallback(errorResponse);
     },
   );
 };