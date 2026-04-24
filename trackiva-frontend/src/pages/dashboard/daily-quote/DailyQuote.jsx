import React, { useEffect, useState } from "react";
import styles from "./DailyQuote.module.css";
import { getQuote } from "../../../api/quote";

const DailyQuote = () => {
  const userName = "Sakshi";

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuote();
        setQuote(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <h1 className={styles.greeting}>
          Hello, {userName} 👋
        </h1>

        <p className={styles.subtext}>
          Stay consistent. Every application gets you closer to your dream job.
        </p>

        <div className={styles.quoteBox}>
          <p className={styles.quote}>
            {quote ? `"${quote.text}"` : "Loading motivation..."}
          </p>

          <span className={styles.author}>
            {quote ? `– ${quote.author}` : ""}
          </span>
        </div>
      </div>

      {/* RIGHT (better dynamic illustration) */}
      <div className={styles.right}>
        <img
          src="https://illustrations.popsy.co/gray/working.svg"
          alt="motivation"
        />
      </div>
    </div>
  );
};

export default DailyQuote;