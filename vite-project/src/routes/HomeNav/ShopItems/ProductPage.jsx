import { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import Modal from "../../Modal";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [currSlide, setCurrSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useOutletContext();
  const [quantity, setQuantity] = useState(1);
  const [reviewState, setReviewState] = useState(0); // 0 means Reviews is active, 1 means "Leave Review is active"
  const params = useParams();

  const images = ["img1", "img2", "img3", "img4"]; // temp imgs until backend ones

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    // window.scrollBy(0, -window.innerHeight);
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
        setReviews(data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const reviewMode = (n) => {
    if (n == 0) {
      setReviewState(0);
    } else {
      setReviewState(1);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://localhost:3000/products/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: product.productID,
        name: name,
        rating: rating,
        desc: desc,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // open modal with msg saying review was created, also return updated product with review list
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="px-[4vw] py-[4vh] relative flex-col items-center h-auto md:h-[55vw]">
        {product ? (
          <>
            <div className="flex space-x-5 justify-start md:justify-center flex-col items-center md:flex-row md:items-start">
              <div className="h-[550px] relative flex flex-col md:flex-row justify-center md:justify-end items-center md:items-start w-[46vw]">
                <div className="flex justify-evenly w-[80vw] md:w-[8vw] mb-10 md:mb-0">
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
                </div>
                <div className="navigation-button flex justify-center md:hidden w-[30vw]">
                  <div
                    className="dot active"
                    onClick={(e) => changeSlide(0)}
                  ></div>
                  <div className="dot" onClick={(e) => changeSlide(1)}></div>
                  <div className="dot" onClick={(e) => changeSlide(2)}></div>
                  <div className="dot" onClick={(e) => changeSlide(3)}></div>
                </div>
                <div className="main-img relative md:ml-2 bg-[green] h-[50vw] w-[32vw] hidden md:block">
                  {images[0]}
                </div>
              </div>

              <div className="w-[76vw] md:w-[46vw] m-2">
                <div className="flex flex-col gap-y-1 border-b-[0.5px] border-slate-500">
                  <h1 className="flex gap-x-2">
                    <Link
                      to="/home"
                      className="relative overflow-hidden h-[22px] hover:text-slate-500"
                      onMouseOver={() => addHiddenUnderlineText(0)}
                      onMouseLeave={() => removeHiddenUnderlineText(0)}
                    >
                      home
                      <div className="hidden-underline transition-transform delay-100 ease-in translate-x-[-110%] bg-black w-full h-[0.5px] absolute top-5"></div>
                    </Link>
                    /
                    <Link
                      to="/home/shop"
                      className="relative overflow-hidden h-[22px] hover:text-slate-500"
                      onMouseOver={() => addHiddenUnderlineText(1)}
                      onMouseLeave={() => removeHiddenUnderlineText(1)}
                    >
                      shop
                      <div className="hidden-underline transition-transform delay-100 ease-in translate-x-[-110%] bg-black w-full h-[0.5px] absolute top-5"></div>
                    </Link>
                    /
                  </h1>
                  <h1 className="text-3xl font-semibold">{product.name}</h1>
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
              </div>
            </div>
          </>
        ) : (
          <p>Replace with screen loader, ie. faded boxes</p>
        )}
      </div>
      <div className="flex flex-col items-center w-[88vw] mx-auto min-h-[50vh] h-auto border-[0.5px] border-slate-500 mb-10">
        <div className="w-full border-b-[0.5px] border-slate-500 ">
          <button
            className="w-[50%] border-r-[0.5px] border-slate-500"
            onClick={() => reviewMode(0)}
          >
            <h1 className="text-xl py-4">Reviews</h1>
          </button>
          <button className="w-[50%]" onClick={() => reviewMode(1)}>
            <h1 className="text-xl py-4">Leave a review</h1>
          </button>
        </div>
        {reviewState == 0 ? (
          <>
            {reviews.length > 0 ? (
              <div className="w-full px-4 py-2">
                <ul>
                  {reviews.map((review) => {
                    return (
                      <li
                        key={review.name}
                        className="flex flex-row border-b-[0.5px] border-slate-500 pb-2 mb-2"
                      >
                        <div className="flex flex-col w-[20%] text-xl">
                          <h1>{review.name}</h1>
                          <h1>Rating: {review.rating}</h1>
                          <h1>Placeholder Date</h1>
                        </div>
                        <div className="flex flex-col w-auto">
                          <h1 className="text-xl">Placeholder Title</h1>
                          <h1>{review.desc}</h1>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <h1>There are no reviews</h1>
            )}
          </>
        ) : (
          <form className="flex flex-col h-fit w-full min-w-[350px] py-4 px-8">
            <div>
              <label className="label block mb-2">
                <h1 className="">Name</h1>
              </label>
              <input
                className="shadow appearance-none border border-slate-500 rounded w-[20%] min-w-[300px] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleName}
                value={name}
                type="text"
              />
            </div>
            <div>
              <label className="label block mb-2">
                <h1>Rating</h1>
              </label>
              <input
                className="shadow appearance-none border border-slate-500 rounded w-[20%] min-w-[300px] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleRating}
                value={rating}
                type="text"
              />
            </div>
            <div>
              <label for="review" className="label block mb-2">
                <h1>Description</h1>
              </label>
              <textarea
                id="review"
                className="shadow appearance-none border border-slate-500 rounded w-full min-h-[30vh] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleDesc}
                value={desc}
              ></textarea>
            </div>
            <div>
              <button
                className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <Modal message="Item added to cart" />
    </>
  );
}

export default ProductPage;
