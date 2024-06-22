import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts2";
// import FeaturedProducts from "./FeaturedProducts";

function Link2() {
  const [currSlide, setCurrSlide] = useState(0);
  const [currWord, setCurrWord] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      changeSlide(-1, currSlide);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [currSlide]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      changeWord(currWord);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [currWord]);

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

  const changeWord = (currWord) => {
    let words = document.getElementsByClassName("word");
    words[currWord].classList.replace("block", "hidden");
    let next = (currWord + 1) % words.length;
    words[next].classList.replace("hidden", "block");
    setCurrWord(next);
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

      <FeaturedProducts />

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
        <div className="relative bg-[black] font-bold text-white ">
          <div className="h-[100vh] relative flex flex-col gap-4 justify-center items-end md:items-start m-[4vw] text-3xl md:text-6xl ">
            <div className="">
              <h1>Listen to the song</h1>
            </div>
            <div className="relative overflow-hidden flex flex-col items-end h-[70px] md:h-[140px] text-6xl md:text-9xl">
              <h1 className="word block w-fit animate-slide_in_out">dog</h1>
              <h1 className="word hidden w-fit animate-slide_in_out">cat</h1>
              <h1 className="word hidden w-fit animate-slide_in_out">ogre</h1>
              <h1 className="word hidden w-fit animate-slide_in_out">horse</h1>
            </div>
            <div className="">
              <h1>of balls</h1>
            </div>
            <div className=" bg-white text-black w-fit h-fit transition-colors delay-50 ease-in-out hover:bg-slate-700 focus:outline-none focus:shadow-outline">
              <Link to="/home/shop">
                <h1 className="py-2 px-4">Shop</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Link2;
