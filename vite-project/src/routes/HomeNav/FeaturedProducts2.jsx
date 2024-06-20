import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeaturedItem from "./FeaturedItem2";

function FeaturedProducts({}) {
  const [bestSelling, setBestSelling] = useState([]);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);

  let mouseDown = false;
  let startX;

  // let currentTranslateX;
  const slider = document.getElementsByClassName("best-selling-wheel")[0];
  const items = document.getElementsByClassName("best-selling-item");
  useEffect(() => {
    // get all products in db
    if (slider) slider.style.transform = `translateX(0px)`;
    fetch(`https://localhost:3000/products/filter/tool`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBestSelling(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const moveWheelRight = () => {
    slider.style.transform = `translateX(${currentTranslateX - 310}px)`;
    setCurrentTranslateX(currentTranslateX - 310);
  };

  const moveWheelLeft = () => {
    slider.style.transform = `translateX(${currentTranslateX + 310}px)`;
    setCurrentTranslateX(currentTranslateX + 310);
  };

  const startDragging = (e) => {
    mouseDown = true;
    slider.classList.remove("transition-transform", "ease-linear");

    startX = e.pageX - slider.offsetLeft;
    let matrix = new WebKitCSSMatrix(slider.style.transform);
    setCurrentTranslateX(matrix.m41);
    // currentTranslateX = matrix.m41;

    setTimeout(function () {
      // add delay before disabling links to distinguish clicks and holds
      for (let i = 0; i < items.length; i++) {
        items[i].classList.replace(
          "pointer-events-auto",
          "pointer-events-none"
        );
      }
    }, 200);
  };

  const stopDragging = (e) => {
    e.preventDefault();
    mouseDown = false;

    slider.classList.add("transition-transform", "ease-linear");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.replace("pointer-events-none", "pointer-events-auto");
    }

    let matrix = new WebKitCSSMatrix(slider.style.transform);

    slider.style.transform = `translateX(${
      currentTranslateX -
      (currentTranslateX +
        items[Math.abs(Math.ceil(matrix.m41 / 310))].offsetLeft)
    }px)`;
    setCurrentTranslateX(
      currentTranslateX -
        (currentTranslateX +
          items[Math.abs(Math.ceil(matrix.m41 / 310))].offsetLeft)
    );
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.style.transform = `translateX(${currentTranslateX + scroll}px)`;
  };

  return (
    <>
      <div className="relative">
        <div
          className="bg-white mt-10"
          onMouseUp={(e) => stopDragging(e)}
          onMouseMove={(e) => move(e)}
          // onMouseLeave={(e) => stopDragging(e)}
          onMouseDown={(e) => startDragging(e)}
        >
          <h1 className="text-2xl relative left-[50%] translate-x-[-50%] w-fit h-fit p-4 select-none">
            Featured
          </h1>
          <div className="h-[800px] w-[96vw] text-black overflow-hidden ">
            <div className="best-selling-wheel flex transition-transform ease-linear delay-0">
              {bestSelling ? (
                bestSelling.map((item, index) => {
                  return (
                    <FeaturedItem
                      key={item.productID}
                      item={item}
                      first={index === 0}
                      last={index === bestSelling.length - 1}
                      startDragging={startDragging}
                      index={index}
                    />
                  );
                })
              ) : (
                <p>loading</p>
              )}
            </div>
          </div>
          {/* <div className="w-[94vw] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between">
          <div className="mx-2">
            <IconButton onClick={() => moveWheelLeft()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="mx-2">
            <IconButton onClick={() => moveWheelRight()}>
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </div>
        </div> */}
        </div>
        <div className="w-[94vw] flex justify-between absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="mx-2">
            <IconButton onClick={() => moveWheelLeft()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="mx-2">
            <IconButton onClick={() => moveWheelRight()}>
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
