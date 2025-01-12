import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Client1 from "../../assets/webImages/TestimonialClient1.jpg";
import Client2 from "../../assets/webImages/TestimonialClient2.jpg";
import Client3 from "../../assets/webImages/TestimonialClient3.jpg";
import Star from "../../assets/webImages/StarRating.png";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    id: 1,
    name: "James Pattinson",
    image: Client1,
    text: "“Lobortis leo pretium facilisis amet nisl at nec. Scelerisque risus tortor donec ipsum consequat semper consequat adipiscing ultrices.”",
    rating: 5,
  },
  {
    id: 2,
    name: "Greg Stuart",
    image: Client2,
    text: "“Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer nunc neque accumsan laoreet. Viverra nibh ultrices.”",
    rating: 4,
  },
  {
    id: 3,
    name: "Trevor Mitchell",
    image: Client3,
    text: "“Ut tristique viverra sed porttitor senectus. A facilisis metus pretium ut habitant lorem. Velit vel bibendum eget aliquet sem nec, id sed. Tincidunt.”",
    rating: 3,
  },
];

const WebHomeTestimonial = () => {
  const { t } = useTranslation();

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
          <h2 className={Styles.webHomeTestimonialTitleText}>{t("testimonials")}</h2>
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
