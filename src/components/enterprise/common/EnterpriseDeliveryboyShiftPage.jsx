import React, { useState, useRef, useEffect } from "react";
import Styles from "../../../assets/css/home.module.css";
import Driver from "../../../assets/images/Driver-Image.jpeg";
import Package from "../../../assets/images/One-TimePackage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CommonHeader from "../../../common/CommonHeader";
import { useSelector } from "react-redux";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(Date.now());
  const requestRef = useRef(null);

  const updateTimer = () => {
    const now = Date.now();
    setElapsedTime(now - startTime.current);
    requestRef.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    startTime.current = Date.now(); // Reset start time when component mounts
    requestRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className={Styles.enterpriseShiftPageDeliveryTimerCard}>
      <p className={Styles.enterpriseShiftPageDeliveryTimerText}>
        {formatTime(elapsedTime)}
      </p>
    </div>
  );
};

const EnterpriseDeliveryboyShiftPage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {/* Header Start Here */}
      <CommonHeader userData={user} />
      {/* Header End Here */}
      <section className={Styles.enterpriseShiftPageSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-4">
            <div className={Styles.enterpriseShiftPageDetailsDriverMainCard}>
              <div className={Styles.enterpriseShiftPageDetailsDriverCard}>
                <img
                  className={Styles.enterpriseShiftPageDetailsDriverImg}
                  src={Driver}
                  alt="driverImg"
                />
                <p className={Styles.enterpriseShiftPagDriverReadyText}>
                  Ready
                </p>
              </div>
              <div className={Styles.enterpriseShiftPageDeliveryBoyReadyCard}>
                <h4 className={Styles.enterpriseShiftPageDeliveryBoyReadyText}>
                  Delivery boy ready
                </h4>
                <p
                  className={
                    Styles.enterpriseShiftPageDeliveryBoyReadyDiscription
                  }
                >
                  John Doe is at your location and ready to deliver
                </p>
              </div>
              <div>
                <Stopwatch />
                <p className={Styles.enterpriseShiftPageShiftEndHours}>
                  6 hours left before shift ends
                </p>
              </div>
              <div>
                <div
                  className={Styles.enterpriseShiftPageTotaldeliveryCountCard}
                >
                  <h4 className={Styles.enterpriseShiftPageTotaldeliveryCount}>
                    03
                  </h4>
                  <p className={Styles.enterpriseShiftPageTotaldeliveryText}>
                    Deliveries
                  </p>
                </div>

                <div
                  className={Styles.enterpriseShiftPageTotaldeliveryCountCard}
                >
                  <h4 className={Styles.enterpriseShiftPageTotaldeliveryCount}>
                    1.5
                  </h4>
                  <p className={Styles.enterpriseShiftPageTotaldeliveryText}>
                    Total hours
                  </p>
                </div>

                <div
                  className={Styles.enterpriseShiftPageTotaldeliveryCountCard}
                >
                  <h4 className={Styles.enterpriseShiftPageTotaldeliveryCount}>
                    4.2
                  </h4>
                  <p className={Styles.enterpriseShiftPageTotaldeliveryText}>
                    km Distance
                  </p>
                </div>
              </div>

              <Link
                className={Styles.enterpriseShiftPageActiveDelivriesUpperCard}
              >
                <div
                  className={
                    Styles.enterpriseShiftPageActiveDelivriesPackageCard
                  }
                >
                  <img
                    className={
                      Styles.enterpriseShiftPageActiveDelivriesPackageImg
                    }
                    src={Package}
                    alt="img"
                  />
                  <p className={Styles.enterpriseShiftPageActiveDelivriesText}>
                    Active deliveries <span>(02)</span>
                  </p>
                </div>
                <FontAwesomeIcon
                  className={
                    Styles.enterpriseShiftPageActiveDelivriesPackageArrowIcon
                  }
                  icon={faArrowRight}
                />
              </Link>

              <Link
                className={Styles.enterpriseShiftPageActiveDelivriesLowerCard}
              >
                <div
                  className={
                    Styles.enterpriseShiftPageActiveDelivriesPackageCard
                  }
                >
                  <img
                    className={
                      Styles.enterpriseShiftPageActiveDelivriesPackageImg
                    }
                    src={Package}
                    alt="img"
                  />
                  <p className={Styles.enterpriseShiftPageActiveDelivriesText}>
                    Request new delivery
                  </p>
                </div>
                <FontAwesomeIcon
                  className={
                    Styles.enterpriseShiftPageActiveDelivriesPackageArrowIcon
                  }
                  icon={faArrowRight}
                />
              </Link>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className={
                Styles.enterpriseShiftPageActiveDelivriesDetailMaincard
              }
            >
              <h4
                className={Styles.enterpriseShiftPageActiveDelivriesHeadTitle}
              >
                Active deliveries (03)
              </h4>
              <div className={Styles.enterpriseShiftPageOrderDetailMainCard}>
                <p className={Styles.enterpriseShiftPageOrderId}>
                  Order ID: 98237469
                </p>
                <div
                  className={Styles.enterpriseShiftPageOrderDetailLocmaincard}
                >
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationDot}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      From <b>North Street, ABC</b>
                    </p>
                  </div>
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetailBorderShowOff
                    }
                  />
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      To <b>5th Avenue, XYZ</b>
                    </p>
                  </div>
                </div>
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetailMainBorderShowOff
                  }
                />
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetaildistanceCardMain
                  }
                >
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetaildistanceCard
                    }
                  >
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Total distance: <b>2.6 km</b>
                    </p>
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Time required: <b>1.2 hrs</b>
                    </p>
                  </div>
                  <p className={Styles.enterpriseShiftPageOrderDetailPending}>
                    Pending
                  </p>
                </div>
              </div>

              <div className={Styles.enterpriseShiftPageOrderDetailMainCard}>
                <p className={Styles.enterpriseShiftPageOrderId}>
                  Order ID: 98237469
                </p>
                <div
                  className={Styles.enterpriseShiftPageOrderDetailLocmaincard}
                >
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationDot}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      From <b>North Street, ABC</b>
                    </p>
                  </div>
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetailBorderShowOff
                    }
                  />
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      To <b>5th Avenue, XYZ</b>
                    </p>
                  </div>
                </div>
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetailMainBorderShowOff
                  }
                />
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetaildistanceCardMain
                  }
                >
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetaildistanceCard
                    }
                  >
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Total distance: <b>2.6 km</b>
                    </p>
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Time required: <b>1.2 hrs</b>
                    </p>
                  </div>
                  <p className={Styles.enterpriseShiftPageOrderDetailprogress}>
                    In progress
                  </p>
                </div>
              </div>

              <div className={Styles.enterpriseShiftPageOrderDetailMainCard}>
                <p className={Styles.enterpriseShiftPageOrderId}>
                  Order ID: 98237469
                </p>
                <div
                  className={Styles.enterpriseShiftPageOrderDetailLocmaincard}
                >
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationDot}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      From <b>North Street, ABC</b>
                    </p>
                  </div>
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetailBorderShowOff
                    }
                  />
                  <div
                    className={Styles.enterpriseShiftPageOrderDetailFromLocCard}
                  >
                    <FontAwesomeIcon
                      className={
                        Styles.enterpriseShiftPageOrderDetailFromLocIcon
                      }
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.enterpriseShiftPageOrderDetailFromLoc}>
                      To <b>5th Avenue, XYZ</b>
                    </p>
                  </div>
                </div>
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetailMainBorderShowOff
                  }
                />
                <div
                  className={
                    Styles.enterpriseShiftPageOrderDetaildistanceCardMain
                  }
                >
                  <div
                    className={
                      Styles.enterpriseShiftPageOrderDetaildistanceCard
                    }
                  >
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Total distance: <b>2.6 km</b>
                    </p>
                    <p
                      className={Styles.enterpriseShiftPageOrderDetaildistance}
                    >
                      Time required: <b>1.2 hrs</b>
                    </p>
                  </div>
                  <p className={Styles.enterpriseShiftPageOrderDetailComplete}>
                    Complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseDeliveryboyShiftPage;
