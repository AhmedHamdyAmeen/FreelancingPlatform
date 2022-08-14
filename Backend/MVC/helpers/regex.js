/**
 * valid email example: .com, @example
 */
module.exports.emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
/**
 * at least one digit
 * at least one uppercase letter
 * at least one lowercase letter
 * at least one special character
 */

module.exports.passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
/**
 * valid phone format example: 11-111-1111
 */
//  module.exports.phoneRegex = /\d{3}-\d{3}-\d{4}/
/**
 * valid image format
 */
module.exports.imageExtRegex = new RegExp(".(png|jpg)");
/**
 * valid file format
 */
module.exports.fileExtRegex = new RegExp(".(pdf|png|jpg|jpeg)$");

