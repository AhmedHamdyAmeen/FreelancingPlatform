const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let result = validationResult(request);
  // console.log(result);
  if (!result.isEmpty()) { // if not empty ==> there is an Error
    // console.log(result.errors.msg);
    let errorMessages = result.errors.reduce((current, error) => ` ${current} ${current == "" ? "" : "&"} ${error.msg} `, '');
    let error = new Error(errorMessages);
    error.status = 422; // 422 => input validation error
    throw error;
  } else {
    next();
  }
};
