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
    <div className="slideshow-container">
      <div className={`slide`}>
        {/* <p>{currImage}</p> */}
        <img src={`bank${currImage}.jpg`} alt="Banking images"></img>
      </div>
    </div>
  );
};

export default Carousel;
