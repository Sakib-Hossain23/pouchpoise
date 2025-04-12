import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/Navbar.css";

const Navbar = ({
  cart,
  searchQuery,
  setSearchQuery,
  setIsSearchModalOpen,
  setIsRegisterModalOpen,
}) => {
  // State for managing menu and dropdowns
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmartWatchDropdownOpen, setIsSmartWatchDropdownOpen] =
    useState(false);
  const [isSmartWatchSubDropdownOpen, setIsSmartWatchSubDropdownOpen] =
    useState(false);
  const [isCoverDropdownOpen, setIsCoverDropdownOpen] = useState(false);
  const [isCoverSubDropdownOpen, setIsCoverSubDropdownOpen] = useState(false);
  const [isLaptopDesktopDropdownOpen, setIsLaptopDesktopDropdownOpen] =
    useState(false);
  const [isLaptopDesktopSubDropdownOpen, setIsLaptopDesktopSubDropdownOpen] =
    useState(false);
  const [isPowerAccessoriesDropdownOpen, setIsPowerAccessoriesDropdownOpen] =
    useState(false);
  const [
    isPowerAccessoriesSubDropdownOpen,
    setIsPowerAccessoriesSubDropdownOpen,
  ] = useState(false);

  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL

  // Set the active button based on the current route
  useEffect(() => {
    if (location.pathname === "/") setActiveButton("home");
    else if (location.pathname === "/cart") setActiveButton("cart");
    else if (location.pathname === "/blog") setActiveButton("blog");
    else if (location.pathname === "/phone") setActiveButton("phone");
  }, [location.pathname]); // Re-run when the location changes

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close all dropdowns and menus
  const closeAllMenus = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsSmartWatchDropdownOpen(false);
    setIsSmartWatchSubDropdownOpen(false);
    setIsCoverDropdownOpen(false);
    setIsCoverSubDropdownOpen(false);
    setIsLaptopDesktopDropdownOpen(false);
    setIsLaptopDesktopSubDropdownOpen(false);
    setIsPowerAccessoriesDropdownOpen(false);
    setIsPowerAccessoriesSubDropdownOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchModalOpen(true);
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setIsSearchModalOpen(true);
    }
  };

  // Handle user icon click
  const handleUserClick = () => {
    setIsRegisterModalOpen(true);
  };

  // Prevent default link behavior
  const preventDefaultLink = (e) => {
    e.preventDefault();
  };

  // Handle button click for active state
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  // Define button styles with active state
  const buttonStyles = (button) => {
    const isActive = activeButton === button;
    return {
      backgroundColor: "#8a8a8a",
      boxShadow: isActive ? "0 0 15px #f7941d" : "none",
      width: "47px",
      height: "47px",
    };
  };

  return (
    <nav className="navbar">
      {/* Top section of the navbar */}
      <div className="navbar-top">
        {/* Logo section */}
        <Link
          to="/"
          className="footer-button"
          onClick={() => {
            closeAllMenus();
            window.scrollTo(0, 0);
          }}
        >
          <div className="navbar-logo">
            <img
              src="/img/pp logo3.png"
              alt="GoGadget Store Logo"
              className="logo-tilt"
              style={{ height: "35px", width: "auto", marginLeft: "23px" }}
            />
            <p>PouchPoise</p>
          </div>
        </Link>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
          <button onClick={() => setIsSearchModalOpen(true)}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Icons section */}
        <div className="navbar-icons">
          {/* Home button */}
          <div className="navbar-item">
            <Link
              to="/"
              className="footer-button"
              onClick={() => {
                window.scrollTo(0, 0);
                handleButtonClick("home");
              }}
            >
              <button
                className="btn btn-md-square rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={buttonStyles("home")}
              >
                <i className="fas fa-home text-white"></i>
                <span
                  className="text-white"
                  style={{
                    fontSize: "9px",
                    marginTop: "-4px",
                    marginBottom: "-3px",
                  }}
                >
                  Home
                </span>
              </button>
            </Link>
          </div>

          {/* Cart button */}
          <div className="navbar-item">
            <button
              className="btn btn-md-square rounded-circle position-relative d-flex flex-column align-items-center justify-content-center"
              style={buttonStyles("cart")}
              onClick={() => {
                handleButtonClick("cart");
                navigate("/cart");
              }}
            >
              <i className="fas fa-shopping-cart"></i>
              <span
                className="badge bg-danger position-absolute"
                style={{
                  top: "-9px",
                  right: "-9px",
                  fontSize: "0.6rem",
                  padding: "0.2rem 0.4rem",
                  minWidth: "1.5rem",
                  textAlign: "center",
                }}
              >
                {cart.length}
              </span>
              <span
                className="text-white"
                style={{
                  fontSize: "9px",
                  marginTop: "-4px",
                  marginBottom: "-3px",
                }}
              >
                Cart
              </span>
            </button>
          </div>

          {/* Blog button */}
          <div className="navbar-item">
            <Link
              to="/blog"
              style={{ textDecoration: "none" }}
              onClick={() => handleButtonClick("blog")}
            >
              <button
                className="btn btn-md-square rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={buttonStyles("blog")}
              >
                <i
                  className="fas fa-blog text-white"
                  style={{ fontSize: "17px", marginLeft: "6px" }}
                ></i>
                <span
                  className="text-white"
                  style={{
                    fontSize: "9px",
                    marginTop: "-4px",
                    marginBottom: "-3px",
                  }}
                >
                  Blog
                </span>
              </button>
            </Link>
          </div>

          {/* Phone button */}
          <div className="navbar-item">
            <a href="tel:+8801945552594" style={{ textDecoration: "none" }}>
              <button
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#8a8a8a",
                  color: "#fff",
                  padding: "-1px 15px",
                  borderRadius: "3px",
                  fontSize: "1rem",
                  gap: "8px",
                  border: "none",
                  boxShadow:
                    activeButton === "phone" ? "0 0 15px #f7941d" : "none",
                }}
                onClick={() => handleButtonClick("phone")}
              >
                <i className="fas fa-phone-alt"></i>
                +8801945552594
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="menu-button" onClick={toggleMenu}>
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Bottom section of the navbar (dropdowns) */}
      <div className={`navbar-bottom ${isOpen ? "menu-open" : ""}`}>
        <ul>
          {/* Blog link */}
          <li>
            <Link to="/blog" onClick={closeAllMenus}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" onClick={closeAllMenus}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" onClick={closeAllMenus}>
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link to="/delivery-terms" onClick={closeAllMenus}>
              Delivery Terms & Conditions
            </Link>
          </li>

          <li>
            <Link to="/return-policy" onClick={closeAllMenus}>
              Return Policy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
