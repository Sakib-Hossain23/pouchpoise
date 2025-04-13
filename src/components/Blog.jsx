import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

const Blog = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const blogContainerRef = useRef(null); // Ref for the blog container

  const blogs = [
    {
      title: "Elegant Black Charm",
      img: "/img/pp5.jpg",
      description:
        "🖤 The perfect blend of elegance and cuteness 🎀🎀 — Crafted from sleek Black PU leather in China, this beauty... stands 5 inches tall and 11 inches wide. Whether you're dressing up or keeping it casual, it’s the perfect accessory to add a dash of sophistication and charm to any look! ✨",
    },
    {
      title: "Chic Pink PU Delight",
      img: "/img/pp12.jpg",
      description:
        "🌸 Designed to Impress, Made to Adore 🌸 — This Light Pink beauty, made from high-quality PU leather in... China, stands 5.6 inches tall and 11.7 inches wide, with a spacious 5-inch inner space. It’s not just a bag, it’s a statement — chic, practical, and perfect for those who love to stand out! 💖✨",
    },
    {
      title: "Bold Red PU Beauty",
      img: "/img/pp17.jpg",
      description:
        "🔥 Glossy, bold, and effortlessly stylish – just like you. ❤️ This Red beauty, crafted from PU leather in China, stands... 5.5 inches tall and 9.5 inches wide. A perfect accessory to make a statement — sleek, chic, and ready to add a pop of color to your wardrobe. In stock and ready to shine! ✨",
    },
    {
      title: "Elegant White PU Charm",
      img: "/img/pp20.jpg",
      description:
        "✨ Designed to impress, made to last ✨ — This sleek White accessory, crafted from durable PU leather in China, stands... 5.1 inches tall and 8.7 inches wide. A timeless piece that blends elegance with functionality, it’s perfect for making a lasting impression wherever you go! 💫",
    },
    {
      title: "Charming Cream PU Delight",
      img: "/img/pp3.jpeg",
      description:
        "✨ The perfect blend of elegance and cuteness 🎀🎀 — This Cream beauty, made with high-quality PU leather in... China, stands 5 inches tall and 11 inches wide. Whether you're headed to a brunch or a special occasion, it’s the perfect accessory to add a touch of charm and sophistication to your day! 💫 In stock and ready to impress!",
    },
    {
      title: "Chic White PU Beauty",
      img: "/img/pp9.jpeg",
      description:
        "✨ The perfect blend of elegance and cuteness 🎀🎀 — This White PU leather piece, crafted in China, stands 5 inches... tall and 11 inches wide. A chic accessory that combines sophistication with playful charm, it's perfect for adding a sweet touch to any outfit! 💖",
    },
    {
      title: "Sleek Black PU Elegance",
      img: "/img/pp15.jpeg",
      description:
        "🖤 Glossy, bold, and effortlessly stylish – just like you. ❤️ This chic Black beauty, crafted from high-quality PU leather... in China, stands 5.5 inches tall and 9.5 inches wide. It's the perfect accessory to elevate any look — sleek, sophisticated, and ready to shine wherever you go! ✨",
    },
    {
      title: "Stylish Blue PU Charm",
      img: "/img/pp25.jpg",
      description:
        "🌸🎀 A bag designed for the woman who knows style and substance. 🌸 This Blue beauty, made from high-quality PU... leather in China, stands 6 inches tall and 7.6 inches wide. Perfect for one-shoulder or hand-held wear, it offers just the right amount of space for your essentials like mobile phones and lipsticks. A stylish, functional piece that complements your on-the-go lifestyle! ✨",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Scroll to the top of the blog container with an offset
  const scrollToBlogContainer = () => {
    if (blogContainerRef.current) {
      const offset = -100; // Adjust this value to control how much higher to scroll
      const elementPosition =
        blogContainerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(scrollToBlogContainer, 100); // Ensures smooth scrolling after pagination update
  };

  return (
    <div className={styles.blogContainer} ref={blogContainerRef}>
      <div className={styles.blogGrid}>
        <h1 className={styles.title}>
          Blog<span style={{ color: "orange" }}>s</span>
        </h1>

        <div className={styles.blogMain}>
          {currentBlogs.map((blog, index) => {
            const isExpanded = expandedIndex === index;
            const shortDescription = blog.description.split("...")[0] + "...";
            return (
              <div className={styles.blogItem} key={index}>
                <img
                  src={blog.img}
                  alt={blog.title}
                  className={styles.blogImage}
                />
                <div className={styles.blogContent}>
                  <h2 className={styles.blogTitle}>{blog.title}</h2>
                  <p className={styles.blogText}>
                    {isExpanded ? blog.description : shortDescription}
                  </p>
                  <Link
                    to="#"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className={styles.readMore}
                  >
                    {isExpanded ? "Read Less ↑" : "Read More →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationBtn}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                className={`${styles.paginationBtn} ${
                  currentPage === num + 1 ? styles.active : ""
                }`}
                onClick={() => paginate(num + 1)}
              >
                {num + 1}
              </button>
            ))}
            <button
              className={styles.paginationBtn}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
