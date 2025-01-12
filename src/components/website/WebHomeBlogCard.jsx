import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import ImageBlogPlaceholder from "../../assets/webImages/ImageBlogPlaceholder.png";
import Blog1 from "../../assets/webImages/HomeBlogImg1.png";
import Blog2 from "../../assets/webImages/HomeBlogImg2.png";
import Blog3 from "../../assets/webImages/HomeBlogImg3.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WebHomeBlogCard = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className={Styles.webHomeBlogSec}>
        <div className={Styles.webHomeBlogHeadCard}>
          <h2 className={Styles.webHomeBlogTitle}>{t("our_blogs")}</h2>
          <Link to="/" className={Styles.webHomeBlogViewBtn}>
            {t("view_all")}
          </Link>
        </div>

        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-6">
            <div>
              <img
                className={Styles.webHomeBlogPlaceholderImage}
                src={ImageBlogPlaceholder}
                alt="img"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.webHomeBlogMainCard}>
              <div className={Styles.webHomeBlogCategoryCard}>
                <h5 className={Styles.webHomeBlogCategoryTitle}>
                  {t("development")}
                </h5>
                <p className={Styles.webHomeBlogPostDate}>16 March 2023</p>
              </div>
              <div>
                <h2 className={Styles.webHomeBlogHeadlineText}>
                  {t("mobile_changing_game_blog")}
                </h2>
                <p className={Styles.webHomeBlogDescriptionText}>
                  {t("mobile_changing_game_blog_description")}
                </p>
                <div className={Styles.webHomeBlogReadMoreBtnCard}>
                  <Link to="/" className={Styles.webHomeBlogReadMoreBtn}>
                    {t("read_more")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.webHomeBlogBottomCardsRow}>
          <div className={Styles.webHomeBlogBottomMainCard}>
            <div className={Styles.webHomeBlogBottomBlogImgCard}>
              <img src={Blog1} alt="img" />
            </div>
            <div className={Styles.webHomeBlogBottomBlogCategoryCard}>
              <h5>{t("sports")}</h5>
              <p>10 March 2023</p>
            </div>
            <div className={Styles.webHomeBlogBottomBlogDetailsCard}>
              <h2>{t("transforming_logistics_blog")}</h2>
              <p>{t("transforming_logistics_blog_description")}</p>
            </div>
            <div>
              <Link to="/" className={Styles.webHomeBlogBottomReadMoreBtn}>
                {t("read_more")}
              </Link>
            </div>
          </div>

          <div className={Styles.webHomeBlogBottomMainCard}>
            <div className={Styles.webHomeBlogBottomBlogImgCard}>
              <img src={Blog2} alt="img" />
            </div>
            <div className={Styles.webHomeBlogBottomBlogCategoryCard}>
              <h5>{t("development")}</h5>
              <p>11 March 2023</p>
            </div>
            <div className={Styles.webHomeBlogBottomBlogDetailsCard}>
              <h2>{t("tech_differently_blog")}</h2>
              <p>{t("tech_differently_blog_description")}</p>
            </div>
            <div>
              <Link to="/" className={Styles.webHomeBlogBottomReadMoreBtn}>
                {t("read_more")}
              </Link>
            </div>
          </div>

          <div className={Styles.webHomeBlogBottomMainCard}>
            <div className={Styles.webHomeBlogBottomBlogImgCard}>
              <img src={Blog3} alt="img" />
            </div>
            <div className={Styles.webHomeBlogBottomBlogCategoryCard}>
              <h5>{t("travel")}</h5>
              <p>12 March 2023</p>
            </div>
            <div className={Styles.webHomeBlogBottomBlogDetailsCard}>
              <h2>{t("ai_companies_blog")}</h2>
              <p>{t("ai_companies_blog_description")}</p>
            </div>
            <div>
              <Link to="/" className={Styles.webHomeBlogBottomReadMoreBtn}>
                {t("read_more")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebHomeBlogCard;
