import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Client1 from "../../assets/webImages/pizzahut.png";
import Client2 from "../../assets/webImages/dominos1.png";
import Client3 from "../../assets/webImages/sushi.png";
import Star from "../../assets/webImages/StarRating.png";
import { useTranslation } from "react-i18next";

const WebHomeTestimonial = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: "Pizza Hut",
      image: Client1,
      text: t("testimonialsPizzhutText"),
      subtext: t("testimonialsPizzhutSubText"),
      rating: 5,
    },
    {
      id: 2,
      name: "DOMINO’S PIZZA",
      image: Client2,
      text: t("testimonialsDominosText"),
      subtext: t("testimonialsDominosSubText"),
      rating: 5,
    },
    {
      id: 3,
      name: "YILE SUSHI",
      image: Client3,
      text: t("testimonialsShusiText"),
      subtext: t("testimonialsShusiSubText"),
      rating: 5,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className={Styles.WebHomeTestimonialSec}>
        <div>
          <h2 className={Styles.webHomeTestimonialTitleText}>
            {t("testimonials")}
          </h2>
        </div>
        <div className="row">
          <div>
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={Styles.HomeTestimonialClientMainCard}
                >
                  <div className={Styles.HomeTestimonialMainContainer}>
                    <div className={Styles.HomeTestimonialClientImgsCard}>
                      <img
                        className={Styles.HomeTestimonialClientImgs}
                        src={testimonial.image}
                        alt={`Testimonial from ${testimonial.name}`}
                      />
                    </div>
                    <h4 className={Styles.HomeTestimonialClientName}>
                      {testimonial.name}
                    </h4>
                    <div className={Styles.HomeTestimonialClientRatinCard}>
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <img key={index} src={Star} alt="Star" />
                      ))}
                    </div>
                    <p className={Styles.HomeTestimonialClientDescription}>
                      {testimonial.text}
                    </p>
                    <p className={Styles.HomeTestimonialClientSubText}>
                      {testimonial.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebHomeTestimonial;
