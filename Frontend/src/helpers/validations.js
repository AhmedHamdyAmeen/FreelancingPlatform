import { numbersRegex, lettersOnlyRegex, phoneRegex } from "./regex";

export const isValidText = (value) => {
  if (value) {
    return !lettersOnlyRegex.test(value);
  }
};

export const isValidTitle = (value) => {
  if (value) {
    return !numbersRegex.test(value);
  }
};

export const isValidNumber = (value) => {
  if (value) {
    return numbersRegex.test(value);
  }
};

export const isValidPhoneNumber = (value) => {
  if (value) {
    return phoneRegex.test(value);
  }
};

export const validatePhoneNumber = (value) => {
  if (isValidPhoneNumber(value) || value.length === 0) {
    return "";
  } else return "phone number is invalid";
};

export const validateOneWord = (value) => {
  if (
    (isValidText(value) && value.length > 2 && value.length <= 15) ||
    value.length === 0
  ) {
    return "";
  } else return "must be 2-15 letters only";
};

export const validateNoNumbers = (value) => {
  if (value.length === 0) {
    return "";
  } else if (value.length < 2 && value.length > 30) {
    return "must be 2-30 characters";
  } else if (!isValidTitle(value)) {
    return "numbers not allowed";
  } else return "";
};

export const validateDescription = (value) => {
  if ((value.length >= 100 && value.length <= 500) || !value.length) {
    return "";
  } else {
    return "must be between 100-500 characters";
  }
};

export const validateDate = (date) => {
  if (!date) return "start date is required";
  const today = new Date().getTime();
  const newDate = new Date(date).getTime();
  if (today - newDate >= 0) return "";
  else return "please enter a valid date";
};

export const validateEndDate = (startDate, endDate) => {
  if (!startDate) return "please enter start date first";
  startDate = new Date(startDate).getTime();
  endDate = new Date(endDate).getTime();
  console.log(endDate - startDate);
  if (endDate - startDate > 0) return "";
  else return "please enter a valid date";
};

// export const validate = () => {
  
// };