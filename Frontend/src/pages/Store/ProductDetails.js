import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import buttons from "../../components/FindProjects/buttons.module.css" 

function ProductDetails() {
  const [details, setdetails] = useState([]);
  const params = useParams();
  const token = localStorage.getItem("token");

  const [isSuccessul, setisSuccessul] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isBaught, setIsBaught] = useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${params.id}`)
      .then((res) => {
        setdetails(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBuyer = () => {
    axios.put(`http://localhost:8080/product/${params.id}/buyer`,{}, {
      headers: { Authorization: `bearer ${token}` },
    }).then((res) => {
      setisSuccessul(true)
      setIsBaught(true)
    })
    .catch((error) => {
      setErrorMsg(error.response.data.message)
      setisError(true)
      console.log(error);
    });
  };

  return (
    <div className=" d-flex flex-column h-100  flex-shrink-0 bg-light ">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center">
          <div className="col-lg-8 col-xl-7 col-xxl-6">
            <div className="my-5 text-center text-xl-start">
              <h1 className="display-5 py-3 fw-bolder  mb-2">
                {details.productName}
              </h1>
              <p style={{opacity:.5,marginTop:0}}>by {details.ownerId?.email.split("@")[0]}</p>
              <p className="lead fw-normal text-break mb-4">
                {details.description}
              </p>
            </div>
          </div>
          <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
          {details.image && <img
              className="img-fluid rounded-3 my-5"
             
              src={`http://localhost:8080/${details.image}`}
              alt="..."
            />} 
          </div>
        </div>
      </div>

      <section className="" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-12">
              <div className="row gx-5 row-cols-1 row-cols-md-2">
                <div className="col mb-5 h-100">
                  {/* <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i className="bi bi-gear-wide-connected"></i>
                  </div> */}
                  <h2 className="h5">Skills Used</h2>

                  {details.skills
                    ? details.skills.map((skill, index) => {
                        return (
                          <p key={index} className="mb-0">
                            {skill.name}
                          </p>
                        );
                      })
                    : ""}
                </div>
                <div className="col mb-5 h-100">
                  {/* <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i className="bi bi-ticket-detailed"></i>
                  </div> */}
                  <h2 className="h5">Product Details</h2>
                  <p className="mb-0">Uploaded on : {details.createdAt}</p>
                  <p className="mb-0">Last update : {details.updatedAt}</p>
                  <p className="mb-0">timesOfSell : {details.buyer?.length}</p>
                  <p className="mb-0">Price : {details.price}$</p>
                </div>
                <div></div>
                {/* <Link to="/Product"> */}
                  {!isBaught?
                    <button onClick={()=>{handleBuyer()}} className={`${buttons.regularBeige} btn mb-0`} style={{ borderRadius: "0.375rem" }}>
                    Buy Now!
                  </button>
                  : 

                  <Link to={`http://localhost:8080/${details.product}`} target="_blank" download>
                  <button  className={`${buttons.regularBeige} btn mb-0`} style={{ borderRadius: "0.375rem", backgroundColor: "var(--blue)" }}>
                    Download
                  </button>
                  </Link>
                  }
                {/* </Link> */}
              </div>
            </div>
          </div>
          {isSuccessul && (
        <div style={{marginTop: "5px"}} className="alert alert-success" role="alert">
          Success , Now You can download this Product
        </div>
      )}
      {isError && (
        <div style={{marginTop: "5px"}} className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
        </div>
      </section>

      <div className="skilUsed"></div>
    </div>
    //  /* < className="header container  ">
    //     <img
    //       src={`http://localhost:8080/${details.image}`}
    //       className="col-5"
    //       alt="..."
    //     />
    //     <h5 className="">{details.productName}</h5>
    //     <p className="card-text">{details.description}</p> */}
    //     {/* <div className="details"> */}
    //     {/*at left*/}
    //     {/* <p>item Details {details.price}$</p> */}
    //     {/* <p>item Details {details.createdAt}</p>
    //     <p>item Details {details.updatedAt}</p> */}
    //     {/* <Link>
    //       <button>Buy Now</button>
    //     </Link> */}
    //   {/* </div> */}
  );
}

export default ProductDetails;
