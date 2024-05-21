import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [slider, setslider] = useState([]);
  // console.log(slider);
  const gettestinonials = () => {
    axios
      .get("https://food-ecom-backend-1.onrender.com/api/v1/admin/getslider")
      .then(function (response) {
        // handle success
        // console.log(response.data.product);
        setslider(response.data.slider);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    gettestinonials();
  }, []);

  return (
    <Slider {...settings}>
      {slider?.map((items) => {
        return (
          <div>
            <p className="review__text">"{items.discription}"</p>
            <div className=" slider__content d-flex align-items-center gap-3 ">
              <img
                src={`https://food-ecom-backend-1.onrender.com/slider/${items.image}`}
                alt="avatar"
                className=" rounded"
              />
              <h6>{items.title}</h6>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default TestimonialSlider;
