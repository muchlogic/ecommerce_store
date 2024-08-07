import { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import FeaturedProducts from "../../FeaturedProducts";
import Rating from "@mui/material/Rating";
import ReviewSection from "./ReviewSection";
import Modal from "../../../../components/Modal";
import RevealButton from "../../../../components/RevealButton";
import TestingTab from "./TestingTab";
import NavButton from "../../../Checkout/NavButton";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [currSlide, setCurrSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState();
  const [message, setMessage] = useState(null);
  const params = useParams();

  const images = ["img1", "img2", "img3", "img4"]; // temp imgs until backend ones
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

  const fetchProduct = () => {
    fetch(`https://localhost:3000/products/product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setRating(Math.round(data.totalRating / data.reviews.length, 1));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [0]);

  const cartWiggle = (e) => {
    const cartIcon = document.getElementsByClassName("cart-icon")[0];
    cartIcon.classList.add("animate-wiggle");

    setTimeout(() => {
      cartIcon.classList.remove("animate-wiggle");
    }, 1000);
  };

  const changeQuantity = (sign) => {
    // change quanity before adding item to cart
    if (sign == "+") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  };

  const addToCartFromChild = () => {
    const exists = cart.some((item) => item.productID === product.productID);
    if (exists) {
      const newCart = cart.map((item) => {
        if (item.productID === product.productID) {
          return { ...product, amount: item.amount + quantity };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, amount: quantity }]);
    }

    cartWiggle();
    setMessage("Item added to cart");

    const modal = document.getElementsByClassName("Modal")[0];
    modal.classList.replace("invisible", "visible");
    modal.classList.replace("opacity-0", "opacity-100");
    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      modal.classList.replace("opacity-100", "opacity-0");
      modal.classList.replace("visible", "invisible");
    }, 3000);
  };

  const changeImg = (image) => {
    const mainImg = document.getElementsByClassName("main-img")[0];
    mainImg.textContent = image;
  };

  // control drag and slide of img gallery in small mode
  let mouseDown = false;
  let startX, scrollLeft;
  const slider = document.querySelector(".parent");

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const stopDragging = (e) => {
    mouseDown = false;
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    if (scroll < 0) {
      changeSlide(currSlide + 1);
    } else if (scroll > 0) {
      changeSlide(currSlide - 1);
    }
  };

  const changeSlide = (n) => {
    let slider = document.querySelectorAll(".parent")[0];
    let dots = document.querySelectorAll(".dot");

    if (n >= 0 && n <= 3) {
      let scrollMove =
        (n - currSlide) * Math.floor(window.visualViewport.width * 0.6);
      slider.scrollLeft += scrollMove;

      for (let i = 0; i < 4; i++) {
        dots[i].className = "dot";
      }
      dots[n].className = "dot active";
      setCurrSlide(n);
    }
  };

  const addHiddenUnderlineText = (n) => {
    const underline = document.getElementsByClassName("hidden-underline")[n];
    underline.classList.replace("translate-x-[-110%]", "translate-x-0");
  };

  const removeHiddenUnderlineText = (n) => {
    const underline = document.getElementsByClassName("hidden-underline")[n];
    underline.classList.replace("translate-x-0", "translate-x-[-110%]");
  };
  return (
    <>
      <div className="px-[4vw] py-[4vh] relative flex-col items-center">
        {product ? (
          <>
            <div className="relative flex space-x-5 justify-start md:justify-center flex-col items-center md:flex-row md:items-start h-auto">
              <div className="pictures md:sticky md:top-5 md:mb-5 flex flex-col md:flex-row justify-center md:justify-end items-center md:items-start w-[46vw]">
                <div className="relative flex justify-evenly w-[80vw] mb-4 md:w-[8vw] md:mb-0">
                  <ul
                    onMouseMove={(e) => move(e)}
                    onMouseDown={(e) => startDragging(e)}
                    onMouseUp={(e) => stopDragging(e)}
                    onMouseLeave={(e) => stopDragging(e)}
                    className="parent snap-x snap-mandatory scroll-smooth flex flex-row md:flex-col w-[60vw] md:w-auto overflow-scroll overflow-y-hidden overflow-x-hidden md:overflow-visible "
                  >
                    {images.map((image) => {
                      return (
                        <li key={image} className="md:mb-2">
                          <div
                            className={`h-[500px] w-[60vw] md:h-[10vw] md:w-[8vw] bg-[blue] cursor-pointer snap-start snap-always`}
                            onClick={() => changeImg(image)}
                          >
                            <h1 className="select-none">{image}</h1>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="navigation-button absolute bottom-0 flex justify-center md:hidden w-[30vw] mb-2">
                    <div
                      className="dot active"
                      onClick={(e) => changeSlide(0)}
                    ></div>
                    <div className="dot" onClick={(e) => changeSlide(1)}></div>
                    <div className="dot" onClick={(e) => changeSlide(2)}></div>
                    <div className="dot" onClick={(e) => changeSlide(3)}></div>
                  </div>
                </div>
                <div className="main-img relative md:ml-2 bg-[green] h-[45vw] w-[32vw] hidden md:block">
                  {images[0]}
                </div>
              </div>

              <div className="w-[76vw] md:w-[46vw] m-2">
                <div className="flex flex-col gap-y-1 border-b-[0.5px] border-slate-500">
                  <h1 className="flex gap-x-2">
                    <NavButton name={"home"} link={"/"} />/
                    <NavButton name={"shop"} link={"/shop"} />/
                  </h1>
                  <h1 className="text-3xl font-semibold">{product.name}</h1>
                  <div>
                    <Rating
                      name="half-rating-read"
                      value={rating}
                      precision={0.1}
                      readOnly
                    />
                  </div>

                  <h1 className="text-2xl mb-2">${product.price}</h1>
                </div>
                <div className="border-[0.5px] border-slate-500 w-fit mt-6">
                  <div className="flex justify-around w-[120px] py-2">
                    <button
                      onClick={() => changeQuantity("-")}
                      className="hover:text-slate-500"
                    >
                      <h1 className="text-3xl">-</h1>
                    </button>
                    <h1 className="text-xl">{quantity}</h1>
                    <button
                      onClick={() => changeQuantity("+")}
                      className="hover:text-slate-500"
                    >
                      <h1 className="text-3xl">+</h1>
                    </button>
                  </div>
                </div>
                <button
                  onClick={addToCartFromChild}
                  className="border-[0.5px] w-full py-4 border-slate-500 mt-6 mb-5 focus:outline-none focus:shadow-outline hover:text-slate-700"
                >
                  <h1 className="text-xl">Add to cart</h1>
                </button>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
                <p className="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  amet mollitia dolore cumque aliquam deleniti molestiae
                  accusamus iure qui velit necessitatibus non sed sint, itaque
                  omnis voluptatem cupiditate! Neque, nihil?
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Replace with screen loader, ie. faded boxes</p>
        )}
      </div>
      <div className="mx-10 mb-10 flex flex-col gap-y-4">
        <ReviewSection
          product={product}
          fetchProduct={fetchProduct}
          setMessage={setMessage}
        />
        <TestingTab />
        <FeaturedProducts
          category={"tool"}
          title={"Products you may also like"}
        />
      </div>

      <Modal message={message} />
    </>
  );
}

export default ProductPage;
