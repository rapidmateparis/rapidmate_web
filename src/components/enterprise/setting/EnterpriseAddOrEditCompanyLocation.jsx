import React, { useState, useRef, useEffect } from "react";
import Styles from "../../../assets/css/home.module.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";
import {
  createEnterpriseBranch,
  updateEnterpriseBranch,
} from "../../../data_manager/dataManage";
import { useSelector } from "react-redux";
import { buildAddress, getLocation } from "../../../utils/Constants";
import { useTranslation } from "react-i18next";

const center = { lat: 28.56341236809311, lng: 77.33609181917045 };
const libraries = ["places"];

const EnterpriseAddOrEditCompanyLocation = ({
  setAddShow,
  getBranchLocation,
  editBranch,
  mapKey,
}) => {
  const user = useSelector((state) => state.auth.user);

  const [markerPosition, setMarkerPosition] = useState(center);
  const [locationTitle, setLocationTitle] = useState("");
  const [postcode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPostal,setISPostal]=useState(false)
  const {t}=useTranslation();

  const [locationInput, setLocationInput] = useState({
    address: "",
    displayedAddress: "",
    lat: center.lat,
    lng: center.lng,
    components: [],
  });

  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapKey,
    libraries,
  });

  // Populate data when editing a branch
  useEffect(() => {
    if (editBranch) {
      setLocationTitle(editBranch.branch_name || "");
      const { latitude, longitude, address,city,state,country,postal_code } = editBranch;
      setLocationInput({
        address: buildAddress(address,city,state,postal_code,country) || "",
        displayedAddress: buildAddress(address,city,state,postal_code,country) || "",
        lat: parseFloat(latitude) || center.lat,
        lng: parseFloat(longitude) || center.lng,
        components: [],
      });
      setMarkerPosition({
        lat: parseFloat(latitude)  || center.lat,
        lng: parseFloat(longitude) || center.lng,
      });
    }
  }, [editBranch]);

  const handlePlaceChanged = (ref, setLocation) => {
    const autocomplete = ref.current.getPlace();
    if (autocomplete) {
      const locationDetails = {
        address: autocomplete.formatted_address,
        displayedAddress: autocomplete.name || autocomplete.formatted_address,
        lat: autocomplete.geometry.location.lat(),
        lng: autocomplete.geometry.location.lng(),
        components: autocomplete.address_components,
      };
      setLocation(locationDetails);
      setMarkerPosition({
        lat: locationDetails.lat,
        lng: locationDetails.lng,
      });
    }
  };

  const handleSaveLocation = () => {
    if (!locationTitle || !locationInput.address) {
      showErrorToast("Please enter a title and location");
      return;
    }

    const Location = getLocation(
      locationInput,
      locationInput.lat,
      locationInput.lng
    );


    setLoading(true);
    const requestParams = {
      branch_name: locationTitle,
      address: Location.address,
      city: Location.city,
      state: Location.state,
      country: Location.country,
      postal_code: Location.postal_code || postcode,
      latitude: Location.latitude,
      longitude: Location.longitude,
    };

    if (editBranch) {
      requestParams.id = editBranch.id;
      requestParams.enterprise_id = editBranch.enterprise_id;
    }else{
      requestParams.enterprise_ext_id=user.userDetails.ext_id;
    }


    const saveAction = editBranch
      ? updateEnterpriseBranch
      : createEnterpriseBranch;

    saveAction(
      requestParams,
      (successResponse) => {
        if (successResponse[0]._success) {
          showSuccessToast(
            editBranch
              ? "Branch location updated successfully."
              : "Branch location added successfully."
          );
          getBranchLocation(true);
          setAddShow(false);
          setISPostal(false)

        }
      },
      (errorResponse) => {
        setLoading(false);
        setISPostal(true)
        showErrorToast("Please add postal code ");
      }
    );
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <section className={Styles.enterprisenewScheduleSec}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className={Styles.addressBookHeaderTitleText}>
              {editBranch ? t("editCompanyLocation") : t("addCompanyLocation")}
            </p>
            <div className={Styles.mapContainer}>
              <GoogleMap
                center={markerPosition}
                zoom={16}
                mapContainerStyle={{ width: "100%", height: "250px" }}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </div>
            <div>
              <div className="mb-2">
                <div className={Styles.enterpriseNewCompanyLocationTitleLabel}>
                {t("locationTitle")}
                </div>
                <input 
                  className={Styles.enterpriseNewCompanyLocationTitleinput}
                  type="text"
                  placeholder={t("typeLocationTitle")}
                  value={locationTitle}
                  onChange={(e) => setLocationTitle(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  className={Styles.enterpriseNewCompanyLocationTitleLabel}
                >
                  {t("searchLocation")}
                </label>
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                  }
                  onPlaceChanged={() =>
                    handlePlaceChanged(autocompleteRef, setLocationInput)
                  }
                >
                  <input
                    className={Styles.homeMapPlaceSearch}
                    type="text"
                    placeholder={t("typeAndSelectLocation")}
                    ref={autocompleteRef}
                    defaultValue={locationInput.displayedAddress}
                  />
                </Autocomplete>
              </div>
              {isPostal && <div className="mb-2">
                <input
                  className={Styles.enterpriseNewCompanyLocationTitleinput}
                  type="text"
                  placeholder="Type postal code"
                  value={postcode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div> }
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className={Styles.enterpriseNewCompanyLocationaddressSaveBtn}
                  onClick={handleSaveLocation}
                  disabled={loading}
                >
                  {editBranch ? t("updateLocation") : t("saveLocation")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EnterpriseAddOrEditCompanyLocation;
