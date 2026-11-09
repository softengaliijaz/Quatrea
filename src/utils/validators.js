const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isEmail = (v) => EMAIL.test(String(v).trim());

// Each validator returns an object of { field: message }. Empty object = valid.
export const validateContact = ({ name, email, subject, message }) => {
  const e = {};
  if (!name.trim()) e.name = 'Please enter your name.';
  if (!isEmail(email)) e.email = 'Enter a valid email address.';
  if (!subject.trim()) e.subject = 'Please add a subject.';
  if (message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  return e;
};

export const validateCheckout = (f) => {
  const e = {};
  if (!f.fullName.trim()) e.fullName = 'Please enter your full name.';
  if (!isEmail(f.email)) e.email = 'Enter a valid email address.';
  if (!f.address.trim()) e.address = 'Please enter your address.';
  if (!f.city.trim()) e.city = 'Please enter your city.';
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.postalCode.trim())) e.postalCode = 'Enter a valid postal code.';
  if (!f.country.trim()) e.country = 'Please enter your country.';
  return e;
};
