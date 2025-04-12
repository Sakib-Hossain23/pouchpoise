import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/Checkout.css"; // Importing styles
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation
import emailjs from "@emailjs/browser"; // Import EmailJS
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import html2canvas from "html2canvas"; // Import html2canvas for capturing HTML content

// Alert Notification Component
const AlertNotification = ({ message, onClose, type }) => {
  return (
    <div className={`alert-notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

// Product Item Component
const ProductItem = ({ product, quantity }) => {
  return (
    <div className="item">
      <img src={product.image} alt={product.name} />
      <div>
        <p>
          <strong>{product.name}</strong>
          <br />
          {product.selectedColor && (
            <span style={{ color: "orange" }}>
              Color: {product.selectedColor}
              <br />
            </span>
          )}
          {product.selectedStorage && (
            <span style={{ color: "orange" }}>
              Storage: {product.selectedStorage}
              <br />
            </span>
          )}
          <span style={{ color: "black" }}>Quantity: {quantity}</span>
        </p>
      </div>
      <p>{`BDT ${product.price}`}</p>
    </div>
  );
};

// Billing Details Form Component
const BillingForm = ({
  billingDetails,
  handleInputChange,
  isOnlinePayment,
  fullNameRef,
  phoneNumberRef,
  addressRef,
  emailRef,
  highlightsField,
  isOrderCompleted,
  handleKeyDown,
  errors,
  handleDeliveryAreaChange,
}) => {
  return (
    <div className="billing-details">
      <label htmlFor="full-name">
        Full Name <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="full-name"
        name="fullName"
        value={billingDetails.fullName}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "fullName")}
        placeholder="Enter your full name"
        required
        ref={fullNameRef}
        className={highlightsField === "fullName" ? "highlights" : ""}
        disabled={isOrderCompleted}
      />

      <label htmlFor="email">
        Email <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={billingDetails.email}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "email")}
        placeholder="Enter your email"
        required
        ref={emailRef}
        className={highlightsField === "email" ? "highlights" : ""}
        disabled={isOrderCompleted}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}

      <label htmlFor="phone-number">
        Phone Number <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="phone-number"
        name="phoneNumber"
        value={billingDetails.phoneNumber}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "phoneNumber")}
        placeholder="Enter your phone number"
        required
        ref={phoneNumberRef}
        className={highlightsField === "phoneNumber" ? "highlights" : ""}
        disabled={isOrderCompleted}
      />
      {errors.phoneNumber && (
        <span className="error-message">{errors.phoneNumber}</span>
      )}

      <label htmlFor="address">
        Full Address <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={billingDetails.address}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, "address")}
        placeholder="Enter your full address with area details"
        required
        ref={addressRef}
        className={highlightsField === "address" ? "highlights" : ""}
        disabled={isOrderCompleted}
      />

      <label>
        Delivery Charge <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <div className="delivery-area-options">
        <label>
          <input
            type="radio"
            name="deliveryArea"
            value="insideDhaka"
            checked={billingDetails.deliveryArea === "insideDhaka"}
            onChange={handleDeliveryAreaChange}
            disabled={isOrderCompleted}
          />
          Inside Dhaka (BDT 80)
        </label>
        <label>
          <input
            type="radio"
            name="deliveryArea"
            value="outsideDhaka"
            checked={billingDetails.deliveryArea === "outsideDhaka"}
            onChange={handleDeliveryAreaChange}
            disabled={isOrderCompleted}
          />
          Outside Dhaka (BDT 120)
        </label>
      </div>
    </div>
  );
};

// Payment Method Component
const PaymentMethod = ({
  isOnlinePayment,
  handlePaymentMethodChange,
  isOrderCompleted,
}) => {
  return (
    <div className="payment-method">
      <button
        className={isOnlinePayment ? "" : "active"}
        onClick={() => handlePaymentMethodChange("cod")}
        disabled={isOrderCompleted}
      >
        Cash on Delivery
      </button>
    </div>
  );
};

// Checkout Component
const Checkout = ({ cart, updateCart, setOrderHistory }) => {
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    deliveryArea: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [highlightsField, setHighlightsField] = useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  });

  const fullNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const confirmOrderButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price) || 0;
      return total + price * product.quantity;
    }, 0);
  };

  const getDeliveryCharge = () => {
    if (billingDetails.deliveryArea === "insideDhaka") {
      return 80;
    } else if (billingDetails.deliveryArea === "outsideDhaka") {
      return 120;
    }
    return 0;
  };

  const deliveryCharge = getDeliveryCharge();
  const totalPrice = calculateSubtotal() + deliveryCharge;

  const handlePaymentMethodChange = (method) => {
    setIsOnlinePayment(method === "online");
  };

  const handleDeliveryAreaChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      deliveryArea: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.trim().length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }

    if (name === "phoneNumber") {
      if (!validatePhoneNumber(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Please enter a valid phone number.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "",
        }));
      }
    }

    setHighlightsField(null);
  };

  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const fieldsOrder = ["fullName", "email", "phoneNumber", "address"];
      const currentIndex = fieldsOrder.indexOf(fieldName);

      if (fieldName === "email" && !validateEmail(billingDetails.email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
        emailRef.current.focus();
        emailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      let nextEmptyFieldRef = null;
      for (let i = 0; i < fieldsOrder.length; i++) {
        const field = fieldsOrder[i];
        if (!billingDetails[field]) {
          nextEmptyFieldRef =
            field === "fullName"
              ? fullNameRef
              : field === "email"
              ? emailRef
              : field === "phoneNumber"
              ? phoneNumberRef
              : addressRef;
          break;
        }
      }

      if (nextEmptyFieldRef && nextEmptyFieldRef.current) {
        nextEmptyFieldRef.current.focus();
        nextEmptyFieldRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        e.target.blur();
        scrollToConfirmOrderButton();
      }
    }
  };

  const scrollToConfirmOrderButton = () => {
    if (
      billingDetails.fullName &&
      billingDetails.email &&
      validateEmail(billingDetails.email) &&
      billingDetails.phoneNumber &&
      billingDetails.address &&
      billingDetails.deliveryArea
    ) {
      if (confirmOrderButtonRef.current) {
        confirmOrderButtonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setAlertMessage("Now Press 'Confirm Order'");
        setAlertType("info");
        setShowAlert(true);
      }
    } else {
      if (!validateEmail(billingDetails.email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
        emailRef.current.focus();
        emailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleConfirmOrder = () => {
    if (
      !billingDetails.fullName ||
      !billingDetails.email ||
      !billingDetails.phoneNumber ||
      !billingDetails.address ||
      !billingDetails.deliveryArea
    ) {
      setAlertMessage("Please fill in all required fields.");
      setAlertType("error");
      setShowAlert(true);

      if (!billingDetails.fullName) {
        setHighlightsField("fullName");
        fullNameRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!billingDetails.email) {
        setHighlightsField("email");
        emailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!billingDetails.phoneNumber) {
        setHighlightsField("phoneNumber");
        phoneNumberRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!billingDetails.address) {
        setHighlightsField("address");
        addressRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!billingDetails.deliveryArea) {
        setAlertMessage("Please select delivery area.");
        setAlertType("error");
        setShowAlert(true);
      }

      return;
    }

    if (!validateEmail(billingDetails.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      setHighlightsField("email");
      emailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!validatePhoneNumber(billingDetails.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid phone number.",
      }));
      setHighlightsField("phoneNumber");
      phoneNumberRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setAlertMessage("Order confirmed successfully!");
    setAlertType("success");
    setShowAlert(true);
    setIsOrderCompleted(true);
    sendEmail();
    generatePDF();

    const order = {
      id: new Date().getTime(),
      date: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      products: cart,
      billingDetails,
      totalPrice,
    };
    setOrderHistory((prevHistory) => [...prevHistory, order]);
  };

  const sendEmail = () => {
    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const templateParams = {
      full_name: billingDetails.fullName,
      email: billingDetails.email,
      phone_number: billingDetails.phoneNumber,
      address: billingDetails.address,
      delivery_area:
        billingDetails.deliveryArea === "insideDhaka"
          ? "Inside Dhaka"
          : "Outside Dhaka",
      message: `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Color</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Storage</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${cart
              .map(
                (product) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  product.name
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  product.selectedColor || "-"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  product.selectedStorage || "-"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  product.quantity
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">BDT ${
                  product.price
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `,
      products_images: cart.map((product) => product.image).join(", "),
      time: formattedTime,
      subtotal: calculateSubtotal(),
      delivery_charge: deliveryCharge,
      total_price: totalPrice,
    };

    emailjs
      .send(
        "service_h6ybs3r",
        "template_7bdiw8a",
        templateParams,
        "Owp90VQNurKpZjmuU"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const generatePDF = () => {
    const timestamp = new Date().getTime();
    const fileName = `order_summary_${timestamp}.pdf`;

    const pdfContainer = document.createElement("div");
    pdfContainer.style.position = "absolute";
    pdfContainer.style.left = "-9999px";
    pdfContainer.style.width = "794px";
    pdfContainer.style.padding = "20px";
    document.body.appendChild(pdfContainer);

    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    pdfContainer.innerHTML = `
       <div style="font-family: Arial, sans-serif;">
            <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 26px;">
           <h1
  style="
    background: linear-gradient(135deg, #08ad74, #0ac987);
    color: white;
    margin: 0;
    padding: 5px 0;
    text-align: center;
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: 1px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 12px rgba(8, 173, 116, 0.3);
    position: relative;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 3px;
    margin-bottom: 10px;
  "
>
  <span style="display: inline-block; position: relative; z-index: 2">
    Pouc<span
      style="
        color: #e6fff2;
        text-shadow: 0 0 8px rgba(230, 255, 242, 0.5);
        font-weight: 900;
      "
      >h</span
    >Poise
  </span>
  <span
    style="
      position: absolute;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      background: radial-gradient(
        circle,
        rgba(230, 255, 242, 0.2) 0%,
        rgba(230, 255, 242, 0) 60%
      );
      transform: rotate(30deg);
      z-index: 1;
      animation: shine 3s infinite;
    "
  ></span>
</h1>
           
                <h2 style="color: #333; margin-bottom: 10px;">Customer Information</h2>
                <p><strong>Name:</strong> ${billingDetails.fullName}</p>
                <p><strong>Email:</strong> ${billingDetails.email}</p>
                <p><strong>Phone:</strong> ${billingDetails.phoneNumber}</p>
                <p><strong>Address:</strong> ${billingDetails.address}</p>
                <p><strong>Delivery Area:</strong> ${
                  billingDetails.deliveryArea === "insideDhaka"
                    ? "Inside Dhaka"
                    : "Outside Dhaka"
                }</p>
                <p><strong>Order Time:</strong> ${formattedTime}</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h2 style="color: #333; margin-bottom: 10px;margin-top: -5px;">Order Summary</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Details</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart
                      .map(
                        (product) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                <div style="display: flex; align-items: center;">
                                    <img src="${product.image}" alt="${
                          product.name
                        }" 
                                         style="width: 50px; height: 50px; margin-right: 10px; object-fit: contain;">
                                    <span>${product.name}</span>
                                </div>
                            </td>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${
                                  product.selectedColor
                                    ? `<p>Color: ${product.selectedColor}</p>`
                                    : ""
                                }
                                ${
                                  product.selectedStorage
                                    ? `<p>Storage: ${product.selectedStorage}</p>`
                                    : ""
                                }
                            </td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                              product.quantity
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">BDT ${
                              product.price
                            }</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>

            <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                <div style="max-width: 300px">
                <div style="max-width: 300px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span><strong>Subtotal:</strong></span>
                    <span>BDT ${calculateSubtotal()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span><strong>Delivery Charge:</strong></span>
                    <span>BDT ${deliveryCharge} (${
      billingDetails.deliveryArea === "insideDhaka"
        ? "Inside Dhaka"
        : "Outside Dhaka"
    })</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
                    <span><strong>Total:</strong></span>
                    <span style="color: #000000;">BDT ${totalPrice}</span>
                </div>
            </div>
            </div>

            <br><br><div style="color: #333; padding: 20px; text-align: center; font-size: 14px;">
        <p style="margin: 0; font-weight: bold;">© 2025 <span style="color: #08ad74;">PouchPoise</span>.</p>
        </div>
    `;

    html2canvas(pdfContainer, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      const pageHeight = pdf.internal.pageSize.getHeight();
      if (imgHeight > pageHeight) {
        let remainingHeight = imgHeight - pageHeight;
        while (remainingHeight > 0) {
          pdf.addPage();
          position = position - pageHeight;
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          remainingHeight -= pageHeight;
        }
      }

      pdf.save(fileName);
      document.body.removeChild(pdfContainer);
    });
  };

  return (
    <div className="container">
      {showAlert && (
        <AlertNotification
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          type={alertType}
        />
      )}

      <div className="leftt">
        <div className="alert">
          For any order-related questions, contact customer service at{" "}
          <strong>
            <span style={{ color: "#ff7601" }}>+8801945552594</span>
          </strong>
        </div>

        <h3>Payment Method</h3>
        <PaymentMethod
          isOnlinePayment={isOnlinePayment}
          handlePaymentMethodChange={handlePaymentMethodChange}
          isOrderCompleted={isOrderCompleted}
        />

        <h3>Billing Details</h3>
        <BillingForm
          billingDetails={billingDetails}
          handleInputChange={handleInputChange}
          isOnlinePayment={isOnlinePayment}
          fullNameRef={fullNameRef}
          phoneNumberRef={phoneNumberRef}
          addressRef={addressRef}
          emailRef={emailRef}
          highlightsField={highlightsField}
          isOrderCompleted={isOrderCompleted}
          handleKeyDown={handleKeyDown}
          errors={errors}
          handleDeliveryAreaChange={handleDeliveryAreaChange}
        />

        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            required
            disabled={isOrderCompleted}
          />
          <label htmlFor="terms">
            I have read and agree to the{" "}
            <Link to="/terms" rel="noopener noreferrer">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" rel="noopener noreferrer">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
      </div>

      <div className="rightt">
        <h3>Your Order</h3>
        <div className="order-summary" id="order-summary">
          {cart.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={product.quantity}
            />
          ))}
        </div>

        <div className="summary">
          <p>
            Subtotal: <strong>BDT {calculateSubtotal()}</strong>
          </p>
          <p>
            Delivery Charge:{" "}
            <span style={{ color: "orange" }}>
              {billingDetails.deliveryArea === "insideDhaka"
                ? "BDT 80 (Inside Dhaka)"
                : billingDetails.deliveryArea === "outsideDhaka"
                ? "BDT 120 (Outside Dhaka)"
                : "(Select delivery area)"}
            </span>
          </p>
          <p className="total">
            Total: <strong>BDT {totalPrice}</strong>
          </p>
        </div>

        <button
          className="confirm-order-button"
          onClick={handleConfirmOrder}
          disabled={isOrderCompleted}
          ref={confirmOrderButtonRef}
        >
          {isOrderCompleted ? "Order Confirmed" : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
