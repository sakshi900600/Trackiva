// Uses disposable email blocklist + DNS MX check
import dns from "dns/promises";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "guerrillamail.info", "guerrillamail.biz", "guerrillamail.de", "guerrillamail.net",
  "guerrillamail.org", "spam4.me", "trashmail.com", "trashmail.at", "trashmail.io",
  "dispostable.com", "maildrop.cc", "fakeinbox.com", "mailnull.com", "spamgourmet.com",
  "trashmail.me", "discard.email", "spambox.us", "getairmail.com", "filzmail.com",
  "wegwerfmail.de", "10minutemail.com", "10minutemail.net", "minutemail.com",
  "tempinbox.com", "throwam.com", "spamevader.com",
]);

export const validateEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isDisposableEmail = (email) => {
  const domain = email.split("@")[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.has(domain);
};

export const checkMxRecord = async (email) => {
  try {
    const domain = email.split("@")[1];
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false; // domain has no MX record = can't receive email
  }
};

export const validateEmail = async (email) => {
  if (!email || typeof email !== "string") {
    return { valid: false, reason: "Email is required" };
  }

  const trimmed = email.trim().toLowerCase();

  if (!validateEmailFormat(trimmed)) {
    return { valid: false, reason: "Invalid email format" };
  }

  if (isDisposableEmail(trimmed)) {
    return { valid: false, reason: "Disposable email addresses are not allowed" };
  }

  // const hasMx = await checkMxRecord(trimmed);
  // if (!hasMx) {
  //   return { valid: false, reason: "Email domain does not appear to be valid" };
  // }

  return { valid: true, reason: null };
};