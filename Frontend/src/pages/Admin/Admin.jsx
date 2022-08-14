import React from "react";
import { Link } from "react-router-dom";

import "./Admin.css";

function Admin() {
  return (
    <>
      <div className="container-fluid py-5 vh-100 AdminContainer d-flex justify-content-center align-items-center">
        <div className="row justify-content-center align-align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 rounded adminLinkControls">
            <div className="d-flex flex-column justify-content-around ">
              <Link
                to="/admin/login"
                className="btn my-4"
                style={{ background: `var(--beige)` }}
              >
                Admin login
              </Link>

              <Link
                to="/admin/register"
                className="btn my-4"
                style={{ background: `var(--beige)` }}
              >
                Admin SignUP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
