import React from "react";
import Header from "../components/website/Header";
import Styles from "../assets/css/home.module.css"
import NoDataImage from "../assets/images/NoOrder.png";
function Error404() {
  return (
    <div>
      <Header />
      <div className={Styles.pickupHistoryNoDataMainCard}>
        <div className={Styles.pickupHistoryNoDataCard}>
          <img
            className={Styles.pickupHistoryNodataImage}
            src={NoDataImage}
            alt="No-Data"
          />
        </div>
        <div>
          <h4 className={Styles.pickupHistoryNoDatatext}>
            404 Page not found.
          </h4>
          <p className={Styles.pickupHistoryNodataSubText}>
           Opps! something went wrong.
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Error404;
