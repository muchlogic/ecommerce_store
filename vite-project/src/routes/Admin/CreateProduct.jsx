import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [name, setName] = useState("");
  const [productID, setProductID] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("");

  let navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleProductID = (e) => {
    setProductID(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSeller = (e) => {
    setSeller(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    // use error validation
    e.preventDefault();
    let valid = true;
    if (valid) {
      await fetch("https://localhost:3000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          productID: productID,
          price: price,
          seller: seller,
          category: category,
        }),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div>
        <h1>Create Product</h1>
        <form>
          <label className="label">Name</label>
          <input onChange={handleName} value={name} type="text" />

          <label className="label">ProductID</label>
          <input onChange={handleProductID} value={productID} type="text" />

          <label className="label">Price</label>
          <input onChange={handlePrice} value={price} type="text" />

          <label className="label">Seller</label>
          <input onChange={handleSeller} value={seller} type="text" />

          <label className="label">Catagory</label>
          <input onChange={handleCategory} value={category} type="text" />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
