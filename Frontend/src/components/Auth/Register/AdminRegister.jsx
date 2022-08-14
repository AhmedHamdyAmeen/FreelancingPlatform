import React, { useState } from "react";
import axiosInstance from "./../../../api/axios";
import { useHistory } from "react-router-dom";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
// import "../login/login.css";

function AdminRegister() {
  // 1- States
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: "",
    emailError: "",
    lastNameError: "",
    passwordError: "",
    passwordConfirmError: "",
    registerError: "",
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const history = useHistory();

  // 2- Handling methods:
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
      case "firstName":
        setErrors({
          ...errors,
          firstNameError:
            value.length < 3 ? "Name must me more than 2 characters" : "",
        });
        break;
      case "lastName":
        setErrors({
          ...errors,
          lastNameError:
            value.length < 3 ? "Name must me more than 2 characters" : "",
        });
        break;
      case "email":
        if (!regexMail.test(value)) {
          console.log(regexMail.test(value));
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
        if (!regexPass.test(value)) {
          setErrors({
            ...errors,
            passwordError:
              "Valid password contain: more than 7 characters, at lease one uppercase, one lower case, one digit and special characters (^%$@)",
          });
        } else {
          setErrors({
            ...errors,
            passwordError: "",
          });
        }
        break;
      case "passwordConfirm":
        setErrors({
          ...errors,
          passwordConfirmError:
            value !== user.password ? "Passwords must be identical" : "Matched",
        });
        break;
      default:
        setErrors({ ...errors });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const token = localStorage.getItem("token");

      const data = JSON.stringify({ ...user });

      const config = {
        method: "post",
        url: `/admin/register`,
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

      console.log(response, "<===");
      let statusCode = response.status;

      if (statusCode === 201) {
        history.push("/admin/login");
      }
    } catch (error) {
      console.log(error);
      // console.log(error.response.status);
      // console.log(error.response.data.msg);

      /** Handle Errors
       */
      setErrors({
        ...errors,
        registerError: error.response.data.msg,
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
            {errors.registerError !== "" ? (
              <div className="alert alert-danger" role="alert">
                {`${errors.registerError}`}
              </div>
            ) : (
              ""
            )}

            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="form-label"
                style={{
                  color: `var(--blue)`,
                  fontWeight: 500,
                }}
              >
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstNameError ? "border-danger" : ""
                }`}
                id="firstName"
                aria-describedby="nameHelp"
                value={user.name}
                onChange={handleChange}
              />
              <div id="nameHelp" className="form-text text-danger">
                {errors.firstNameError}
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="form-label"
                style={{
                  color: `var(--blue)`,
                  fontWeight: 500,
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastNameError ? "border-danger" : ""
                }`}
                id="lastName"
                aria-describedby="usernameHelp"
                value={user.username}
                onChange={handleChange}
              />
              <div id="usernameHelp" className="form-text text-danger">
                {errors.lastNameError}
              </div>
            </div>

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
                Password
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
                  className={`eyeIcon position-absolute`}
                  onClick={togglePasswordIcon}
                >
                  {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </i>
              </div>

              <div id="passwordHelp" className="form-text text-danger">
                {errors.passwordError}
              </div>
            </div>

            <div className="mb-3 position-relative">
              <label
                htmlFor="passwordConfirm"
                className="form-label"
                style={{
                  color: `var(--blue)`,
                  fontWeight: 500,
                }}
              >
                Confirm Password
              </label>
              <div className={`passwordWrapper position-relative`}>
                <input
                  type={isPasswordShown ? "text" : "password"}
                  className={`form-control ${
                    errors.passwordError ? "border-danger" : ""
                  }`}
                  id="passwordConfirm"
                  aria-describedby="passwordConfirmHelp"
                  value={user.passwordConfirm}
                  onChange={handleChange}
                />
                <i
                  className={`eyeIcon position-absolute`}
                  onClick={togglePasswordIcon}
                >
                  {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </i>
              </div>

              <div
                id="passwordConfirmHelp"
                className={`form-text ${
                  errors.passwordConfirmError === "Matched"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {errors.passwordConfirmError}
              </div>
            </div>

            <button
              style={{
                background: `var(--beige)`,
                border: "none",
              }}
              type="submit"
              className="btn btn-success"
            >
              Register
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

export default AdminRegister;

//test password: Ahmed!9934
//test password: Ahmed!99345
