import React from "react";
import Products from "./Products";
import Carousel from "./Carousel";
import Banner from "./Banner";
import PG from "./PG";

import NewArrival from "./NewArrival";

const Hero = ({ addToCart }) => {
  return (
    <div>
      <Carousel />
      {/* Remove Search Bar */}
      <Products addToCart={addToCart} />
      <Banner />
      <NewArrival addToCart={addToCart} />

      <PG />
    </div>
  );
};

export default Hero;
