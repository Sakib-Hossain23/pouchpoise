import styles from "./Legal.module.css";

const TermsAndConditions = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.title}>Terms and Conditions</h2>
      <p className={styles.text}>
        PouchPoise-এ স্বাগতম! আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি আমাদের
        শর্তাবলী মেনে নিচ্ছেন। তালিকাভুক্ত সকল পণ্য প্রাপ্যতার উপর নির্ভরশীল এবং
        কোনো পূর্বসূচনা ছাড়াই পরিবর্তন হতে পারে।
      </p>
      <p className={styles.text}>
        গ্রাহকদের অবশ্যই সঠিক তথ্য প্রদান করতে হবে অর্ডার প্রক্রিয়াকরণের
        সুবিধার্থে। PouchPoise কোনো ত্রুটি বা প্রতারণামূলক কার্যকলাপের কারণে
        যেকোনো অর্ডার বাতিল করার অধিকার সংরক্ষণ করে।
      </p>
      <p className={styles.text}>
        এই সাইটের সমস্ত কন্টেন্ট, ছবি এবং ডিজাইন PouchPoise-এর মালিকানাধীন এবং
        অনুমতি ছাড়া কপি বা পুনরায় ব্যবহার করা যাবে না।
      </p>
    </section>
  );
};

export default TermsAndConditions;
