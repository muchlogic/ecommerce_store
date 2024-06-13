import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import BestSellingItem from "./BestSellingItem";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BestSellingWheel({}) {
  const [bestSelling, setBestSelling] = useState([]);

  useEffect(() => {
    // get all products in db
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
    let carousels = document.getElementsByClassName("best-selling-wheel");
    carousels[0].scrollLeft += 300; // 300 is width of each snap item
  };

  const moveWheelLeft = () => {
    let carousels = document.getElementsByClassName("best-selling-wheel");
    carousels[0].scrollLeft -= 300;
  };

  let mouseDown = false;
  let startX, scrollLeft;
  const slider = document.getElementsByClassName("best-selling-wheel")[0];
  const items = document.getElementsByClassName("best-selling-item");
  const startDragging = (e) => {
    let delayInMilliseconds = 200; //1 second
    slider.classList.remove("scroll-smooth");
    slider.classList.remove("snap-x");
    slider.classList.add("scroll-auto");

    setTimeout(function () {
      // add delay before disabling links to distinguish clicks and holds
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("pointer-events-auto");
        // items[i].classList.remove("snap-center");
        // items[i].classList.remove("md:snap-start");
        items[i].classList.add("pointer-events-none");
      }
    }, delayInMilliseconds);

    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const stopDragging = (e) => {
    e.preventDefault();
    slider.classList.add("scroll-smooth");
    slider.classList.add("snap-x");
    slider.classList.remove("scroll-auto");

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("pointer-events-none");
      items[i].classList.add("pointer-events-auto");
      // items[i].classList.add("snap-center");
      // items[i].classList.add("md:snap-start");
    }
    mouseDown = false;
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  };

  return (
    <>
      <div
        className="relative bg-white mt-10"
        onMouseUp={(e) => stopDragging(e)}
        onMouseMove={(e) => move(e)}
        onMouseLeave={(e) => stopDragging(e)}
        onMouseDown={(e) => startDragging(e)}
      >
        <div className="h-[420px] w-[96vw] text-black relative left-[50%] translate-x-[-50%]">
          <ul className="best-selling-wheel flex overflow-scroll overflow-y-hidden overflow-x-hidden scroll-smooth snap-x">
            {bestSelling ? (
              bestSelling.map((item, index) => {
                return (
                  <BestSellingItem
                    key={item.productID}
                    item={item}
                    first={index === 0}
                    last={index === bestSelling.length - 1}
                    startDragging={startDragging}
                  />
                );
              })
            ) : (
              <p>loading</p>
            )}
          </ul>
        </div>
        <div className="w-[94vw] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between">
          <div className="mx-2">
            {" "}
            <IconButton onClick={() => moveWheelLeft()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="mx-2">
            {" "}
            <IconButton onClick={() => moveWheelRight()}>
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestSellingWheel;
