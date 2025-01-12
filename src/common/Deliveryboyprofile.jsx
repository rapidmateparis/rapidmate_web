import React from "react";
import Styles from "../assets/css/home.module.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Controller } from "react-hook-form";
import TextInput from "./TextInput";
function Deliveryboyprofile({user,control,errors}) {
    const defaultEmail = user?.userDetails?.email || "";
      const defaultName = user?.userDetails?.first_name || "";
      const defaultLastName = user?.userDetails?.last_name || "";
      const defaultCompany = user?.userDetails?.company_name || "";
      const defaultPhone = user?.userDetails?.phone.replace("+", "") || "";
  return (
    <>
     
      <div className={`row ${Styles.manageRow}`}>
        <div className="col-md-6">
          <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
            <label htmlFor="name" className={Styles.addPickupDetailFormLabels}>
              First name:
            </label>
            <TextInput
              control={control}
              name="name"
              placeholder="First name"
              error={errors.name}
              defaultValue={defaultName}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
            <label
              htmlFor="lastname"
              className={Styles.addPickupDetailFormLabels}
            >
              Last name:
            </label>
            <TextInput
              control={control}
              name="lastname"
              placeholder="Last name"
              error={errors.lastname}
              defaultValue={defaultLastName}
            />
          </div>
        </div>
      </div>
      <div className={`row ${Styles.manageRow}`}>
        <div className="col-md-12">
          <div className={Styles.addPickupDetailsInputs}>
            <label
              htmlFor="sirect_no"
              className={Styles.addPickupDetailFormLabels}
            >
              Company :
            </label>
            <TextInput
              control={control}
              name="company"
              placeholder="Company"
              error={errors.company}
              defaultValue={defaultCompany}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={Styles.addPickupDetailsInputs}>
            <label htmlFor="email" className={Styles.addPickupDetailFormLabels}>
              Email:
            </label>
            <TextInput
              control={control}
              name="email"
              placeholder="Email"
              error={errors.email}
              defaultValue={defaultEmail}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={Styles.addPickupDetailsInputs}>
            <label
              htmlFor="phoneNumber"
              className={Styles.addPickupDetailFormLabels}
            >
              Phone Number:
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={defaultPhone}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={"fr"}
                  value={value}
                  // onlyCountries={["fr", "in"]}
                  countryCodeEditable={false}
                  onChange={onChange}
                  inputStyle={{
                    width: "100%",
                    paddingLeft: "42px",
                  }}
                  dropdownStyle={{ borderColor: "#ccc" }}
                  enableSearch
                  searchPlaceholder="Search country"
                  specialLabel=""
                />
              )}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red", fontSize: "13px" }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Deliveryboyprofile;