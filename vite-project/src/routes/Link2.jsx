import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import BestSellingWheel from "./BestSellingWheel";

function Link2() {
  const [currSlide, setCurrSlide] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      changeSlide(-1, currSlide);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [currSlide]);

  const changeSlide = (n, currSlide) => {
    let slides = document.querySelectorAll(".slider div");
    let dots = document.querySelectorAll(".dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
      dots[i].className = "dot";
    }

    if (n == -1) {
      n = (currSlide + 1) % slides.length;
    }

    slides[n].style.opacity = 1;
    dots[n].className = "dot active";
    setCurrSlide(n);
  };

  return (
    <>
      <div className="slider-container relative">
        <div className="slider">
          <div className="bg-[#b4a0a042]">1</div>
          <div className="bg-[#363434]">2</div>
          <div className="bg-slate-500">3</div>
        </div>
        <div className="navigation-button">
          <div className="dot active" onClick={(e) => changeSlide(0)}></div>
          <div className="dot" onClick={(e) => changeSlide(1)}></div>
          <div className="dot" onClick={(e) => changeSlide(2)}></div>
        </div>
      </div>

      <BestSellingWheel />

      <div className="About-container mt-10">
        <div className="bg-[grey] h-[70vh] relative">
          <div className=" h-[200px] w-[800px] sticky top-0 pt-[40px] mb-[40px] left-[200px]">
            <div className="text-[blue] bg-white h-[160px] w-[800px]">
              <h1>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Maxime, exercitationem quia consequuntur eveniet saepe expedita,
                repellendus in dolorum, aperiam nihil sint facere laudantium eos
                provident. Rerum est suscipit libero consectetur.
              </h1>
            </div>
          </div>
        </div>
        <div className="h-[100vh]">20</div>
      </div>
    </>
  );
}

export default Link2;
