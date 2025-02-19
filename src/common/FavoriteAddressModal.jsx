import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../assets/css/FavoriteAddressModal.module.css";
import { getLocationDetails } from "../utils/UseFetch";

function FavoriteAddressModal({ show, handleClose,addressList,loading,field,mapApiKey,setPickupLocation,originRef,setDropoffLocation,destinationRef}) {
 
  const getHandlerAddress = async (address,index) =>{
    try {
      const location= await getLocationDetails(address,mapApiKey);
      if(index===1){
        setPickupLocation(location)
        if (originRef.current) {
          originRef.current.value = location.address;
        }
      }else{
        setDropoffLocation(location)
        if (destinationRef.current) {
          destinationRef.current.value = location.address;
        }
      }
      
      handleClose()
    } catch (error) {
      
    }
  }

  return (
    <Modal show={show} onHide={handleClose} className={Styles.modalCustom}>
      <Modal.Header>
        <div className={Styles.modalPickupEditAddressHeader}>
          <p className={Styles.vehicleDimensionsTextHead}>Favorite Address</p>
          <FontAwesomeIcon
            className={Styles.modalCloseHeaderBtn}
            icon={faTimes}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        {addressList?.map((item, index) => (
          <div key={index} className={Styles.favAddressMainCard} onClick={()=>getHandlerAddress(item.address,field)}>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className={Styles.favAddressTextCard}>
              <h4>{item.first_name}</h4>
              <p>{item.address}</p>
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default FavoriteAddressModal;
