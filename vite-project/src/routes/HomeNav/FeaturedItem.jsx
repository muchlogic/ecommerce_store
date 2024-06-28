import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Button from "@mui/material/Button";

function FeaturedItem({ item, first, last, startDragging, index }) {
  return (
    <>
      <div className="">
        <div
          className={
            "best-selling-item pointer-events-auto w-[300px] h-[380px] flex flex-col justify-around items-center border-b-[0.5px] border-gray-500 select-none m-5" +
            (first ? " md:ml-0" : " ") +
            (last ? " md:mr-0" : " ")
          }
        >
          <Link to={`/Home/product-page/${item.productID}`} draggable="false">
            <div className="text-white text-3xl w-[300px] h-[300px] bg-slate-600 hover:bg-slate-700 transition-colors ease-in-out">
              {index}
            </div>
          </Link>

          <Link to={`/Home/product-page/${item.productID}`} draggable="false">
            <div className="flex flex-col justify-center items-center hover:text-[#685d5d]">
              <h1>{item.name}</h1>
              <h1>From ${item.price}</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FeaturedItem;
