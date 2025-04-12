import styles from "./Legal.module.css";

const DeliveryTerms = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.title}>Delivery Terms & Conditions</h2>
      <p className={styles.text}>
        ঢাকা শহরের মধ্যে ডেলিভারি চার্জ ৮০ টাকা এবং ঢাকার বাইরে ডেলিভারি চার্জ
        ১২০ টাকা প্রযোজ্য। ঢাকার ভিতরে অর্ডার সাধারণত ১-২ কার্যদিবসে ডেলিভারি
        দেওয়া হয়, ঢাকার বাইরে ২-৩ কার্যদিবস সময় লাগতে পারে।
      </p>
      <p className={styles.text}>
        বিশেষ ছুটির দিন বা অভ্যন্তরীণ সমস্যার কারণে ডেলিভারি ডিলে হতে পারে।
        রিমোট এলাকায় অতিরিক্ত চার্জ প্রযোজ্য হতে পারে।
      </p>
    </section>
  );
};

export default DeliveryTerms;
