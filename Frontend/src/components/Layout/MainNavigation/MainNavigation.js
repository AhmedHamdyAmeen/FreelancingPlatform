import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";




export default function MainNavigator() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // const [token, setState] = useState(localStorage.getItem("token"))

  const history = useHistory();
  const [team, setTeam] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const user = useSelector((state) => state.user);

  const logoutHandler = (e) => {
    // setState(localStorage.getItem("token"));
    history.push("/login");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      const teamApi = axios({
        url: `http://localhost:8080/team/member`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      teamApi
        .then((res) => {
          console.log(res);
          setTeam(res.data._id);
        })
        .catch((error) => {
          console.log(error.code, error.message, error.response.data);
        });
    }
  }, [token]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${classes.nav}`}
    >
      <div className="container-fluid">
        <Link className={`navbar-item navbar-brand ${classes.logo}`} to="/" id="top">
          {/* <img
            src="./static/logo.png"
            alt=""
            width="200"
            height="24"
            className="d-inline-block align-text-top"
          /> */}
          Devolanco
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
          style={{ border: 'none', outline: 'none', color: '#fff' }}>
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className={`nav-item `}>
                <Link
                  to="/project"
                  className={`nav-link ${classes.navLink} ${classes.active} mx-3`}
                  aria-current="page"
                >
                  Find Projects
                </Link>
              </li>
              <li className={`nav-item me-3`}>
                <Link
                  to="/product"
                  className={`nav-link ${classes.navLink}`}
                  aria-current="page"
                >
                  Store
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link
                  to="/education"
                  className={`nav-link ${classes.navLink}`}
                  aria-current="page"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex">
          {console.log("token", token)}
          {token ? (
            <>
              <Link to={`/${user.role}/${user.id}`}>
                <div className="d-flex ">
                  <img
                    src={
                      user.role == "freelancer"
                        ? userDetails.profileImage
                          ? userDetails.profileImage
                          : "/static/default.jpg"
                        : user.role == "client"
                          ? userDetails.picture
                            ? userDetails.picture
                            : "/static/default.jpg"
                          : user.role == "company" || user.role == "team"
                            ? userDetails.logo
                              ? userDetails.logo
                              : "/static/default.jpg"
                            : ""
                    }
                    className={classes.profileImage}
                    alt=""
                  />
                  <h6 className={`my-auto ps-2 ${classes.username}`}>
                    {(user.role == "freelancer" || user.role == "client") &&
                      `${userDetails.firstName} ${userDetails.lastName}`}
                    {(user.role == "company" || user.role == "team") &&
                      `${userDetails.name}`}
                  </h6>
                </div>
              </Link>
              <div
                className={`d-inline-block dropdown ${classes.dropdown}`}
                data-bs-toggle="dropdown"
              >
                <RiArrowDropDownLine />
                <ul className="dropdown-menu  text-small shadow dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => history.push(`/${user.role}/${user.id}`)}
                    >
                      profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => history.push("/change-password")}
                    >
                      change password
                    </button>
                  </li>
                  {team && role === "freelancer" && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => history.push(`/team/${team}`)}
                      >
                        switch to team account
                      </button>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logoutHandler}>
                      logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className={`btn ${classes.signIn} me-2 `}
                // onClick={() => {
                //   history.push("/login");
                // }}
                >
                  log in
                </button>
              </Link>
              <Link to="/register">
                <button
                  className={`btn ${classes.signIn} `}
                // onClick={() => {
                //   history.push("/register");
                // }}
                >
                  sign up
                </button>
              </Link>
            </>
          )}
        </div>

      </div >
    </nav >
  );
}
