import { useState, useEffect } from "react";
import Input from "../../components/Store/Input/Input";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import buttons from "../../components/FindProjects/buttons.module.css"
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const params = useParams();
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [productdetails, setProduct] = useState({});
  const [skillsOption, setOption] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSuccessul, setisSuccessul] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${params.id}`)

      .then((res) => {
        setProduct({
          productname: res.data.productName,
          description: res.data.description,
          image: res.data.image,
          price: res.data.price,
          file: res.data.product,
          skills: res.data.skills,
        });
        setSelectedSkills(res.data.skills);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/skill/", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((skills) => {
        let tempArray = [];

        for (let skill of skills.data) {
          tempArray.push({ id: skill._id, name: skill.name });
        }
        setOption(tempArray);
      });
  }, []);
  let newSkills = [];
  const selectedItems = (event) => {
    newSkills = event.map((item) => item.id);
    // console.log('event :>>>> ', ...event);
  };

  console.log(productdetails.productname);
  // console.log(res);

  const [productErrors, setproductErrors] = useState({
    productnameErr: "",
    descriptionErr: "",
    imageErr: "",
    priceErr: "",
    fileErr: "",
    skillsErr: "",
  });

  const handleproductChange = (event) => {
    if (isError) setisError(false)
    if (isSuccessul) setisSuccessul(false)
    let value;
    if (event.target.id === "image" || event.target.id === "file") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setProduct({

      ...productdetails,
      [event.target.id]: value,
    });
    handleValidation(event.target.id, value);
  };

  const handleValidation = (field, value) => {
    switch (field) {
      case "productname":
        setproductErrors({
          ...productErrors,
          productnameErr: value.length === 0 ? "This field is required" : "",
        });
        break;

      case "description":
        setproductErrors({
          ...productErrors,
          descriptionErr:
            value.length === 0
              ? "This field is required"
              : value.length < 100
                ? "Length must be greater than 100 characters"
                : "",
        });
        break;

      case "price":
        setproductErrors({
          ...productErrors,
          priceErr: value.length === 0 ? "This field is required" : "",
        });
        break;
      case "image":
        setproductErrors({
          ...productErrors,
          imageErr:
            value.length === 0
              ? "This field is required"
              : value.match(/\.(jpg|png)$/)
                ? ""
                : "incorrect file...Upload image ",
        });
        break;
      case "file":
        setproductErrors({
          ...productErrors,
          fileErr:
            value.length === 0
              ? "This field is required"
              : value.match(/\.(zip)$/)
                ? ""
                : "incorrect Path...Upload Zip file ",
        });
        break;
      case "skills":
        setproductErrors({
          ...productErrors,
          skillErr: value.length === 0 ? "This field is required" : "",
        });
        break;

      default:
        setproductErrors({
          ...productErrors,
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setproductErrors({
      ...productErrors,
    });

    let emptyValues = Object.values(productdetails).filter((v) => {
      return v === "";
    });
    let errors = Object.values(productErrors).filter((e) => {
      return e !== "";
    });

    if (emptyValues.length > 0 || errors.length > 0) {
      let msg = errors.length > 0 ? errors[0] : "Please check required fields"
      setErrorMsg(msg)
      setisError(true);
      return;
    }
    const formData = new FormData();
    formData.append("product", productdetails.file);
    formData.append("product", productdetails.image);
    formData.append("productName", productdetails.productname);
    formData.append("description", productdetails.description);
    formData.append("price", productdetails.price);
    formData.append("skills", JSON.stringify(newSkills));

    axios
      .put(
        `http://localhost:8080/product/${params.id}`,
        formData,
        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((res) => {
        setisSuccessul(true)
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message)
        setisError(true)
        console.log(error);
      });

    console.log("productdetails>>>", productdetails);
  };

  return (
    <div className="container my-5 bg-light">
      <h1 className="my-3">update Product</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="productname" className="form-label">
            Product Name*
          </label>
          <Input
            type="text"
            id="productname"
            hasError={productErrors.productnameErr}
            value={productdetails.productname}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="productnameHelp" className="form-text text-danger">
            {productErrors.productnameErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Product Description*
          </label>
          <Input
            type="text"
            id="description"
            hasError={productErrors.descriptionErr}
            value={productdetails.description}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="descriptionHelp" className="form-text text-danger">
            {productErrors.descriptionErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price*
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            aria-describedby="priceHelp"
            value={productdetails.price}
            onChange={(e) => handleproductChange(e)}
          />
          <div id="priceHelp" className="form-text text-danger">
            {productErrors.priceErr}
          </div>
        </div>

        {/* {selectedSkills} */}
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">
            Skills Used in Product*
          </label>

          <Multiselect
            options={skillsOption}
            displayValue="name"
            id="skills"
            aria-describedby="skillHelp"
            selectedValues={selectedSkills}
            onSelect={(e) => {
              selectedItems(e);
            }}
          />
          <div id="skillHelp" className="form-text text-danger">
            {productErrors.skillErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            To change the current image, choose new one :
          </label>
          <Input
            type="file"
            id="image"
            hasError={productErrors.imageErr}
            // value={productdetails.image}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="imageHelp" className="form-text text-danger">
            {productErrors.imageErr}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            To change the current file, choose new one :
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            aria-describedby="fileHelp"
            // value={productdetails.file}
            onChange={(e) => handleproductChange(e)}
          />
          <div id="positionHelp" className="form-text text-danger">
            {productErrors.fileErr}
          </div>
        </div>
        <button type="submit" className={`${buttons.regularBeige} btn`} >
          Save
        </button>
        {isSuccessul && (
          <div style={{ marginTop: "5px" }} className="alert alert-success" role="alert">
            Product Updated successfully
          </div>
        )}
        {isError && (
          <div style={{ marginTop: "5px" }} className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
      </form>

    </div>
  );
}

export default UpdateProduct;
