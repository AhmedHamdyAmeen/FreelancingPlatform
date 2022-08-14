import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../api/axios";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function ChangePassword({ setToken }) {
  /** States
   */
  const [user, setUser] = useState({
    oldPassword: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    oldPasswordError: "",
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
    // let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    // let regexPass = /^(?=.*[0-9])(?=.[!@#$%^&])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    let regexMail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //! handling

    var regexPass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    switch (field) {
      case "password":
        if (!regexPass.test(value)) {
          setErrors({
            ...errors,
            passwordError:
              "Valid password contain: more than 7 characters, at lease one uppercase, one lower case, one digit and special characters (^%$@)",
          });
        } else {
          setErrors({
            ...errors,
            passwordError:
              value === user.oldPassword
                ? "The New password is must be different than the Old password!"
                : "Ok, Passwords are't the same.",
          });
        }
        break;
      default:
        setErrors({ ...errors });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user); // !

    try {
      const token = localStorage.getItem("token");
      const data = JSON.stringify({ ...user });

      const config = {
        method: "post",
        url: `/changePassword`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        accept: "application/json, text/plain, */*",
        // withCredentials: true,
        data: data,
      };

      const response = await axiosInstance(config);

      if (!response) {
        setErrors({
          ...errors,
          submitError: "No Server Response",
        });
        return;
      }

      // console.log(response, "<===");

      /** Handle Errors
       */

      let statusCode = response.status;

      if (statusCode === 201) {
        history.push("/project");
      }
    } catch (error) {
      console.log(error);

      setErrors({
        ...errors,
        resetError: error.response.data.msg,
      });
    }
  };

  const togglePasswordIcon = (e) => {
    setIsPasswordShown(!isPasswordShown);
    console.log(isPasswordShown);
  };

  return (
    <div className="container-fluid loginContainer">
      <div className="row justify-content-center align-items-center vh-100">
        <div className={`bgGray col-11 col-md-8 col-lg-6 p-5 rounded`}>
          <form onSubmit={handleSubmit}>
            {errors.resetError !== "" ? (
              <div className="alert alert-danger" role="alert">
                {`${errors.resetError}`}
              </div>
            ) : (
              ""
            )}

            <div className="mb-3 position-relative">
              <label
                htmlFor="password"
                className="form-label"
                style={{
                  color: `var(--blue)`,
                  fontWeight: 500,
                }}
              >
                Old Password
              </label>
              <div className={`passwordWrapper position-relative`}>
                <input
                  type={isPasswordShown ? "text" : "password"}
                  className={`form-control ${
                    errors.passwordError ? "border-danger" : ""
                  }`}
                  id="oldPassword"
                  aria-describedby="passwordHelp"
                  value={user.oldPassword}
                  onChange={handleChange}
                />
                <i
                  className={`eyeIcon  position-absolute`}
                  onClick={togglePasswordIcon}
                >
                  {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </i>
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

              <div
                id="passwordHelp"
                className={`form-text ${
                  errors.passwordError === "Ok, Passwords are't the same."
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {errors.passwordError}
              </div>
            </div>

            <button
              style={{
                background: `var(--beige)`,
                border: "none",
              }}
              type="submit"
              className="btn btn-danger mb-3"
            >
              Reset
            </button>
          </form>
        </div>
        <div className="d-none d-lg-flex col-lg-6 infoArea h-100">
          <div className="rotatedDiv ">
            <div className="loginGreeting d-flex flex-column justify-content-center align-items-center">
              <h1 className="py-5">Devolenco</h1>
              <p>
                🎁 While you were away, we've made some changes to Ureed.com
              </p>
              <p>Follow us @DevolencoArabia to learn more</p>
              <p>
                Join Devolenco.com today, the region's largest freelancers
                marketplace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
// /change-password/:userType?/:rToken?
