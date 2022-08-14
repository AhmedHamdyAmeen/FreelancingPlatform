import React from "react";
import { Link } from "react-router-dom";
import "./../../../pages/Home/Home.css";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaBehance,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  return (
    <section className="footer py-5">
      <div className="container position-relative">
        <a href="#top" className="rounded-circle position-absolute arrowToUp">
          <FaArrowUp />
        </a>

        <div className="row ">
          <div className="col-12 col-md-6 col-lg-6 mb-3 text-center text-lg-start">
            <h2 className="logo py-3 text-center text-lg-start">Devolenco</h2>
            <div className="aboutUs">
              <p>
                Devolenco.com is an online marketplace connecting employers from
                around the world with vetted and certified freelance talents
                across all professional programming fields with maximum value
                and high return guaranteed.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <h4 className="py-3 text-center text-lg-start">More Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <Link to="/project">Find Projects</Link>
              </li>
              <li>
                <Link to="/product">Store</Link>
              </li>
              <li>
                <Link to="/education">Eduction</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-12 col-lg-3 text-center">
            <h4 className="py-3">Contact US</h4>
            <div className="social d-flex justify-content-center">
              <span>
                <FaFacebook />
              </span>
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaLinkedin />
              </span>
              <span>
                <FaPinterest />
              </span>
              <span>
                <FaBehance />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
