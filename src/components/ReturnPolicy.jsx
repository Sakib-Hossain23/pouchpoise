import styles from "./Legal.module.css";

const ReturnPolicy = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.title}>Return Policy</h2>

      <ul className={styles.list}>
        <li>
          পণ্য ফেরতের জন্য ক্রয়ের তারিখ থেকে ৭ দিনের মধ্যে যোগাযোগ করতে হবে।
        </li>
        <li>ফেরতের সময় পণ্যটি অব্যবহৃত, অক্ষত ও মূল প্যাকেজিংসহ থাকতে হবে।</li>

        <li>
          ত্রুটিপূর্ণ বা ভুল পণ্য ছাড়া অন্য সকল ক্ষেত্রে কুরিয়ার চার্জ গ্রাহককে
          বহন করতে হবে।
        </li>
        <li>
          ফেরত পণ্য যাচাইয়ের পর ৭ কর্মদিবসের মধ্যে রিফান্ড বা এক্সচেঞ্জ
          প্রক্রিয়া সম্পন্ন হবে।
        </li>
        <li>
          রিটার্ন সংক্রান্ত যেকোনো সাহায্যের জন্য আমাদের কাস্টমার সার্ভিস টিমের
          সাথে যোগাযোগ করুন।
        </li>
      </ul>
    </section>
  );
};

export default ReturnPolicy;
