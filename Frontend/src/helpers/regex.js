/**
 * valid email example: .com, @example
 */
export const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
/**
 * at least one digit
 * at least one uppercase letter
 * at least one lowercase letter
 * at least one special character
 */
export const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
/**
 * valid phone format example: 11-111-1111
 */
export const phoneRegex = /^\d{11}$/;
/**
 * valid fullName format
 */
export const fullNameRegex = new RegExp(
  "(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})"
);

export const lettersOnlyRegex = new RegExp("[^A-Za-z ]");

export const numbersRegex = new RegExp("\\d");
