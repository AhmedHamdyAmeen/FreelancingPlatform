import { useState, useEffect } from "react";
import Input from "../../components/Store/Input/Input";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import buttons from "../../components/FindProjects/buttons.module.css"
// import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function CreateProduct() {
  // let navigate = useNavigate();
  const [product, setProduct] = useState({
    productname: "",
    description: "",
    image: "",
    price: "",
    file: "",
  });

  const [productErrors, setProductErrors] = useState({
    productnameErr: "",
    descriptionErr: "",
    imageErr: "",
    priceErr: "",
    fileErr: "",
    skillsErr: "",
  });

  const [skillsOption, setOption] = useState([]);
  const [isSuccessul, setisSuccessul] = useState(false);
  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  let selectedValue = [];

  useEffect(() => {
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
  const selectedItems = (event) => {
    selectedValue = event.map((item) => item.id);

    // console.log('event :>>>> ', ...event);
  };

  const id = localStorage.getItem("id");
  // console.log(id);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleproductChange = (event) => {
    // console.log(event.target.id, event.target.value);
    if(isError) setisError(false)
    if(isSuccessul) setisSuccessul(false)

    let value;
    if (event.target.id === "image" || event.target.id === "file") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setProduct({
      ...product,
      [event.target.id]: value,
    });

    handleValidation(event.target.id, event.target.value);
  };

  /********handle Error  */
  const handleValidation = (field, value) => {
    switch (field) {
      case "productname":
        setProductErrors({
          ...productErrors,
          productnameErr: value.length === 0 ? "This field is required" : "",
        });
        break;

      case "description":
        setProductErrors({
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
        setProductErrors({
          ...productErrors,
          priceErr: value.length === 0 ? "This field is required" : "",
        });
        break;
      case "image":
        setProductErrors({
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
        setProductErrors({
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
        setProductErrors({
          ...productErrors,
          skillsErr: value.length === 0 ? "This field is required" : "",
        });
        break;

      default:
        setProductErrors({
          ...productErrors,
        });
    }
  };

  /*******handle submit ******/
  const handleSubmit = (event) => {
    event.preventDefault();

    let emptyValues = Object.values(product).filter((v) => {
      return v === "";
    });
    let errors = Object.values(productErrors).filter((e) => {
      return e !== "";
    });

    if (emptyValues.length>0 || errors.length>0) {
      let msg = errors.length > 0? errors[0]: "Please check required fields"
      setErrorMsg(msg)
      setisError(true);
      return;
    }

    
    const formData = new FormData();
    formData.append("product", product.file);
    formData.append("product", product.image);
    formData.append("productName", product.productname);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("skills", JSON.stringify(selectedValue));
    formData.append("ownerModel", role);
    formData.append("ownerId", id);
     axios
      .post("http://localhost:8080/product/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setisSuccessul(true)
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message)
        setisError(true)
        console.log(error);
      });
  };

  return (
    <div className="container my-5 bg-light">
      <h1 className="my-3">Create Product</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="productname" className="form-label">
            Product Name*
          </label>
          <Input
            type="text"
            id="productname"
            hasError={productErrors.productnameErr}
            value={product.productname}
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
            value={product.description}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="descriptionHelp" className="form-text text-danger">
            {productErrors.descriptionErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Cover image*
          </label>
          <Input
            type="file"
            id="image"
            hasError={productErrors.imageErr}
            // value={product.image}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="imageHelp" className="form-text text-danger">
            {productErrors.imageErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price*
          </label>
          <Input
            type="number"
            className="form-control"
            id="price"
            aria-describedby="priceHelp"
            value={product.price}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="priceHelp" className="form-text text-danger">
            {productErrors.priceErr}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Upload File*
          </label>
          <Input
            type="file"
            className="form-control"
            id="file"
            aria-describedby="fileHelp"
            // value={product.file}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="positionHelp" className="form-text text-danger">
            {productErrors.fileErr}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="skills" className="form-label">
            Skills Used in Product*
          </label>
          <Multiselect
            options={skillsOption}
            displayValue="name"
            id="skills"
            aria-describedby="skillHelp"
            // selectedValues={selectedValue}
            onSelect={(e) => {
              selectedItems(e);
            }}
            handleChange={(e) => handleproductChange(e)}
          />
          <div id="skillHelp" className="form-text text-danger">
            {productErrors.skillsErr}
          </div>
        </div>
        <button className={`${buttons.regularBeige} btn`} type="submit">
          Publish
        </button>
      </form>

      {isSuccessul && (
        <div style={{marginTop: "5px"}} className="alert alert-success" role="alert">
          Product created successfully
        </div>
      )}
      {isError && (
        <div style={{marginTop: "5px"}} className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </div>
  );
}

export default CreateProduct;
