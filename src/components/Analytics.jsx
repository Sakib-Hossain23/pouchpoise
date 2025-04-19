// src/components/Analytics.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Google Analytics Tracking ID
const TRACKING_ID = "G-2K5PGD0E62"; // Replace with your actual GA4 ID

// Initialize GA with enhanced configuration
export const initGA = () => {
  ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100, // Track 100% of site speed data
      cookieDomain: "auto",
      allowAdFeatures: false,
    },
    gtagOptions: {
      send_page_view: true,
      anonymize_ip: true,
    },
  });

  // Set custom dimensions (example)
  ReactGA.gtag("set", "dimension1", "premium_user");
  ReactGA.gtag("set", "dimension2", "desktop");
};

// Enhanced page tracking with additional metrics
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname + location.search;

    // Track pageview with enhanced parameters
    ReactGA.send({
      hitType: "pageview",
      page: page,
      title: document.title,
      location: window.location.href,
      referrer: document.referrer || "direct",
    });

    // Track additional page metrics
    trackPagePerformance(page);

    // Track scroll depth (example)
    trackScrollDepth(page);
  }, [location]);
};

// Track key performance metrics
const trackPagePerformance = (page) => {
  if (window.performance) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;

    ReactGA.gtag("event", "timing_complete", {
      name: "page_load",
      value: loadTime,
      event_category: "Page Timing",
      event_label: page,
    });
  }
};

// Track scroll depth
const trackScrollDepth = (page) => {
  const trackScroll = () => {
    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    );

    if (scrollDepth > 25 && scrollDepth <= 100) {
      ReactGA.gtag("event", "scroll", {
        event_category: "Engagement",
        event_label: `Scrolled ${scrollDepth}% on ${page}`,
        value: scrollDepth,
      });
    }
  };

  window.addEventListener("scroll", trackScroll, { passive: true });
  return () => window.removeEventListener("scroll", trackScroll);
};

// Enhanced event tracking functions
export const trackEvent = (category, action, label, value = null) => {
  ReactGA.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackButtonClick = (buttonName) => {
  trackEvent("UI Interaction", "button_click", buttonName);
};

export const trackFormSubmission = (formName) => {
  trackEvent("Form", "submission", formName);
};

export const trackProductView = (productId, productName) => {
  trackEvent("Ecommerce", "product_view", productName, productId);
};

export const trackAddToCart = (productId, productName, quantity, price) => {
  ReactGA.gtag("event", "add_to_cart", {
    items: [
      {
        item_id: productId,
        item_name: productName,
        quantity: quantity,
        price: price,
      },
    ],
  });
};

export const trackPurchase = (transactionId, items, value, tax, shipping) => {
  ReactGA.gtag("event", "purchase", {
    transaction_id: transactionId,
    value: value,
    tax: tax,
    shipping: shipping,
    currency: "USD",
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// Enhanced Analytics component with error tracking
const Analytics = () => {
  useEffect(() => {
    // Initialize GA
    initGA();

    // Track initial page
    ReactGA.send("pageview");

    // Track site engagement
    trackEvent("Site", "visit", "Initial Visit");

    // Track browser features
    trackBrowserFeatures();

    // Track errors
    setupErrorTracking();

    // Track outbound links
    setupOutboundLinkTracking();

    // Track file downloads
    setupDownloadTracking();
  }, []);

  usePageTracking();

  return null;
};

// Track browser features and capabilities
const trackBrowserFeatures = () => {
  const features = {
    cookies: navigator.cookieEnabled ? "enabled" : "disabled",
    javascript: true,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    device_pixel_ratio: window.devicePixelRatio || 1,
    online: navigator.onLine,
    touch_support: "ontouchstart" in window,
  };

  ReactGA.gtag("event", "browser_features", features);
};

// Track JavaScript errors
const setupErrorTracking = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    trackEvent("Error", "javascript_error", message, {
      source: source,
      line: lineno,
      column: colno,
      error: error ? error.stack : "No stack trace",
    });
    return false; // Let the error propagate
  };

  window.addEventListener("unhandledrejection", (event) => {
    trackEvent(
      "Error",
      "unhandled_promise_rejection",
      event.reason.toString(),
      {
        reason:
          event.reason instanceof Error ? event.reason.stack : event.reason,
      }
    );
  });
};

// Track outbound links
const setupOutboundLinkTracking = () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.href && !link.href.startsWith(window.location.origin)) {
      trackEvent("Outbound Link", "click", link.href);

      // Delay navigation to ensure the event is sent
      if (!link.target || link.target === "_self") {
        e.preventDefault();
        setTimeout(() => (window.location.href = link.href), 150);
      }
    }
  });
};

// Track file downloads
const setupDownloadTracking = () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.href) {
      const extensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
      ];
      const isDownload = extensions.some((ext) =>
        link.href.endsWith(`.${ext}`)
      );

      if (isDownload) {
        trackEvent("Download", link.href.split(".").pop(), link.href);
      }
    }
  });
};

export default Analytics;
