import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CreateProduct/CreateProduct.css";
import { PostRequest } from "../../utils/requests";

const CreateProduct = () => {
  const [imageProductUrl, setImageProductUrl] = useState("");
  const [inputsValue, setInputsValue] = useState("");
  const selectInputRef = useRef();
  // const requests = new Requests();
  const navigate = useNavigate();
  const [productError, setProductError] = useState("");

  function getPathOfImg(e) {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    try {
      fileReader.onload = _ => {
        setImageProductUrl(fileReader.result);
        console.log(fileReader.result);
      };
      fileReader.onerror = e => console.log(e);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeInput = (e) =>
    setInputsValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const createProduct = async (e) => {
    e.preventDefault();
    const product = {
      title: inputsValue["title"],
      imageUrl: imageProductUrl,
      price: inputsValue["price"],
      category: inputsValue["category"],
      desc: inputsValue["desc"],
    };
    try {
      // const res = await requests.post("/product", JSON.stringify(product));
      const res = await PostRequest("/product", JSON.stringify(product));
      const data = await res.json();
      console.log("response product", res);
      console.log("data product", data);
      if (data.product) {
        navigate("/products");
      } else {
        setProductError(data.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-product">
      <form onSubmit={createProduct}>
        <div className="input-box ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Product Title"
            name="title"
            onChange={handleChangeInput}
          />
        </div>
        <div className="error">{productError && productError.title}</div>

        {/*???????????????????????????????????? */}
        <div className="input-box select">
          <input
            type="file"
            accept="image/jpg"
            ref={selectInputRef}
            onChange={(e) => getPathOfImg(e)}
            style={{ display: "none" }}
          />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                selectInputRef.current.click();
              }}
            >
              Add Photo
            </button>
            <img
              alt="Product Figure"
              style={{ width: "200px", height: "200px", display: "block" }}
              src={imageProductUrl}
            />
          </div>
        </div>
        <div className="error">{productError && productError.imageUrl}</div>
        {/* ????????????????????????????????????☻ */}

        <div className="input-box">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChangeInput}
          />
        </div>
        <div className="error">{productError && productError.price}</div>

        <div className="input-box">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Category"
            name="category"
            onChange={handleChangeInput}
          />
        </div>
        <div className="error">{productError && productError.category}</div>

        <div className="input-box">
          <label htmlFor="desc">Description</label>
          <textarea
            placeholder="Description"
            name="desc"
            onChange={handleChangeInput}
          />
        </div>
        <div className="error">{productError && productError.desc}</div>

        <button> Create Product </button>
      </form>
    </div>
  );
};

export default CreateProduct;
