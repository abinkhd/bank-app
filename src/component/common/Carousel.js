import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [currImage, setCurrImage] = useState(1);
  const totalSlides = 3;

  useEffect(() => {
    const changeSlide = setInterval(() => {
      setCurrImage((prevState) => (prevState % totalSlides) + 1);
    }, 2000);
    return () => clearInterval(changeSlide);
  }, [currImage]);

  return (
    <div className="container">
      <div className="slide">
        <img
          src={`bank${currImage}.jpg`}
          alt="Banking images"
          width="1100px"
          height="320px"
        ></img>
      </div>
    </div>
  );
};

export default Carousel;
