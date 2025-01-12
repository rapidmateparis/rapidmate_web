import React, { useState } from 'react'
import Styles from "../../../assets/css/home.module.css";
import { ToastContainer } from 'react-toastify';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../../redux/languageSlice';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.language.language);
    const [lang, setLang] =useState(currentLanguage ? currentLanguage : 'fr');
     const { t } = useTranslation();
    
    const switcher = (lang) => {
        dispatch(setLanguage(lang));
        setLang(lang)
    };
  return (
   <section className={Styles.addressBookMainSec}>
     <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>{t("language_switcher")}</p>
          </div>

          <div>
            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>
              {t("english")}
              </p>
              <Form>
                <Form.Check
                  type="switch"
                  id="push-notification-switch"
                  checked={lang==='en'}
                  onChange={()=>switcher('en')}
                  className={
                    lang=='en'
                      ? Styles.pushNotificationsSwitch
                      : ""
                  }
                />
              </Form>
            </div>

            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>
              {t("france")}
              </p>
              <Form>
                <Form.Check
                  type="switch"
                  id="fr-switch"
                  checked={lang==='fr'}
                  onChange={()=>switcher('fr')}
                  className={lang? Styles.promotionalEmailSwitch: ""}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
   </section>
  )
}

export default LanguageSwitcher
