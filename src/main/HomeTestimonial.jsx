import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Client1 from "../assets/images/Client-1.jpeg";
import Client2 from "../assets/images/Client-2.jpeg";
import Client3 from "../assets/images/Client-3.jpeg";
import Quote from "../assets/images/clarity_block-quote-line.png";
import Styles from "../assets/css/home.module.css"

const testimonials = [
  {
    id: 1,
    name: "Hannah Schmitt",
    image: Client1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
    designation: "Lead designer",
  },
  {
    id: 2,
    name: "Hannah Schmitt",
    image: Client2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
    designation: "Lead designer",
  },
  {
    id: 3,
    name: "Hannah Schmitt",
    image: Client3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
    designation: "Lead designer",
  },
];

const HomeTestimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
    <section className={Styles.HomeTestimonialClientSec}>
      <div className="container">
        <div className="row">
          <div className={Styles.HomeourServicesTitleMainCard}>
            <h2 className={Styles.HomeourServicesTitle}>
              What Our Clients Say About Us
            </h2>
          </div>
          <div className="col-md-12">
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={Styles.HomeTestimonialClientMainCard}>
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
                  <p className={Styles.HomeTestimonialClientDesignation}>
                    {testimonial.designation}
                  </p>
                  <div className={Styles.HomeTestimonialClientImgsCard}>
                    <img
                      className={Styles.HomeTestimonialQuoteImg}
                      src={Quote}
                      alt="Quote line"
                    />
                  </div>
                  <p className={Styles.HomeTestimonialClientDescription}>
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;
