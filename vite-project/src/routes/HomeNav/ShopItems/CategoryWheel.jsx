import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CategoryWheel({ category, n }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // get all products in db
    fetch(`https://localhost:3000/products/filter/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * 10000000) + 1;
        while (data.length % 3 != 0) {
          data.push({
            productID: randomNumber,
            name: null,
            price: null,
            seller: null,
          });
          randomNumber = Math.floor(Math.random() * 10000000) + 1;
        }
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const moveCarouselRight = () => {
    let carousels = document.getElementsByClassName("carousel");
    let scrollVal = (88 / 100) * window.innerWidth;
    if (
      carousels[n].scrollLeft + scrollVal <=
      carousels[n].scrollWidth - carousels[n].clientWidth
    ) {
      carousels[n].scrollLeft += scrollVal;
    }
  };

  const moveCarouselLeft = () => {
    let carousels = document.getElementsByClassName("carousel");
    let scrollVal = (88 / 100) * window.innerWidth;
    carousels[n].scrollLeft -= scrollVal;
  };
  return (
    <>
      <div className="border-b-[0.5px] border-slate-500 mb-10">
        <h1 className={(products ? "visible" : "invisible") + " text-xl"}>
          {category.charAt(0).toUpperCase() + category.slice(1) + "'s"}
        </h1>
        <div className="text-xl relative my-2">
          <div className="carousel relative lg:scroll-smooth lg:flex w-[88vw] lg:snap-x lg:overflow-scroll lg:overflow-y-hidden lg:overflow-x-hidden left-[50%] translate-x-[-50%]">
            <ul className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start">
              {products ? (
                products.map((product, index) => {
                  let third = (index + 1) % 3 === 0;
                  return (
                    <ProductPreview
                      key={product.productID}
                      product={product}
                      third={third}
                    />
                  );
                })
              ) : (
                <div className="w-[88vw] h-[40vw] lg:h-[400px] animate-pulse bg-slate-500"></div>
              )}
            </ul>
          </div>

          <div
            className={
              (products ? "visible" : "invisible") +
              " text-xl absolute right-0 -top-10"
            }
          >
            <Link to={`/home/shop/${category}`}>
              <h1 className="text-black text-xl hover:text-[#aca4a4] ">
                View All
              </h1>
            </Link>
          </div>

          <div
            className={
              (products ? "visible" : "invisible") +
              " w-[88vw] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] hidden lg:flex justify-between"
            }
          >
            <div className="mx-2">
              {" "}
              <IconButton onClick={() => moveCarouselLeft()}>
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </div>
            <div className="mx-2">
              {" "}
              <IconButton onClick={() => moveCarouselRight()}>
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryWheel;
