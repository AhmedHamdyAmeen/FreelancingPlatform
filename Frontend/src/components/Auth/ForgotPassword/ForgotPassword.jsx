import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../api/axios";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function ForgotPassword() {
  const params = useParams();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    resetError: "",
  });

  /** Flag States
   */
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const history = useHistory();

  /** Handling methods:
   */
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
    handleValidation(event.target.id, event.target.value);
  };

  const handleValidation = (field, value) => {
    console.log("field", field);
    console.log("value", value);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

    switch (field) {
      case "email":
        if (!regex.test(value)) {
          console.log(regex.test(value));
          setErrors({
            ...errors,
            emailError: "Valid Email is required!",
          });
        } else {
          setErrors({
            ...errors,
            emailError: "",
          });
        }
        break;
      case "password":
        setErrors({
          ...errors,
          passwordError:
            value.length < 8 ? "Password Must be more then 8 characters!" : "",
        });
        break;
      default:
        setErrors({ ...errors });
    }
  };

  const togglePasswordIcon = (e) => {
    setIsPasswordShown(!isPasswordShown);
    console.log(isPasswordShown);
  };

  // console.log(params.userType);
  // console.log(params.rToken);

  const ResetEmail = async () => {
    try {
      const data = JSON.stringify({
        resetLink: params.rToken,
        newPassword: user.password,
        email: user.email,
      });

      const config = {
        method: "post",
        url: `/reset-password/${params.userType}`,
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json, text/plain, */*",
        // withCredentials: true,
        data: data,
      };

      const response = await axiosInstance(config);

      if (!response) {
        setErrors({
          ...errors,
          resetError: "No Server Respond",
        });
      }

      // console.log(response, "<===");
      let statusCode = response.status;

      if (statusCode === 200) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.msg);

      /** Handle Errors
       */
      setErrors({
        ...errors,
        resetError: error.response.data.msg,
      });
    }
  };

  return (
    <div className="loginContainer">
      <div className="row justify-content-center align-content-center vh-100 ">
        <div className="col-11 col-md-8 col-lg-6 p-5 rounded  text-center">
          {params.rToken ? (
            <>
              <form>
                {errors.resetError !== "" ? (
                  <div className="alert alert-danger" role="alert">
                    {`${errors.resetError}`}
                  </div>
                ) : (
                  ""
                )}

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                    style={{
                      color: `var(--blue)`,
                      fontWeight: 500,
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.emailError ? "border-danger" : ""
                    }`}
                    id="email"
                    aria-describedby="emailHelp"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {errors.emailError}
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <label
                    htmlFor="password"
                    className="form-label"
                    style={{
                      color: `var(--blue)`,
                      fontWeight: 500,
                    }}
                  >
                    New Password
                  </label>
                  <div className={`passwordWrapper position-relative`}>
                    <input
                      type={isPasswordShown ? "text" : "password"}
                      className={`form-control ${
                        errors.passwordError ? "border-danger" : ""
                      }`}
                      id="password"
                      aria-describedby="passwordHelp"
                      value={user.password}
                      onChange={handleChange}
                    />
                    <i
                      className={`eyeIcon  position-absolute`}
                      onClick={togglePasswordIcon}
                    >
                      {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                    </i>
                  </div>

                  <div id="passwordHelp" className="form-text text-danger">
                    {errors.passwordError}
                  </div>
                </div>
              </form>

              <button
                style={{
                  background: `var(--beige)`,
                  border: "none",
                }}
                className="btn btn-success mt-4"
                onClick={ResetEmail}
              >
                Reset password
              </button>
            </>
          ) : (
            <p
              style={{
                color: `var(--blue)`,
                fontWeight: "bolder",
                fontSize: "1.3em",
                fontFamily: "Courgette",
                lineHeight: 2,
              }}
            >
              Reset Password link has been sent to your Email, kindly check your
              mail and follow the instructions.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
