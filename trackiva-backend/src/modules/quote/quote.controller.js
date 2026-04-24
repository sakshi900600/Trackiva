import { quotes } from "../../utils/quotes.js";

// ✅ UTC-based (same quote globally)
const getDayOfYearUTC = () => {
  const now = new Date();

  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  return Math.floor((today - start) / (1000 * 60 * 60 * 24));
};

export const getQuote = (req, res) => {
  const day = getDayOfYearUTC();

  const quote = quotes[day % quotes.length];

  res.json({
    success: true,
    data: {
      text: quote.text,
      author: quote.author,
      day,
    },
  });
};