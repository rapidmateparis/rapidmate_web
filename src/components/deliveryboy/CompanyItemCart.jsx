import React from "react";
import Styles from "../../assets/css/home.module.css";
import Enterprise from "../../assets/images/Company-Enterprise-Profile.png";
function CompanyItemCart({ companyList = [], msg = "" }) {
  return (
    <>
      {companyList.length > 0 ? (
        companyList.map((company, index) => (
          <div className="col-md-2" key={index}>
            <div className={Styles.enterpriseHomePackageImgCard}>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "14px",
                }}
                src={Enterprise}
                alt="Icon"
              />
              <p className={Styles.enterpriseHomeOrderIdText}>
                {company.company_name}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-md-12">
          <div
            className={Styles.enterpriseHomeDeliveryHistoryCard}
            style={{ textAlign: "center" }}
          >
            <p className={Styles.enterpriseHomePickupTimeinfo}>{msg}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyItemCart;
