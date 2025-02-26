export const FORMAT_NUMBER_REGEX = new RegExp(/(\d)(?=(\d{3}){1,20}$)/g);

export const REGEX_ONE_SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export const REGEX_PHONE = /(0)+([0-9]{9})\b/g;

export const REGEX = {
  email: /^(?!.*\.\.)[\w.+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  phone: /(0)+([0-9]{9})\b/g,
  slug: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  letter_number_space: /^[A-Za-z0-9 ]*$/,
  letter_character_space: /[^a-zA-Z ]/g,
  coupon_code: /^[0-9]{8}(-)[0-9]{8}$/,
  allowNumber: /\D/g,
  fabric_code: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  // iframe: /?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>)/,
};
