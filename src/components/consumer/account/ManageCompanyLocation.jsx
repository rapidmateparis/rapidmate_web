import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { getEnterpriseBranch } from "../../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast } from "../../../utils/Toastify";
import { buildAddress, getMapsApiKey } from "../../../utils/Constants";
import EnterpriseAddOrEditCompanyLocation from "../../enterprise/setting/EnterpriseAddOrEditCompanyLocation";
import { setBranches } from "../../../redux/enterpriseSlice";
import { getDashbaordBranch } from "../../../utils/UseFetch";

function ManageCompanyLocation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enterpriseBranch, setEnterpriseBranches] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [addShow, setAddShow] = useState(false);
  const [editBranch, setEditBranch] = useState(null);
  const [mapKey, setMapKey] = useState(null);
  const [resfresh, setRefresh] = useState(false);

  const getBranchLocation = (forDo = false) => {
    setLoading(true);
    getEnterpriseBranch(
      user.userDetails.ext_id,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          const branches = successResponse[0]._response?.map((branch) => ({
            ...branch,
            isSelected: false,
          }));

          setEnterpriseBranches(branches || []);
          if (forDo) {
            setRefresh(true);
          }
        }
      },
      (errorResponse) => {
        setLoading(false);
        showErrorToast(errorResponse[0]._errors.message);
      }
    );
  };

  const getLocationAddress = (branchId) => {
    const result = enterpriseBranch?.find((branch) => branch.id === branchId);
    return buildAddress(
      result?.address,
      result?.city,
      result?.state,
      result?.country,
      result?.postal_code
    );
  };

  const toggleAddHandler = () => {
    setAddShow((prev) => !prev);
    setEditBranch(null);
  };

  const openDeleteModal = (id) => {
    setRowId(id);
    setShowDeleteModal(true);
  };

  const openEditHandler = (branch) => {
    setEditBranch(branch);
    setAddShow(true);
  };

  useEffect(() => {
    getBranchLocation(false);
    const getMapKey = async () => {
      const key = await getMapsApiKey();
      setMapKey(key);
    };
    getMapKey();
  }, [user]);

  const getBranchForUpdate = async () => {
    try {
      const response = await getDashbaordBranch(user?.userDetails?.ext_id);
      if (
        response?.branchOverviewData &&
        response?.branchOverviewData.length > 0
      ) {
        const branchList = response?.branchOverviewData;
        dispatch(setBranches(branchList));
      }
    } catch (errorResponse) {
      let err = "";
      if (errorResponse.errors) {
        err = errorResponse.errors.msg[0].msg;
      } else {
        err = errorResponse[0]._errors.message;
      }
      showErrorToast(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resfresh === true) {
      getBranchForUpdate();
    }
  }, [resfresh]);

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div
            className={Styles.addressBookAddressCard}
            onClick={toggleAddHandler}
            style={{ cursor: "pointer" }}
          >
            <p className={Styles.addressBookHeaderTitleText}>
              Manage company locations
            </p>
            <button className={Styles.addressBookPlusIconBtn}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div>
            {addShow && (
              <EnterpriseAddOrEditCompanyLocation
                setAddShow={setAddShow}
                getBranchLocation={getBranchLocation}
                editBranch={editBranch}
                mapKey={mapKey}
              />
            )}
            {!addShow &&
              enterpriseBranch?.map((branch, index) => (
                <div key={index} className={Styles.addressBookAddressesCards}>
                  <div className={Styles.addressBookLocationDotIconCard}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                    <h5 className={Styles.addressBookUserCompanyname}>
                      {branch?.branch_name}
                    </h5>
                    <p className={Styles.addressBookUserCompanyAddress}>
                      {getLocationAddress(branch?.id)}
                    </p>
                  </div>
                  <button
                    onClick={() => openEditHandler(branch)}
                    className={Styles.addressBookEditPenIconCard}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
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

export default ManageCompanyLocation;
