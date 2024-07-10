import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeaturedItem from "./FeaturedItem";

// Featued Product Slider for Home page
function FeaturedProducts({ category, title }) {
  const [bestSelling, setBestSelling] = useState([]);
  const [currentTranslateX, setCurrentTranslateX] = useState(0); // track mouse starting pos for sliding
  const [currentItem, setCurrentItem] = useState(0); // track item currently snapped to by transforms

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // track window width to change transforms when resizing window

  let mouseDown = false;
  let startX;

  // let currentTranslateX;
  const slider = document.getElementsByClassName("best-selling-wheel")[0];
  const items = document.getElementsByClassName("best-selling-item");
  useEffect(() => {
    // get all products in db
    if (slider) slider.style.transform = `translateX(0px)`;
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
        setBestSelling(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // helper function for adjusting positioning of slider to clip to the left of inner content
  const adjust = () => {
    let matrix = new WebKitCSSMatrix(slider.style.transform);

    if (matrix.m41 / 310 < 0) {
      // check if new pos is valid ie. moves in the direction of new content
      if (
        // checks whether the slider is exceeding the last piece of content (last item)
        Math.abs(matrix.m41 - slider.clientWidth) <
          items[items.length - 1].offsetLeft + 200 &&
        currentItem < items.length
      ) {
        // calculate delta between snap point and curr point and adjust the transform of slider
        // 1. find adjustment which is translateX(curr) - translateX(item to clip to)
        // 2. subtract the delta from translateX(curr) to move the slider on a clip point (ie. start of item 4)
        let adjustment =
          currentTranslateX +
          items[Math.abs(Math.ceil(matrix.m41 / 310))].offsetLeft;
        slider.style.transform = `translateX(${
          currentTranslateX - adjustment
        }px)`;
        setCurrentTranslateX(currentTranslateX - adjustment);
        setCurrentItem(Math.abs(Math.ceil(matrix.m41 / 310)));
      } else {
        // case: clip to end of last item
        slider.style.transform = `translateX(${
          -1 * (items[items.length - 1].offsetLeft + 310 - slider.clientWidth)
        }px)`;
        setCurrentTranslateX(
          -1 * (items[items.length - 1].offsetLeft + 310 - slider.clientWidth)
        );
        setCurrentItem(items.length - 1);
      }
    } else {
      // case: clip to first item
      slider.style.transform = `translateX(0px)`;
      setCurrentTranslateX(0);
      setCurrentItem(0);
    }
  };

  const moveWheelRight = () => {
    let matrix = new WebKitCSSMatrix(slider.style.transform);
    if (
      // case: item is not the last one
      Math.abs(matrix.m41 - slider.clientWidth) + 310 <
        items[items.length - 1].offsetLeft + 200 &&
      currentItem < items.length
    ) {
      slider.style.transform = `translateX(${-items[currentItem + 1]
        .offsetLeft}px)`;

      setCurrentTranslateX(-items[currentItem + 1].offsetLeft);
      setCurrentItem(currentItem + 1);
    } else {
      // case: clip to last item
      slider.style.transform = `translateX(${
        -1 * (items[items.length - 1].offsetLeft + 310 - slider.clientWidth)
      }px)`;
      setCurrentTranslateX(
        -1 * (items[items.length - 1].offsetLeft + 310 - slider.clientWidth)
      );
      setCurrentItem(items.length - 1);
    }
  };

  const moveWheelLeft = () => {
    if (currentItem > 0) {
      if (currentItem < items.length - 1) {
        // case: item isn't the last one
        slider.style.transform = `translateX(${-items[currentItem - 1]
          .offsetLeft}px)`;

        setCurrentTranslateX(-items[currentItem - 1].offsetLeft);
        setCurrentItem(currentItem - 1);
      } else {
        // case: item is the last one, so calculate snap point by (dividing the TranslateX(last item) by the width - 1)
        let newItem = Math.floor(
          (items[items.length - 1].offsetLeft - slider.clientWidth) / 310
        );
        console.log(newItem);
        slider.style.transform = `translateX(${
          -1 * items[newItem].offsetLeft
        }px)`;
        setCurrentTranslateX(-1 * items[newItem].offsetLeft);
        setCurrentItem(newItem);
      }
    }
  };

  const startDragging = (e) => {
    slider.classList.remove("transition-transform", "ease-linear");
    startX = e.pageX - slider.offsetLeft;
    let matrix = new WebKitCSSMatrix(slider.style.transform);
    setCurrentTranslateX(matrix.m41);
    mouseDown = true;
    setTimeout(function () {
      // add delay before disabling links to distinguish clicks and holds
      for (let i = 0; i < items.length; i++) {
        items[i].classList.replace(
          "pointer-events-auto",
          "pointer-events-none"
        );
      }
    }, 150);
  };

  const stopDragging = (e) => {
    e.preventDefault();
    mouseDown = false;
    slider.classList.add("transition-transform", "ease-linear");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.replace("pointer-events-none", "pointer-events-auto");
    }
    adjust();
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    let scroll = x - startX;
    let matrix = new WebKitCSSMatrix(slider.style.transform);

    if (
      // decrease scroll speed if scroll is out of range of content
      matrix.m41 > 0 ||
      Math.abs(matrix.m41) + slider.clientWidth >=
        Math.abs(items[items.length - 1].offsetLeft + 305)
    ) {
      scroll = Math.ceil(scroll * 0.5);
    }

    slider.style.transform = `translateX(${currentTranslateX + scroll}px)`;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // adjust slider pos when window wisth changes
    if (slider) adjust();
  }, [windowWidth]);

  return (
    <>
      <div className="relative">
        <div
          className="bg-white mt-10"
          onMouseUp={(e) => stopDragging(e)}
          onMouseMove={(e) => move(e)}
          onMouseDown={(e) => startDragging(e)}
        >
          <h1 className="text-2xl relative left-[50%] translate-x-[-50%] w-fit h-fit p-4 select-none">
            {title}
          </h1>
          <div className="h-[400px] w-[96vw] text-black overflow-hidden relative left-[50%] translate-x-[-50%]">
            <div>
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
            <div className="w-[94vw] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-70%] flex justify-between">
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
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
