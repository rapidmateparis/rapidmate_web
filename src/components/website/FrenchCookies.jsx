import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import { Link } from "react-router-dom";

const FrenchCookies = () => {
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      <section className={Styles.homePrivacyPolicySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.homePrivacyPolicyCard}>
                <h1>
                  Consentement aux <span>Cookies</span>
                </h1>
                <p>
                  Chez <b>AJS Group,</b> la société mère de Rapidmate, nous
                  attachons une grande importance à votre vie privée et nous
                  nous engageons à garantir que votre expérience sur notre
                  plateforme soit sûre et agréable. Cette notice de consentement
                  aux cookies fournit des informations importantes sur les
                  cookies que nous utilisons sur notre site web et plateforme,
                  ainsi que sur la manière dont vous pouvez les gérer.
                </p>
                <h3>1. Qu'est-ce que les cookies ?</h3>
                <p>
                  Les cookies sont de petits fichiers texte placés sur votre
                  appareil lorsque vous visitez un site web. Ils nous aident à
                  fournir une meilleure expérience utilisateur en mémorisant vos
                  préférences et en activant des fonctionnalités essentielles
                  sur notre plateforme.
                </p>
                <h3>2. Types de cookies que nous utilisons</h3>
                <ul>
                  <li>
                    <p>
                      <b>Cookies essentiels :</b> Ces cookies sont nécessaires
                      au bon fonctionnement du site, tels que la connexion et la
                      sécurité.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Cookies de performance :</b> Ces cookies nous aident à
                      analyser la façon dont les utilisateurs interagissent avec
                      notre plateforme pour améliorer les performances et
                      optimiser votre expérience.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Cookies fonctionnels :</b> Ces cookies nous permettent
                      de mémoriser vos préférences et de personnaliser certaines
                      fonctionnalités, telles que les paramètres de langue ou de
                      localisation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Cookies de ciblage :</b> Ces cookies suivent votre
                      activité pour diffuser des publicités ou du contenu
                      personnalisé en fonction de vos centres d’intérêt.
                    </p>
                  </li>
                </ul>
                <h3>3. Pourquoi utilisons-nous des cookies ?</h3>
                <p>Nous utilisons des cookies à diverses fins, notamment :</p>
                <ul>
                  <li>
                    <p>
                      Pour garantir le bon fonctionnement de notre site et de
                      nos services.
                    </p>
                  </li>
                  <li>
                    <p>
                      Pour améliorer votre expérience en mémorisant vos
                      préférences et paramètres.
                    </p>
                  </li>
                  <li>
                    <p>
                      Pour analyser les interactions des utilisateurs et
                      améliorer les performances de la plateforme.
                    </p>
                  </li>
                  <li>
                    <p>
                      Pour personnaliser le contenu et les efforts marketing.
                    </p>
                  </li>
                </ul>
                <h3>4. Gestion des cookies</h3>
                <p>
                  Vous pouvez gérer ou supprimer les cookies à tout moment via
                  les paramètres de votre navigateur. Veuillez noter que bloquer
                  ou supprimer des cookies peut affecter la fonctionnalité de
                  notre plateforme et vous empêcher d’accéder à certains
                  services.
                </p>
                <p>
                  Pour des informations détaillées sur la gestion des cookies,
                  consultez la section d’aide de votre navigateur.
                </p>
                <h3>5. Vie privée et conditions</h3>
                <p>
                  Pour plus de détails sur la manière dont nous traitons vos
                  données et gérons votre vie privée, veuillez consulter notre
                  <Link to="/web-privacy-policy">
                    Politique de confidentialité
                  </Link>{" "}
                  et nos{" "}
                  <Link to="/web-terms-service">
                    Conditions générales d’utilisation.
                  </Link>
                  .
                </p>
                <h3>6. Mises à jour de ce consentement aux cookies</h3>
                <p>
                  <b>Rapidmate,</b> une filiale de <b>AJS Group,</b> se réserve
                  le droit de mettre à jour cette politique de cookies. Nous
                  informerons les utilisateurs de toute modification en publiant
                  la politique mise à jour sur cette page. Nous vous
                  encourageons à consulter régulièrement cette politique.
                </p>
                <h3>7. Contactez-nous</h3>
                <p>
                  Si vous avez des questions concernant notre utilisation des
                  cookies ou cette politique, n’hésitez pas à nous contacter :
                </p>
                <h3>
                  Email:{" "}
                  <span>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </span>
                </h3>
                <h3>
                  Téléphone :{" "}
                  <span>
                    <a href="tel:+33752371022">[+33752371022]</a>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
};

export default FrenchCookies;
