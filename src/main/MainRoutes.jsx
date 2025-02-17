import React from "react";
import {
  Login,
  ProfileChoose,
  DeliveryboySignup,
  EnterpriseSignup,
  PickupSignup,
  CommonDashboard,
  SingupVerify,
  EnterprisePlanning,
  EnterprisesNewSchedule,
  AddPickupDetails,
  OrderView,
  PaymentView,
  AddVehicle,
  AddWorkType,
  PastOrder,
  OrderDetail,
  ConsumerSetting,
  PickupAddressBook,
  PickupNotificationSettings,
  PickupPaymentMethods,
  PickupChangePassword,
  EnterpriseAddPickupDetails,
  EnterpriseAddDropoffDetails,
  EnterpriseOrderPreview,
  MultipleDelivery,
  EnterpriseScheduleApproved,
  EnterpriseMultipleDeliverySelectLocation,
  EnterpriseMultipleDeliveriesSelectService,
  DeliveryboyProfile,
  ManageCompanyLocation,
  SelectBranch,
  EnterprisePaymentView,
  AllCompanyLocations,
  NotificationLists,
  ProfileUpdate,
  PaymentSuccessful,
  PaymentUnsuccessful,
  DriverNotAvailable,
  EnterpriseShiftDetails,
  ScheduleSuccess,
  LanguageSwitcher,
  WebHome,
  WebRestaurants,
  WebGrocery,
  WebPharmacyMeds,
  WebGifts,
  WebECommerce,
  WebMore,
  WebIndividuals,
  WebBecomeCourier,
  WebAboutUs,
  WebPrivacyPolicy,
  WebTermsOfService,
} from "../common/pages";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import { useSelector } from "react-redux";
import ThankPage from "../common/ThankPage";
import RequestPending from "../common/RequestPending";
import SearchDriver from "../common/SearchDriver";
import LiveTracking from "../common/LiveTracking";
import OneTimeDelivery from "../components/enterprise/OneTimeDelivery";
import Order from "../components/enterprise/Order";
import EnterpriseCreateShiftSelectServiceType from "../components/enterprise/EnterpriseCreateShiftSelectServiceType";
import SetNewSchedule from "../components/enterprise/SetNewSchedule";
import BillingAddressBook from "../common/BillingAddressBook";
import BillingDetail from "../components/consumer/account/BillingDetail";
import WebCookies from "../components/website/WebCookies";
import FrenchPrivacyPolicy from "../components/website/FrenchPrivacyPolicy";
import FrenchTermsOfService from "../components/website/FrenchTermsOfService";
import FrenchCookies from "../components/website/FrenchCookies";
import ScrollToTop from "../main/ScrollToTop";
import EnterpriseDeliveryboyShiftPage from "../components/enterprise/common/EnterpriseDeliveryboyShiftPage";
import EnterpriseShiftRequestNewDelivery from "../components/enterprise/common/EnterpriseShiftRequestNewDelivery";
import EnterpriseShiftAddDropDetails from "../components/enterprise/common/EnterpriseShiftAddDropDetails";
import EnterpriseShiftOrderPreview from "../components/enterprise/common/EnterpriseShiftOrderPreview";
import SupportPage from "../common/SupportPage";
import Error404 from "./Error404";
function MainRoutes() {
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WebHome />} />
        <Route path="/web-restaurants" element={<WebRestaurants />} />
        <Route path="/web-grocery" element={<WebGrocery />} />
        <Route path="/web-pharmacy-meds" element={<WebPharmacyMeds />} />
        <Route path="/web-gifts" element={<WebGifts />} />
        <Route path="/web-e-commerce" element={<WebECommerce />} />
        <Route path="/web-more" element={<WebMore />} />
        <Route path="/web-individuals" element={<WebIndividuals />} />
        <Route path="/web-become-courier" element={<WebBecomeCourier />} />
        <Route path="/web-about-us" element={<WebAboutUs />} />
        <Route path="/web_privacy_policy" element={<WebPrivacyPolicy />} />
        <Route path="/web-terms-service" element={<WebTermsOfService />} />
        <Route path="/web-cookies" element={<WebCookies/>} />
        <Route path="/french-privacy-policy" element={<FrenchPrivacyPolicy/>} />
        <Route path="/french-terms-service" element={<FrenchTermsOfService/>} />
        <Route path="/french-cookies" element={<FrenchCookies/>} />
        <Route path="/support-page" element={<SupportPage/>} />


        <Route path="/login" element={<Login />} />
        <Route path="/profile-choose" element={<ProfileChoose />} />
        <Route path="/pickup-signup" element={<PickupSignup />} />
        <Route path="/enterprises-signup" element={<EnterpriseSignup />} />
        <Route path="/deliveryboy-signup" element={<DeliveryboySignup />} />
        <Route path="/signup-verify" element={<SingupVerify />} />
        <Route path="/payment-unsuccessful" element={<PaymentUnsuccessful />} />
        <Route path="/driver-not-available" element={<DriverNotAvailable />} />
        <Route path="/thanks" element={<ThankPage baseUrl={baseUrl} />} />
        <Route
          path="/request-pending"
          element={<RequestPending baseUrl={baseUrl} />}
        />
        {/* auth route */}
        <Route
          path={`/${baseUrl}/dashboard`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <CommonDashboard />
            </ProtectedRoute>
          }
        />
        {/* enterprise */}
        <Route
          path={`/${baseUrl}/planing`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterprisePlanning />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/schedules`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterprisesNewSchedule />
            </ProtectedRoute>
          }
        />
        <Route path={`/enterprise/select-branch`} element={<SelectBranch />} />
        <Route
          path={`/enterprise/one-time-delivery`}
          element={<OneTimeDelivery />}
        />
        <Route
          path={`/enterprise/multiple-deliveries`}
          element={<MultipleDelivery />}
        />
        <Route
          path={`/enterprise/create-shift`}
          element={<EnterpriseCreateShiftSelectServiceType />}
        />
        <Route path={`/enterprise/set-schedule`} element={<SetNewSchedule />} />
        <Route
          path={`/enterprise/enterprises-multiple-deliveries-selectlocation`}
          element={<EnterpriseMultipleDeliverySelectLocation />}
        />
        <Route
          path={`/enterprise/enterprises-multiple-deliveries-serviceselect`}
          element={<EnterpriseMultipleDeliveriesSelectService />}
        />
        <Route
          path="/enterprise/add-pickup-details"
          element={<EnterpriseAddPickupDetails />}
        />
        <Route
          path="/enterprise/add-dropoff-details"
          element={<EnterpriseAddDropoffDetails />}
        />
        <Route
          path="/enterprise/order-preview"
          element={<EnterpriseOrderPreview />}
        />
        <Route
          path="/enterprise/all-company-location"
          element={<AllCompanyLocations />}
        />
        {/* end here */}
        {/* consumer */}
        <Route
          path={`/${baseUrl}/pickup-details`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddPickupDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/consumer/order-preview`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <OrderView />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/consumer/payment`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <PaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/enterprise/payment`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterprisePaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/find-driver`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <SearchDriver />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/order-tracking`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <LiveTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/consumer/orders`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <PastOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/enterprise/orders`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/enterprise/schedule-request"}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseScheduleApproved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprise/shift-details"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseShiftDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprise/deliveryboy-shift-details"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseDeliveryboyShiftPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprise/shift-request-new-delivery"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseShiftRequestNewDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprise/shift-add-drop-details"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseShiftAddDropDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprise/shift-order-preview"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterpriseShiftOrderPreview />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/payment-successfull"
          element={
            <ProtectedRoute requiredRole={userRole}>
              <PaymentSuccessful />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/schedule-created`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <ScheduleSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path={`/${baseUrl}/order-detail`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/setting`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <ConsumerSetting />
            </ProtectedRoute>
          }
        >
          <Route index element={<PickupAddressBook />} />
          <Route
            path="pickup-address-book"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <PickupAddressBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="pickup-notification-settings"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <PickupNotificationSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="language"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <LanguageSwitcher />
              </ProtectedRoute>
            }
          />
          <Route
            path="pickup-payment-methods"
            element={
              <ProtectedRoute requiredRole={userRole}>
                {" "}
                <PickupPaymentMethods />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-profile"
            element={
              <ProtectedRoute requiredRole={userRole}>
                {" "}
                <ProfileUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="pickup-change-password"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <PickupChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="delivery-profile-type"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <DeliveryboyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="billing-address"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <BillingDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-company-location"
            element={
              <ProtectedRoute requiredRole={userRole}>
                <ManageCompanyLocation />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path={`/${baseUrl}/notifications`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <NotificationLists />
            </ProtectedRoute>
          }
        ></Route>
        {/*deliveryboy*/}
        <Route
          path={`/${baseUrl}/add-vehicle`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddVehicle />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/add-work-type`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddWorkType />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
export default MainRoutes;
