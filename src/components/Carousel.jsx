import React, { useState, useEffect } from "react";
import "../assets/styles/Carousel.css";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const sliderItems = [
    {
      src: "img/4.png",
      alt: "banner",
      title: "",
      description: "",
    },
    {
      src: "img/5.png",
      alt: "banner",
      title: "",
      description: "",
    },
    {
      src: "img/2.png",
      alt: "banner",
      title: "",
      description: "",
    },
  ];

  // Next slide logic: jump to first slide when the last one finishes
  const nextSlide = () => {
    if (current === sliderItems.length - 1) {
      setIsTransitioning(false); // Disable transition effect
      setCurrent(0); // Instantly jump to the first slide
    } else {
      setIsTransitioning(true); // Enable transition for smooth effect
      setCurrent((prev) => prev + 1); // Go to the next slide
    }
  };

  // Previous slide logic
  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Automatically go to the next slide every 5 seconds
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    if (current === sliderItems.length) {
      // When we reach the last slide, disable transition and reset to 0
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 500);
    }
  }, [current]);

  return (
    <div
      className="container"
      style={{ maxWidth: "fit-content", marginBottom: "15px" }}
    >
      <div className="main-slider">
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="slider-wrapper">
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className="slider-item"
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: isTransitioning
                  ? "transform 0.6s ease-in-out"
                  : "none", // Apply transition conditionally
              }}
            >
              <img src={item.src} alt={item.alt} />
              <div className="content">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      <div className="side-section">
        <div className="side-item">
          <img src="img/2.png" alt="Sony WF-1000XM5" />
          <h3>Newly Added</h3>
        </div>
        <div className="side-item">
          <img src="img/1.png" alt="Galaxy Watch Ultra" />
          <h3>New Arrival</h3>
          <p style={{ display: "none" }}>Galaxy AI+ is here</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
