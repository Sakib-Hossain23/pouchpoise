import styles from "./Legal.module.css";

const PrivacyPolicy = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.title}>Privacy Policy</h2>
      <p className={styles.text}>
        PouchPoise-এ আমরা আপনার গোপনীয়তা সম্মান করি। আমরা আপনার তথ্য শুধুমাত্র
        অর্ডার প্রক্রিয়াকরণ এবং আপনার শপিং অভিজ্ঞতা উন্নত করার জন্য সংগ্রহ করি।
      </p>
      <p className={styles.text}>
        আপনার ডেটা নিরাপদে সংরক্ষণ করা হয় এবং তৃতীয় পক্ষের সাথে শেয়ার করা হয়
        না।
      </p>
      <p className={styles.text}>
        আমাদের সাইট ব্যবহার করার মাধ্যমে আপনি আমাদের গোপনীয়তা নীতি মেনে
        নিচ্ছেন। কোনো প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে
        নির্দ্বিধায় পারেন।
      </p>
    </section>
  );
};

export default PrivacyPolicy;
