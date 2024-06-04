import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Product({ product }) {
  return (
    <>
      <li>
        <div className="bg-white text-black m-2 h-[200px] w-[200px]">
          <h1>{product.name}</h1>
          <h1>{product.price}</h1>
          <h1>{product.seller}</h1>
          <Button variant="contained">Add To Cart</Button>
        </div>
      </li>
    </>
  );
}

export default Product;
