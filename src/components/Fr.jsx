import { Link } from "react-router-dom";

import React from "react";
import "../assets/styles/Fr.css";

const Fr = () => {
  return (
    <div className="frc">
      <div className="fr-container">
        <div className="customer-support">
          <h3>Customer Support</h3>

          <div className="phone-box">
            <a href="tel:+8801945552594">
              <i className="fas fa-phone-alt"></i>
              <br />
              <span>+8801945552594</span>
            </a>
          </div>

          <div className="store-location-box">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <small>Store Location</small>
              <span>ECB Chattar, Malibagh, Dhaka 1217, Bangladesh</span>
            </div>
          </div>

          <div className="social-media-links">
            <a
              href="https://www.facebook.com/PouchPoise"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/pouch_poise/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="locations">
            <p>
              Email:{" "}
              <a href="mailto:sadmansakib794124@gmail.com">
                sadmansakib794124@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="locations">
          <h3>Policy & Conditions</h3>

          <small className="locations">
            <Link to="/terms">Terms and Conditions</Link>
          </small>

          <br />
          <small>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </small>
          <br />

          <small>
            <Link to="/return-policy">Return Policy</Link>
          </small>
          <br />
          <small>
            <Link to="/delivery-terms">Delivery Terms & Conditions</Link>
          </small>
        </div>

        <div className="locations">
          <h3>About Us</h3>
          <small>
            Welcome to our PouchPoise store — <br />
            where style meets functionality. We're
            <br /> passionate about delivering premium-quality
            <br /> pouch bags for all your everyday and travel needs.
          </small>

          <br />
          <small>
            From compact essentials to spacious organizers,
            <br /> we craft each pouch with care and precision.
          </small>
          <br />

          <small>
            Visit us online to explore our versatile collection
            <br /> made to suit every lifestyle.
          </small>
          <br />
          <small>
            Thank you for choosing us to carry your essentials
            <br /> in style!
          </small>
        </div>
      </div>
      <div className="fr-bottom">
        <p>© 2025 PouchPoise | All rights reserved</p>
      </div>
    </div>
  );
};

export default Fr;
