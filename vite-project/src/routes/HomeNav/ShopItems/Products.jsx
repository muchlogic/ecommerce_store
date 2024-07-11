import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import CategoryWheel from "./CategoryWheel";

function Products() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // get all categories in db
    fetch(`https://localhost:3000/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="px-[6vw] mt-[2vh] relative flex flex-row flex-wrap">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full mb-5">
          Products By Catagory
        </h1>
        {categories ? (
          categories.map((category, index) => {
            return (
              <CategoryWheel
                key={Math.floor(Math.random() * 10000000) + 1}
                category={category}
                n={index}
              />
            );
          })
        ) : (
          <div className="w-[1000px] h-[1000px] animate-pulse">dog</div>
        )}
      </div>
    </>
  );
}

export default Products;
