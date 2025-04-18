import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Import all your components
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import MyProducts from "./components/MyProducts";
import Cart from "./components/Cart";
import Carousel from "./components/Carousel";
import FeaturedCategories from "./components/FeaturedCategories";
import Banner from "./components/Banner";
import RlProducts from "./components/RlProducts";
import Hero from "./components/Hero";
import ScrollToTop from "./components/ScrollToTop";
import DownFooter from "./components/DownFooter";
import ModalPage from "./components/ModalPage";
import Checkout from "./components/Checkout";
import SearchModal from "./components/SearchModal";
import RegisterModal from "./components/RegisterModal";
import products from "./components/AllProducts";
import OrderHistory from "./components/OrderHistory";
import Fr from "./components/Fr";
import Blog from "./components/Blog";
import Chatbot from "./components/Chatbot";
import NotFound from "./components/NotFound";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import DeliveryTerms from "./components/DeliveryTerms";
import ReturnPolicy from "./components/ReturnPolicy";

// Google Analytics Tracking ID
const TRACKING_ID = "G-2K5PGD0E62"; // ← Replace with your actual GA4 ID

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
  trickleSpeed: 200,
});

// Custom hook for route-based GA tracking
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);
};

// Custom component to handle route changes for NProgress & GA
const ProgressRouter = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  usePageTracking();

  return children;
};

function App() {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  const addToCart = (newProduct) => {
    const existingProductIndex = cart.findIndex(
      (product) =>
        product.id === newProduct.id &&
        product.selectedColor === newProduct.selectedColor &&
        product.selectedStorage === newProduct.selectedStorage
    );

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += newProduct.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, newProduct]);
    }
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <ProgressRouter>
        <ScrollToTop />
        <Navbar
          cart={cart}
          wishlist={wishlist}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSearchModalOpen={setIsSearchModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
        <DownFooter
          cart={cart}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />

        <Routes>
          <Route path="/" element={<Hero addToCart={addToCart} />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/featured-categories" element={<FeaturedCategories />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/rl-products" element={<RlProducts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/delivery-terms" element={<DeliveryTerms />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCart={updateCart}
                totalPrice={calculateTotalPrice()}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                updateCart={updateCart}
                setOrderHistory={setOrderHistory}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ModalPage
                addToCart={addToCart}
                products={products}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/order-history"
            element={<OrderHistory orderHistory={orderHistory} />}
          />
          <Route
            path="/my-products"
            element={
              <MyProducts
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                wishlist={wishlist}
              />
            }
          />
        </Routes>

        {isSearchModalOpen && searchQuery && (
          <SearchModal
            searchQuery={searchQuery}
            setIsSearchModalOpen={setIsSearchModalOpen}
            filteredProducts={filteredProducts}
            setSearchQuery={setSearchQuery}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            wishlist={wishlist}
          />
        )}

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />

        <Fr />
        <Chatbot />
      </ProgressRouter>
    </Router>
  );
}

export default App;
