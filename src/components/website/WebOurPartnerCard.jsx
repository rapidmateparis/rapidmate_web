import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Partner1 from "../../assets/webImages/dominos1.png";
import Partner2 from "../../assets/webImages/pizzahut.png";
import Partner3 from "../../assets/webImages/sushi.png";

const partners = [
  {
    id: 1,
    image: Partner1,
  },
  {
    id: 2,
    image: Partner2,
  },
  {
    id: 3,
    image: Partner3,
  },
];

const WebOurPartnerCard = () => {
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
      <section className={Styles.WebPartnersSec}>
        <h2 className={Styles.WebPartnersTitleText}>Our <span>Partners</span></h2>
        <div>
          <Slider {...settings}>
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={Styles.HomeTestimonialClientMainCard}
              >
                <img
                  src={partner.image}
                  alt={`Partner ${partner.id}`}
                  className={Styles.PartnerImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default WebOurPartnerCard;
