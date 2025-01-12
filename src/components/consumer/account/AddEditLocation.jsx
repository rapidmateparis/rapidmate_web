import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Styles from "../../../assets/css/PickupEditAddress.module.css"; 
import { MAPS_API_KEY } from "../../../utils/Constants";

const center = { lat: 28.56341236809311, lng: 77.33609181917045 };
const libraries= ["places"];
     
function PickupHomeMap({ markerPosition }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <GoogleMap
        center={markerPosition}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "300px" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}

function AddEditLocation({ show, handleClose }) {
    const [markerPosition, setMarkerPosition] = useState(center);
    const [locationInput, setLocationInput] = useState("");
    const geocoder = useRef(null);
  
    // Initialize geocoder
    React.useEffect(() => {
      if (!geocoder.current && window.google && window.google.maps) {
        geocoder.current = new window.google.maps.Geocoder();
      }
    }, []);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setLocationInput(value);
  
      if (geocoder.current && value.trim()) {
        geocoder.current.geocode({ address: value }, (results, status) => {
          if (status === "OK" && results[0]) {
            const position = results[0].geometry.location.toJSON();
            setMarkerPosition(position);
          } else {
            console.error(
              "Geocode was not successful for the following reason:",
              status
            );
          }
        });
      }
    };
  
    const handleSelectPlace = (place) => {
      if (place && place.geometry && place.geometry.location) {
        const position = place.geometry.location.toJSON();
        setMarkerPosition(position);
        setLocationInput(place.formatted_address || "");
      }
    };
  
    const handleSaveChanges = () => {
      // Implement save changes logic here
      handleClose();
    };
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={Styles.modalPickupEditAddressHeader}>
            <p style={{ marginBottom: 0, fontWeight: 600 }}>Add new locations</p>
            <FontAwesomeIcon
              className={Styles.modalCloseHeaderBtn}
              icon={faTimes}
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <PickupHomeMap markerPosition={markerPosition} />
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className={Styles.enterpriseNewCompanyLocationTitleLabel}>
                  Location title
                </Form.Label>
                <Form.Control
                  className={Styles.enterpriseNewCompanyLocationTitleinput}
                  type="text"
                  placeholder="Type here.."
                />
              </Form.Group>
              <Form.Group className={Styles.enterpriseNewCompanyLocationSearchCard}>
                <Form.Control
                  className={Styles.enterpriseNewCompanyLocationSearchInput}
                  placeholder="Search location"
                  value={locationInput}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={Styles.enterpriseNewCompanyLocationAddressDeleteBtn}
            onClick={handleClose}
          >
            Delete
          </button>
          <button
            className={Styles.enterpriseNewCompanyLocationaddressSaveBtn}
            onClick={handleSaveChanges}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddEditLocation;
