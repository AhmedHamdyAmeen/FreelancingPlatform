import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosInstance from "./../../../api/axios";

function ActivateMail() {
  const params = useParams();
  const history = useHistory();
  const [error, setError] = useState("");

  // console.log(params.userType);
  // console.log(params.vToken);

  const confirmEmail = async () => {
    try {
      const data = JSON.stringify({
        token: params.vToken,
      });

      const config = {
        method: "post",
        url: `/activate-account/${params.userType}`,
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json, text/plain, */*",
        // withCredentials: true,
        data: data,
      };

      const response = await axiosInstance(config);

      if (!response) {
        setError("No Server Respond");
      }

      console.log(response, "<===");
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
      if (
        `${error.response.data.msg}`.includes("TokenExpiredError: jwt expired")
      ) {
        setError("Token Expired, SignUp Again!");
      }
    }
  };

  // :userType/:vToken
  return (
    <div className="container-fluid loginContainer">
      <div className=" row justify-content-center align-content-center vh-100">
        <div
          className="col-11 col-md-8 col-lg-6 p-5 rounded text-center "
          style={{
            color: `var(--blue)`,
            "font-weight": "bolder",
            "font-size": "1.3em",
            fontFamily: "Courgette",
            lineHeight: 2,
          }}
        >
          {error !== "" ? (
            <div className="alert alert-danger" role="alert">
              {`${error}`}
            </div>
          ) : (
            ""
          )}
          {params.vToken ? (
            <>
              <p>Are Your sure for confirmation?! </p>

              <button
                style={{
                  background: `var(--beige)`,
                  border: "none",
                }}
                className="btn btn-success mt-4"
                onClick={confirmEmail}
              >
                confirm
              </button>
            </>
          ) : (
            <p>
              Email verification link has been sent to your mail, kindly
              activate your account. Please follow the instruction in the email
              message to activate your Account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivateMail;
