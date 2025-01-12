import React from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

function Help() {
  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>
              Customer support details
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`${Styles.deliveryboyProfileTypeMainCard} p-2`}>
            <div>
              <h4 className={Styles.deliveryboyProfiletypeText}>
                Support email
              </h4>
              <p className={Styles.deliveryboyProfileTypeDiscription}>
                support@rapidmate.fr
              </p>
            </div>
            <div className={Styles.deliveryboyProfiletypeCircleCard}>
              
                <FontAwesomeIcon icon={faMailBulk} />
       
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`${Styles.deliveryboyProfileTypeMainCard} p-2`}>
            <div>
              <h4 className={Styles.deliveryboyProfiletypeText}>
                Call Support
              </h4>
              <p className={Styles.deliveryboyProfileTypeDiscription}>
                +33 752 37 10 22
              </p>
            </div>
            <div className={Styles.deliveryboyProfiletypeCircleCard}>
                <FontAwesomeIcon icon={faPhone} />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Help;
