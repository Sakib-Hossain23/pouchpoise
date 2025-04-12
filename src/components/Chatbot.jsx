import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaTimes } from "react-icons/fa";
import "../assets/styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const phoneNumber = "+8801704354694";
  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in Gadget Galaxy!"
  );
  const facebookPage = "your-facebook-page-id"; // Replace with your Facebook page ID or username

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getWhatsAppUrl = () => {
    const baseUrl = isMobile
      ? "https://api.whatsapp.com"
      : "https://web.whatsapp.com";
    return `${baseUrl}/send?phone=${phoneNumber}&text=${whatsappMessage}`;
  };

  const getMessengerUrl = () => {
    return `https://m.me/PouchPoise`;
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsAnimating(true);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Button */}
      <button className="chat-toggle" onClick={toggleChat}>
        <span className="online-status"></span>
        <div className="chat-icon-wrapper">
          {isOpen ? (
            <FaTimes className="chat-icon close-icon" />
          ) : (
            <FaWhatsapp className="chat-icon whatsapp-icon" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          className={`whatsapp-chat ${isAnimating ? "opening" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="chat-header">
            <span>Chat with Us</span>
            <FaTimes className="close-btn" onClick={toggleChat} />
          </div>
          <div className="chat-body">
            <p>How would you like to chat with us?</p>

            <div className="chat-options">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-option whatsapp-option"
                onClick={() => setIsOpen(false)}
              >
                <FaWhatsapp className="option-icon" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getMessengerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-option messenger-option"
                onClick={() => setIsOpen(false)}
              >
                <FaFacebookMessenger className="option-icon" />
                <span>Messenger</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
