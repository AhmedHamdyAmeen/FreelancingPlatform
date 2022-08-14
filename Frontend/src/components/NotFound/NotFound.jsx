import React from "react";
import { Link } from "react-router-dom";
import { Colors } from "../Colors.module";
function NotFound({ setToken }) {
  return (
    <div className="container d-flex  vh-100">
      <div
        className="row m-auto p-3 rounded justify-content-center"
        // style={{ background: Colors.lightBeige }}
      >
        <div className="col-12 col-lg-9">
          <img
            src={`http://localhost:${process.env.REACT_APP_BACEND_PORT}/public/notFound.png`}
            alt=""
            style={{ maxWidth: "100%" }}
          />
          <div className="text-center">
            <h5 className="text-uppercase my-3" style={{ color: Colors.blue }}>
              404 - Page Not Found
            </h5>
            <p style={{ fontSize: "18px", color: Colors.gray }}>
              The page you are looking might have been removed, had its name
              changed or is temporary unavailable
            </p>
            <Link
              to={"/home"}
              className="btn btn-primary rounded-pill px-3 text-uppercase"
              style={{ background: Colors.blue }}
            >
              go to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
