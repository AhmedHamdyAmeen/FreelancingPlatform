import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "./../../../api/axios";
import jwtDecode from "jwt-decode";

import "./Login.css";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function AdminLogin() {
  /** States
   */
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    submitError: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user); // !

    try {
      const data = JSON.stringify({ ...user });

      const config = {
        method: "post",
        url: `/admin/login`,
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
          submitError: "No Server Response",
        });
        return;
      }

      console.log(response, "<===");
      console.log(response.data.token);

      /** Handle Errors
       */
      let token = response.data.token;
      let statusCode = response.status;

      let decodedToken = jwtDecode(token);
      // console.log(decodedToken);

      if (statusCode === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("id", decodedToken.id);
        localStorage.setItem("role", decodedToken.role);
        history.push("/admin-dashboard");
      }
    } catch (error) {
      console.log(error);

      setErrors({
        ...errors,
        submitError: error.response.data.msg,
      });
    }
  };

  const togglePasswordIcon = (e) => {
    setIsPasswordShown(!isPasswordShown);
    console.log(isPasswordShown);
  };

  // const sendResetLink = async () => {
  //   try {
  //     const data = JSON.stringify({
  //       email: user.email,
  //     });

  //     const config = {
  //       method: "post",
  //       url: `/forgot-password/admin`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       accept: "application/json, text/plain, */*",
  //       // withCredentials: true,
  //       data: data,
  //     };

  //     const response = await axiosInstance(config);

  //     if (!response) {
  //       setErrors({
  //         ...errors,
  //         resetError: "No Server Respond",
  //       });
  //     }

  //     console.log(response, "<===");
  //     let statusCode = response.status;

  //     if (statusCode === 200) {
  //       history.push("/forgot-password");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // console.log(error.response.status);
  //     // console.log(error.response.data.msg);

  //     /** Handle Errors
  //      */
  //     setErrors({
  //       ...errors,
  //       resetError: error.response.data.msg,
  //     });
  //   }
  // };

  return (
    <div className="container-fluid loginContainer">
      <div className="row justify-content-center align-items-center vh-100">
        <div className={`bgGray col-11 col-md-8 col-lg-6 p-5 rounded`}>
          <form onSubmit={handleSubmit}>
            {errors.submitError !== "" ? (
              <div className="alert alert-danger" role="alert">
                {`${errors.submitError}`}
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

            <button
              style={{
                background: `var(--beige)`,
                border: "none",
              }}
              type="submit"
              className="btn btn-primary mb-3"
            >
              Login
            </button>

            {errors.resetError !== "" ? (
              <div className="alert alert-danger" role="alert">
                {`${errors.resetError}`}
              </div>
            ) : (
              ""
            )}
          </form>

          {/* <p
          style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          onClick={sendResetLink}
        >
          Forgot password?
        </p> */}
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

export default AdminLogin;
