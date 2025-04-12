import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/Products.css";

function RelatedProducts({ addToCart, currentProduct }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [outOfStockClicked, setOutOfStockClicked] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [title, setTitle] = useState("Featured Products");
  const [showRelatedProducts, setShowRelatedProducts] = useState(true);

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();
  const productsContainerRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Bow Barrel Bag",
      brand: "Bag",
      price: ["920৳"],
      oldPrice: [""],
      image: "/img/pp2.jpg",
      images: [
        "/img/pp2.jpg",
        "/img/pp1.jpeg",
        "/img/pp3.jpeg",
        "/img/pp4.jpeg",
      ],

      model: {
        phoneName: "iPhone 16 Plus",

        color: "Cream",
      },

      stock: "in-stock",
      colors: ["Cream"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5 inch",
        Width: "↔️ 11 inch",
      },

      description: "The perfect blend of elegance and cuteness 🎀🎀",
    },

    {
      id: 2,
      name: "Bow Barrel Bag",
      brand: "Bag",
      price: ["920৳"],
      oldPrice: [""],
      image: "/img/pp5.jpg",
      images: ["/img/pp5.jpg", "/img/pp6.jpeg", "/img/pp7.jpeg"],
      model: {
        phoneName: "iPhone 16 Plus",
        color: "Black",
      },
      stock: "in-stock",
      colors: ["Black"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5 inch",
        Width: "↔️ 11 inch",
      },

      description: "The perfect blend of elegance and cuteness 🎀🎀",
    },

    {
      id: 3,
      name: "Bow Barrel Bag",
      brand: "Bag",
      price: ["920৳"],
      oldPrice: [""],
      image: "/img/pp8.jpg",
      images: ["/img/pp8.jpg", "/img/pp9.jpeg", "/img/pp10.jpeg"],

      model: {
        phoneName: "iPhone 16 Plus",
        color: "White",
      },

      stock: "in-stock",
      colors: ["White"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5 inch",
        Width: "↔️ 11 inch",
      },

      description: "The perfect blend of elegance and cuteness 🎀🎀",
    },

    {
      id: 4,
      name: "Shoulder bag",
      brand: "Bag",
      price: ["950৳"],
      oldPrice: [""],
      image: "/img/pp12.jpg",
      images: ["/img/pp12.jpg", "/img/pp11.jpeg", "/img/pp13.jpeg"],

      model: {
        phoneName: "iPhone 16 Plus",
        color: "Light Pink",
      },

      stock: "in-stock",
      colors: ["Light Pink"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5.6 inch",
        Width: "↔️ 11.7 inch",
        InnerSpace: "Spacious of 5 inch",
      },

      description: "Designed to Impress, Made to Adore.",
    },

    {
      id: 5,
      name: "Shoulder bag",
      brand: "Bag",
      price: ["850৳"],
      oldPrice: [""],
      image: "/img/pp14.jpg",
      images: ["/img/pp14.jpg", "/img/pp15.jpeg", "/img/pp16.jpeg"],

      model: {
        phoneName: "iPhone 16 Plus",
        color: "Black",
      },

      stock: "in-stock",
      colors: ["Black"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5.5 inch",
        Width: "↔️ 9.5 inch",
      },

      description: "Glossy, bold and effortlessly stylish – just like you. ❤️",
    },

    {
      id: 6,
      name: "Shoulder bag",
      brand: "Bag",
      price: ["850৳"],
      oldPrice: [""],
      image: "/img/pp17.jpg",
      images: ["/img/pp17.jpg", "/img/pp18.jpeg", "/img/pp19.jpeg"],
      model: {
        phoneName: "iPhone 16 Plus",
        color: "Red",
      },

      stock: "in-stock",
      colors: ["Red"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5.5 inch",
        Width: "↔️ 9.5 inch",
      },

      description: "Glossy, bold and effortlessly stylish – just like you. ❤️",
    },

    {
      id: 7,
      name: "Shoulder bag",
      brand: "Bag",
      price: ["850৳"],
      oldPrice: [""],
      image: "/img/pp20.jpg",
      images: [
        "/img/pp20.jpg",
        "/img/pp21.jpeg",
        "/img/pp22.jpeg",
        "/img/pp23.jpeg",
      ],
      model: {
        phoneName: "iPhone 16 Plus",
        color: "White",
      },

      stock: "in-stock",
      colors: ["White"],

      specifications: {
        Origin: "China",
        Material: "PU leather",
        Height: " ↕️ 5.1 inch",
        Width: "↔️ 8.7 inch",
      },

      description: "Designed to impress, made to last ✨",
    },
    {
      id: 8,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: ["220000৳", "230000৳", "240000৳", "250000৳"],
      oldPrice: ["225000৳", "235000৳", "245000৳", "255000৳"],
      image: "/img/sg gray.png",
      images: [
        "/img/sg gray.png",
        "/img/sg black.png",
        "/img/sg violet.png",
        "/img/sg blue.png",
      ],
      model: {
        phoneName: "Galaxy S24 Ultra",
        GB: "256GB",
        color: "Titanium Gray",
      },
      stock: "in-stock",
      colors: ["Titanium Gray", "Black", "Violet", "Blue"],
      storages: ["256GB", "512GB", "1TB"],
      specifications: {
        screenSize: "6.8 inches",
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        battery: "5000mAh",
        camera: "200MP + 50MP + 10MP + 12MP Rear, 12MP Front",
        displayType: "Dynamic AMOLED 2X",
        refreshRate: "120Hz",
      },
      description:
        "The Galaxy S24 Ultra features a powerful Snapdragon 8 Gen 3 chip, a 200MP quad-camera system, and a stunning 6.8-inch Dynamic AMOLED 2X display with 120Hz refresh rate, designed to provide an immersive viewing experience.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 9,
      name: "Vivo X100 Pro",
      brand: "Vivo",
      price: ["120000৳", "125000৳", "130000৳"],
      oldPrice: ["125000৳", "130000৳", "135000৳"],
      image: "/img/v black.png",
      images: ["/img/v black.png", "/img/v blue.png", "/img/v orange.png"],
      model: {
        phoneName: "Vivo X100 Pro",
        GB: "256GB",
        color: "Black",
      },
      stock: "out-of-stock",
      colors: ["Black", "Blue", "Orange"],
      storages: ["256GB", "512GB"],
      specifications: {
        screenSize: "6.78 inches",
        processor: "Dimensity 9300",
        ram: "12GB",
        battery: "5400mAh",
        camera: "50MP + 50MP + 50MP Rear, 32MP Front",
      },
      description:
        "Vivo X100 Pro comes with a premium ZEISS co-engineered camera system, a massive 5400mAh battery, and a Dimensity 9300 chipset for top-tier performance.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 10,
      name: "Oppo Find X7 Ultra",
      brand: "Oppo",
      price: ["135000৳", "140000৳", "145000৳"],
      oldPrice: ["140000৳", "145000৳", "150000৳"],
      image: "/img/oppo black.png",
      images: [
        "/img/oppo black.png",
        "/img/oppo blue.png",
        "/img/oppo gold.png",
      ],
      model: {
        phoneName: "Oppo Find X7 Ultra",
        GB: "512GB",
        color: "Black",
      },
      stock: "out-of-stock",
      colors: ["Black", "Blue", "Gold"],
      storages: ["256GB", "512GB"],
      specifications: {
        screenSize: "6.82 inches",
        processor: "Snapdragon 8 Gen 3",
        ram: "16GB",
        battery: "5000mAh",
        camera: "50MP + 50MP + 64MP + 50MP Rear, 32MP Front",
      },
      description:
        "Oppo Find X7 Ultra features a periscope telephoto camera, an advanced Snapdragon 8 Gen 3 processor, and a 6.82-inch LTPO AMOLED display.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 11,
      name: "Samsung Galaxy Z Fold 5",
      brand: "Samsung",
      price: ["220000৳", "230000৳", "240000৳"],
      oldPrice: ["225000৳", "235000৳", "245000৳"],
      image: "/img/gz black.png",
      images: ["/img/gz black.png", "/img/gz cream.png", "/img/gz blue.png"],
      model: {
        phoneName: "Galaxy Z Fold 5",
        GB: "512GB",
        color: "Black",
      },
      stock: "in-stock",
      colors: ["Black", "Cream", "Blue"],
      storages: ["256GB", "512GB", "1TB"],
      specifications: {
        screenSize: "7.6 inches (Foldable)",
        processor: "Snapdragon 8 Gen 2",
        ram: "12GB",
        battery: "4400mAh",
        camera: "50MP + 12MP + 10MP Rear, 10MP + 4MP Front",
      },
      description:
        "The Galaxy Z Fold 5 offers an innovative foldable experience with a 7.6-inch Dynamic AMOLED display, S Pen support, and powerful performance.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 12,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: ["110000৳", "120000৳", "130000৳"],
      oldPrice: ["120000৳", "130000৳", "140000৳"],
      image: "/img/gp blue.png",
      images: ["/img/gp blue.png", "/img/gp black.png", "/img/gp white.png"],
      model: {
        phoneName: "Google Pixel 8 Pro",
        GB: "512GB",
        color: "Blue",
      },
      stock: "in-stock",
      colors: ["Blue", "Black", "White"],
      storages: ["128GB", "256GB", "512GB"],
      specifications: {
        screenSize: "6.7 inches",
        processor: "Google Tensor G3",
        ram: "12GB",
        battery: "5050mAh",
        camera: "50MP + 48MP + 48MP Rear, 10.5MP Front",
      },
      description:
        "Google Pixel 8 Pro offers an AI-powered camera system, a premium 6.7-inch LTPO OLED display, and the latest Google Tensor G3 processor for top-tier performance.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 13,
      name: "Oppo Reno 11 Pro",
      brand: "Oppo",
      price: ["75000৳", "80000৳", "85000৳"],
      oldPrice: ["80000৳", "85000৳", "90000৳"],
      image: "/img/or1.jpg",
      images: ["/img/or1.jpg", "/img/or blue.png", "/img/or silver.png"],
      model: {
        phoneName: "Oppo Reno 11 Pro",
        GB: "256GB",
        color: "Black",
      },
      stock: "in-stock",
      colors: ["Black", "Blue", "Silver"],
      storages: ["128GB", "256GB"],
      specifications: {
        screenSize: "6.74 inches",
        processor: "Snapdragon 8+ Gen 1",
        ram: "12GB",
        battery: "4600mAh",
        camera: "50MP + 32MP + 8MP Rear, 32MP Front",
      },
      description:
        "Oppo Reno 11 Pro is designed for photography enthusiasts, featuring an ultra-clear 50MP main camera, a powerful processor, and a stylish design.",
      warranty: "1 Year Official Warranty",
    },
    {
      id: 14,
      name: "Samsung Galaxy S23 Ultra",
      brand: "Samsung",
      price: ["160000৳", "170000৳", "180000৳", "190000৳"],
      oldPrice: ["165000৳", "175000৳", "185000৳", "195000৳"],
      image: "/img/s23 gray.png",
      images: [
        "/img/s23 gray.png",
        "/img/s23 black.png",
        "/img/s23 green.png",
        "/img/s23 lavender.png",
      ],
      model: {
        phoneName: "Galaxy S23 Ultra",
        GB: "256GB",
        color: "Phantom Gray",
      },
      stock: "out-of-stock",
      colors: ["Phantom Gray", "Black", "Green", "Lavender"],
      storages: ["256GB", "512GB", "1TB"],
      specifications: {
        screenSize: "6.8 inches",
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB / 12GB",
        battery: "5000mAh",
        camera: "200MP + 10MP + 10MP + 12MP Rear, 12MP Front",
      },
      description:
        "The Galaxy S23 Ultra comes with the powerful Snapdragon 8 Gen 2 chip, a 200MP quad-camera setup, and a 6.8-inch Dynamic AMOLED display with 120Hz refresh rate.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 15,
      name: "Xiaomi 13 Pro",
      brand: "Xiaomi",
      price: ["140000৳", "150000৳", "160000৳"],
      oldPrice: ["145000৳", "155000৳", "165000৳"],
      image: "/img/x13pro white.png",
      images: [
        "/img/x13pro white.png",
        "/img/x13pro black.png",
        "/img/x13pro green.png",
      ],
      model: {
        phoneName: "Xiaomi 13 Pro",
        GB: "256GB",
        color: "Ceramic White",
      },
      stock: "in-stock",
      colors: ["Ceramic White", "Black", "Flora Green"],
      storages: ["256GB", "512GB"],
      specifications: {
        screenSize: "6.73 inches",
        processor: "Snapdragon 8 Gen 2",
        ram: "12GB",
        battery: "4820mAh",
        camera: "50MP + 50MP + 50MP Rear, 32MP Front",
      },
      description:
        "The Xiaomi 13 Pro is powered by the Snapdragon 8 Gen 2, featuring a 50MP triple-camera setup co-engineered with Leica, and a 6.73-inch AMOLED display with 120Hz refresh rate.",
      warranty: "1 Year Official Warranty",
    },

    {
      id: 16,
      name: "OnePlus 11",
      brand: "OnePlus",
      price: ["95000৳", "105000৳", "115000৳"],
      oldPrice: ["98000৳", "108000৳", "118000৳"],
      image: "/img/one11 black.png",
      images: ["/img/one11 black.png", "/img/one11 green.png"],
      model: {
        phoneName: "OnePlus 11",
        GB: "256GB",
        color: "Titan Black",
      },
      stock: "in-stock",
      colors: ["Titan Black", "Eternal Green"],
      storages: ["128GB", "256GB", "512GB"],
      specifications: {
        screenSize: "6.7 inches",
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB / 16GB",
        battery: "5000mAh",
        camera: "50MP + 48MP + 32MP Rear, 16MP Front",
      },
      description:
        "The OnePlus 11 is powered by the Snapdragon 8 Gen 2, featuring a 50MP triple-camera system co-developed with Hasselblad, and a 6.7-inch AMOLED display with 120Hz refresh rate.",
      warranty: "1 Year Official Warranty",
    },
    // ... (include all your other products here)
  ];

  useEffect(() => {
    // Use currentProduct if available, otherwise fall back to location.state
    const product = currentProduct || location.state?.product;

    if (product) {
      // Filter related products (same brand but different model)
      const related = products.filter(
        (p) => p.brand === product.brand && p.id !== product.id
      );

      if (related.length > 0) {
        setTitle(`Related Products`);
        setRelatedProducts(related);
        setShowRelatedProducts(true);
      } else {
        setTitle("Featured Products");
        setRelatedProducts(products);
        setShowRelatedProducts(false);
      }
    } else {
      setTitle("Featured Products");
      setRelatedProducts(products);
      setShowRelatedProducts(true);
    }
  }, [currentProduct, location.state]);

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 5000);
  };

  const handleOutOfStockClick = (productId) => {
    setOutOfStockClicked(productId);
    setTimeout(() => {
      setOutOfStockClicked(null);
    }, 5000);
  };

  const totalPages = Math.ceil(relatedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = relatedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const scrollToProductsContainer = () => {
    if (productsContainerRef.current) {
      const offset = -170;
      const elementPosition =
        productsContainerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    scrollToProductsContainer();
    setLoading(true);

    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (currentPage !== 1) {
      scrollToProductsContainer();
    }
  }, [currentPage]);

  const handleProductClick = (product, e) => {
    const isOutOfStockButton = e.target.closest(".btn.out-of-stock");
    if (isOutOfStockButton) {
      e.preventDefault();
      e.stopPropagation();
      handleOutOfStockClick(product.id);
      return;
    }

    const isViewDetailsButton = e.target.closest(".btn.buy-now");
    if (!isViewDetailsButton && product.stock === "out-of-stock") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (!showRelatedProducts && (currentProduct || location.state?.product)) {
    return (
      <div className="products-container">
        <h2 style={{ marginTop: "-90px" }}>Featured Products</h2>

        <div className="product-grid" ref={productsContainerRef}>
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={(e) => handleProductClick(product, e)}
              style={{
                cursor: product.stock === "in-stock" ? "pointer" : "default",
              }}
            >
              {product.stock === "out-of-stock" && (
                <div className="out-of-stock-badge">Out of Stock</div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3 style={{ fontSize: "14px" }}>{product.name}</h3>
                {product.model && (product.model.GB || product.model.color) && (
                  <p
                    className="product-model"
                    style={{ fontSize: "14px", marginBottom: "0rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {product.model.GB && `${product.model.GB}`}
                    </span>
                    {product.model.color && `${product.model.color}`}
                  </p>
                )}
                <div key={product.price[0]}>
                  <p className="product-price">
                    {product.price[0]}{" "}
                    <span className="old-price">{product.oldPrice[0]}</span>
                  </p>
                </div>
                <div className="product-buttons">
                  <button
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "1px solid #000",
                    }}
                    className="btn buy-now"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`, {
                        state: { product },
                      });
                    }}
                  >
                    View Details
                  </button>
                  {product.stock === "in-stock" ? (
                    <button
                      className="btn add-to-cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          ...product,
                          selectedColor: product.model.color,
                          selectedStorage: product.model.GB,
                          price: product.price[0],
                          quantity: 1,
                        });
                        showAlert();
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="btn out-of-stock"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOutOfStockClick(product.id);
                      }}
                      style={{ backgroundColor: "#ff4444" }}
                    >
                      {outOfStockClicked === product.id
                        ? "Out of Stock"
                        : "Out of Stock"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {relatedProducts.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`pagination-button ${
                currentPage === 1 ? "disabled" : ""
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-button ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                (page === 2 && currentPage > 4) ||
                (page === totalPages - 1 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={page} className="pagination-dots">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`pagination-button ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {alertVisible && (
          <div className="custom-alert">
            <img
              className="alert-image"
              src="./img/right.png"
              alt="Success Icon"
            />
            <div className="alert-message">Successfully added product</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="products-container">
      <h2 style={{ marginTop: "-90px" }}>{title}</h2>
      {loading && <div className="loading-spinner"></div>}

      <div
        className={`product-grid ${loading ? "loading" : ""}`}
        ref={productsContainerRef}
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={(e) => handleProductClick(product, e)}
            style={{
              cursor: product.stock === "in-stock" ? "pointer" : "default",
            }}
          >
            {product.stock === "out-of-stock" && (
              <div className="out-of-stock-badge">Out of Stock</div>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 style={{ fontSize: "14px" }}>{product.name}</h3>
              {product.model && (product.model.GB || product.model.color) && (
                <p
                  className="product-model"
                  style={{ fontSize: "14px", marginBottom: "0rem" }}
                >
                  <span style={{ display: "none" }}>
                    {product.model.GB && `${product.model.GB}`}
                  </span>
                  {product.model.color && `${product.model.color}`}
                </p>
              )}
              <div key={product.price[0]}>
                <p className="product-price">
                  {product.price[0]}{" "}
                  <span className="old-price">{product.oldPrice[0]}</span>
                </p>
              </div>
              <div className="product-buttons">
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #000",
                  }}
                  className="btn buy-now"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`, { state: { product } });
                  }}
                >
                  View Details
                </button>
                {product.stock === "in-stock" ? (
                  <button
                    className="btn add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...product,
                        selectedColor: product.model.color,
                        selectedStorage: product.model.GB,
                        price: product.price[0],
                        quantity: 1,
                      });
                      showAlert();
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn out-of-stock"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOutOfStockClick(product.id);
                    }}
                    style={{ backgroundColor: "#ff4444" }}
                  >
                    {outOfStockClicked === product.id
                      ? "Out of Stock"
                      : "Out of Stock"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {relatedProducts.length > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`pagination-button ${
              currentPage === 1 ? "disabled" : ""
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              (page === 2 && currentPage > 4) ||
              (page === totalPages - 1 && currentPage < totalPages - 3)
            ) {
              return (
                <span key={page} className="pagination-dots">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`pagination-button ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {alertVisible && (
        <div className="custom-alert">
          <img
            className="alert-image"
            src="./img/right.png"
            alt="Success Icon"
          />
          <div className="alert-message">Successfully added product</div>
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
