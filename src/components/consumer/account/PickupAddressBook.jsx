import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PickupEditAddressModal from "./PickupEditAddressModal";
import PickupAddAddressModal from "./PickupAddAddressModal";
import {
  faPlus,
  faLocationDot,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getConsumerAddressBookList,
  getDeliveryBoyAddressBookList,
  getEnterpriseAddressBookList,
  updateAddressBookforConsumer,
} from "../../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";

function PickupAddressBook() {
  const user = useSelector((state)=>state.auth.user)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(0);
  const [addressData, setAddressData] = useState();
  const [rowId, setRowId] = useState();

  const openEditModal = (addressItem) => {
    setShowEditModal(true);
    setAddressData(addressItem);
  };

  const getAddressBookList = () => {
    if (user?.userDetails.role === "DELIVERY_BOY") {
      setLoading(true);
      getDeliveryBoyAddressBookList(
        user?.userDetails.ext_id,
        (successResponse) => {
          setAddressList(successResponse[0]._response);
          setLoading(false);
        },
        (errorResponse) => {
          setLoading(false);
        }
      );
    } else if (user?.userDetails.role === "CONSUMER") {
      setLoading(true);
      getConsumerAddressBookList(
        user?.userDetails.ext_id,
        (successResponse) => {
          setAddressList(successResponse[0]._response);
          setLoading(false);
        },
        (errorResponse) => {
          console.log("errorResponse", errorResponse);
          setLoading(false);
        }
      );
    } else {
      setLoading(true);
      getEnterpriseAddressBookList(
        user?.userDetails.ext_id,
        (successResponse) => {
          setAddressList(successResponse[0]._response);
          setLoading(false);
        },
        (errorResponse) => {
          console.log("errorResponse", errorResponse);
          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    getAddressBookList();
  }, [user]); // Trigger only when `user` changes

  const openAddModal = () => {
    setShowAddModal(true);
  };
  const openDeleteModal = (rowId) => {
    setRowId
    setShowDeleteModal(true);
  };


  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Address book</p>
            <button
              onClick={openAddModal}
              className={Styles.addressBookPlusIconBtn}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div>
            {addressList &&
              addressList.map((addressItem, index) => (
                <div key={index} className={Styles.addressBookAddressesCards}>
                  <div className={Styles.addressBookLocationDotIconCard}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                    <h5 className={Styles.addressBookUserCompanyname}>
                      {addressItem?.first_name + " " + addressItem?.last_name}
                    </h5>
                    <p className={Styles.addressBookUserCompanyAddress}>
                      {addressItem?.address}
                    </p>
                  </div>
                  <button
                    onClick={() => openEditModal(addressItem)} // Pass a function reference
                    className={Styles.addressBookEditPenIconCard}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  {/* <button
                    onClick={() => openDeleteModal(addressItem?.id)} // Pass a function reference
                    style={{border:"none",backgroundColor:"transparent", color:"red"}}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button> */}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Modals */}
      <PickupEditAddressModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        addressData={addressData}
        role={user?.userDetails?.role}
        extId={user?.userDetails?.ext_id}
      />

      <PickupAddAddressModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        role={user?.userDetails?.role}
        extId={user?.userDetails?.ext_id}
      />
       <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        role={user?.userDetails?.role}
        extId={user?.userDetails?.ext_id}
        rowId={rowId}
      />
      <ToastContainer />
    </section>
  );
}

export default PickupAddressBook;
