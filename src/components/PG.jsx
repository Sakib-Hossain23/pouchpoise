import React from "react";
import styles from "./PG.module.css";

const PG = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>
          <span style={{ color: "#f27f20" }}> Popular </span>
          Pouches for Everyday Use
          <span style={{ color: "#f27f20" }}> Online </span> Shop
        </h1>
      </header>

      <main className={styles.main}>
        <section id="welcome" className={styles.section}>
          <h2 className={styles.title}>Welcome to Our PouchPoise Store</h2>
          <p className={styles.text}>
            Welcome to our trusted online and physical store for the latest and
            authentic pouch bags, including travel pouches, makeup bags,
            organizers, and stylish everyday carry pouches. We offer the best
            deals on quality pouch bags at affordable prices. Our journey began
            with a focus on great customer service, and our motto is “Customer
            Comes First.” Because of this, we’ve become a favorite choice for
            pouch lovers. We’re proud to offer high-quality products and serve
            many happy customers both online and in our local stores across the
            region.
          </p>
        </section>

        <section id="best-mobile" className={styles.section}>
          <h2 className={styles.title}>
            Carry in Style – Explore Our Pouch Bag Collection
          </h2>
          <p className={styles.text}>
            At our store, we carefully select each pouch bag to ensure it meets
            your needs for both style and function. Whether you're looking for a
            sleek pouch for daily use, a spacious travel organizer, or a cute
            makeup bag, we’ve got you covered. Our team is passionate about
            bringing you the latest designs and durable materials that last. We
            regularly update our collection to keep up with current trends while
            maintaining quality. Shopping with us means getting reliable
            products, friendly service, and a smooth shopping experience every
            time—both online and in-store.
          </p>
        </section>

        <section id="why-choose" className={styles.section}>
          <h2 className={styles.title}>Why Choose Our Store?</h2>
          <ol className={styles.list}>
            <li className={styles.listItem}>
              <strong>Wide Range of Pouch Bags:</strong> We offer a diverse
              collection of pouch bags, including travel pouches, makeup bags,
              organizers, and more.
            </li>
            <li className={styles.listItem}>
              <strong>Affordable Prices:</strong> Enjoy stylish and functional
              pouch bags at budget-friendly prices, with regular deals and
              discounts.
            </li>

            <li className={styles.listItem}>
              <strong>Friendly Customer Support:</strong> We’re committed to
              making your shopping experience smooth and satisfying, both online
              and in-store.
            </li>
          </ol>
        </section>

        <section id="best-home-appliance" className={styles.section}>
          <h2 className={styles.title}>Fast & Reliable Home Delivery</h2>
          <p className={styles.text}>
            We offer fast and reliable home delivery to make your shopping
            easier. After you place an order, we carefully pack your pouch bags
            and deliver them to your doorstep. No matter where you are, we
            ensure safe and on-time delivery. You'll also get tracking updates
            for peace of mind. Shopping with us is simple, quick, and
            stress-free!
          </p>
        </section>
      </main>
    </div>
  );
};

export default PG;
