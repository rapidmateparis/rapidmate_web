import React from "react";
import Header from "./Header";
import WebHomeBannerCard from "./WebHomeBannerCard";
import WebServicesCard from "./WebServicesCard";
import WebCompanyAchivments from "./WebCompanyAchivments";
import WebWorkflowCard from "./WebWorkflowCard";
import WebEcoFriendlyFleet from "./WebEcoFriendlyFleet";
import WebHomeBlogCard from "./WebHomeBlogCard";
import WebHomeTestimonial from "./WebHomeTestimonial";
import WebFooter from "./WebFooter";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebHome() {
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Start here  */}
      <WebHomeBannerCard />
      {/* Services Cards Start Here  */}
      <WebServicesCard />
      {/* Company Achivments Start Here  */}
      <WebCompanyAchivments />
      {/* WorkFlow Card Start Here  */}
      <WebWorkflowCard />
      {/* Eco-Friendly Fleet Card Start here  */}
      <WebEcoFriendlyFleet />
      {/* Our Blogs Card Start Here  */}
      <WebHomeBlogCard />
      {/* Testimonial Card start here  */}
      <WebHomeTestimonial />
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
}

export default WebHome;
