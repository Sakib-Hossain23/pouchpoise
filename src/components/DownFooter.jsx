import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/DownFooter.css";

const DownFooter = ({ cart, setIsRegisterModalOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBtn, setActiveBtn] = useState("/");

  useEffect(() => {
    if (location.pathname !== "call") {
      setActiveBtn(location.pathname);
    }
  }, [location.pathname]);

  const handleUserIconClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleNavigate = (path) => {
    setActiveBtn(path);
    navigate(path);
  };

  const handleCallClick = () => {
    setActiveBtn("call");

    // Remove "call" active status after 2 seconds
    setTimeout(() => {
      setActiveBtn(location.pathname);
    }, 2000);
  };

  return (
    <footer className="down-footer">
      {/* Home Button */}
      <Link
        to="/"
        className="footer-button"
        onClick={() => {
          setActiveBtn("/");
          window.scrollTo(0, 0);
        }}
      >
        <button
          className={`footer-btn home-btn ${activeBtn === "/" ? "active" : ""}`}
        >
          <i className="fas fa-home footer-icon"></i>
          <span className="footer-label">Home</span>
        </button>
      </Link>

      {/* Cart Button */}
      <button
        className={`footer-btn cart-btn ${
          activeBtn === "/cart" ? "active" : ""
        }`}
        onClick={() => handleNavigate("/cart")}
      >
        <i className="fas fa-shopping-cart footer-icon"></i>
        <span className="cart-badge">{cart.length}</span>
        <span className="footer-label">Cart</span>
      </button>

      {/* Blog Button */}
      <Link
        to="/blog"
        className="footer-link"
        onClick={() => setActiveBtn("/blog")}
      >
        <button
          className={`footer-btn blog-btn ${
            activeBtn === "/blog" ? "active" : ""
          }`}
        >
          <i className="fas fa-blog footer-icon"></i>
          <span className="footer-label">Blog</span>
        </button>
      </Link>

      {/* Phone Button */}
      <a href="tel:+8801945552594" className="footer-link">
        <button
          className={`footer-btn phone-btn ${
            activeBtn === "call" ? "active" : ""
          }`}
          onClick={handleCallClick}
        >
          <i className="fas fa-phone-alt footer-icon"></i>
          <span className="footer-label">Call</span>
        </button>
      </a>
    </footer>
  );
};

export default DownFooter;
