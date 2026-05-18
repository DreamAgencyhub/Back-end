// Example utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const sanitizeData = (obj) => {
  const sanitized = { ...obj };
  delete sanitized.password;
  return sanitized;
};
