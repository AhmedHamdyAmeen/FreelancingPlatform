import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Uploadproject from "../../../pages/Store/UpdateProduct";
import { createBrowserHistory } from "history";
import buttons from "../../FindProjects/buttons.module.css";

const history = createBrowserHistory();

const ProductsCard = (res) => {
  // useEffect
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8080/product/${res.product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.go(0);
      });
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/product/details/${res.product._id}`}>
          <img
            width="100%"
            height="219"
            src={`http://localhost:8080/${res.product.image}`}
            className="card-img-top"
            alt="..."
          />
        </Link>

        <div className=" ">
          <div style={{ padding: "1rem 1rem" }}>
            <h5 className="card-title">{res.product.productName}</h5>
            {/* <p style={{opacity:.5,marginTop:0}}>by {res.ownerId?.email.split("@")[0]}</p> */}

            <Link
              className=" text-decoration-none text-muted"
              to={`/product/details/${res.product._id}`}
            >
              <p className=" text-decoration-none text-muted">
                {res.product.description}
              </p>
            </Link>
          </div>

          <section
            style={{
              width: "100%",
              padding: "0",
              margin: "0",
              backgroundColor: "var(--lightBlue)",
            }}
          >
            <div
              style={{ padding: ".5rem .5rem" }}
              className="d-flex justify-content-between align-items-center"
            >
              <small className="text-muted">Views {res.product.views} </small>

              <div
                className=" btn-sm border"
                style={{
                  backgroundColor: "var(--grey)",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "2px solid",
                }}
              >
                price {res.product.price} $
              </div>


              {res.product.ownerId._id == id && (role === "freelancer" || role === "team") && (
                <Link to={`/product/update/${res.product._id}`}>
                  <button
                    className={`${buttons.regularBeige} btn`}
                    // style={{ borderRadius: "0.375rem",  }}
                    onClick={(sendId) => {
                      <Uploadproject id={sendId} />;
                    }}
                  >
                    Edit
                  </button>
                </Link>
              )}

              {(role === "admin" || id == res.product.ownerId._id) && (
                <Link to="/product">
                  <button
                    className={`${buttons.regularBeige} btn`}
                    onClick={() => deleteProduct()}
                  >
                    Delete
                  </button>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
