import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductPreview({ product, third }) {
  const classValue = third
    ? "text-black  h-[40vw] lg:h-[400px] w-[40vw] lg:w-[28vw] lg:snap-center mx-[1vw] mb-[1vw] mt-[1vw] lg:my-[0px] lg:mx-[0px]"
    : "text-black h-[40vw] lg:h-[400px] w-[40vw] lg:w-[28vw] lg:snap-center mx-[1vw] mb-[1vw] mt-[1vw] lg:my-[0px] lg:mx-[0px] lg:mr-[2vw]";

  return (
    <>
      <li>
        {product.name ? (
          <div className={"bg-slate-500 hover:bg-slate-700 " + classValue}>
            <Link to={`/home/product-page/${product.productID}`}>
              <div className="h-[400px]">
                <h1>{product.name}</h1>
              </div>
            </Link>
          </div>
        ) : (
          <div
            className={
              "bg-black " + classValue + " hidden lg:block lg:invisible"
            }
          ></div>
        )}
      </li>
    </>
  );
}

export default ProductPreview;
