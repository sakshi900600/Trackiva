import React, { useEffect, useState } from "react";
import styles from "./QuoteCard.module.css";
import { getQuote } from "../../../api/quote";

const motivationalFallbacks = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Every rejection is redirection to something better.", author: "Unknown" },
  { text: "Your next application could be the one that changes everything.", author: "Trackiva" },
];

const QuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuote();
        setQuote(data);
      } catch (err) {
        const fallback =
          motivationalFallbacks[
            Math.floor(Math.random() * motivationalFallbacks.length)
          ];
        setQuote(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.iconRow}>
        <div className={styles.quoteIcon}>"</div>
        <span className={styles.label}>Daily Motivation</span>
      </div>

      <div className={styles.quoteBody}>
        {loading ? (
          <div className={styles.skeleton}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} style={{ width: "80%" }} />
            <div className={styles.skeletonLine} style={{ width: "60%" }} />
          </div>
        ) : (
          <>
            <p className={styles.quoteText}>
              {quote?.text || "Stay consistent. Every step forward counts."}
            </p>
            <span className={styles.author}>
              — {quote?.author || "Trackiva"}
            </span>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerTag}>💡 New quote every day</span>
      </div>
    </div>
  );
};

export default QuoteCard;