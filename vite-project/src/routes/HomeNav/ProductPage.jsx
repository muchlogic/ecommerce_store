import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [currSlide, setCurrSlide] = useState(0);
  const [cart, setCart] = useOutletContext();
  const params = useParams();
  const images = ["img1", "img2", "img3", "img4"]; // temp imgs until backend ones

  useEffect(() => {
    window.scrollBy(0, -window.innerHeight);
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCartFromChild = () => {
    const exists = cart.some((item) => item.productID === product.productID);
    if (exists) {
      const newCart = cart.map((item) => {
        if (item.productID === product.productID) {
          return { ...product, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
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

  return (
    <>
      <div className="px-[4vw] py-[4vh] relative flex justify-center h-[120vh]">
        {product ? (
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
                  })}{" "}
                </ul>{" "}
              </div>{" "}
              <div className="navigation-button flex justify-center md:hidden w-[30vw]">
                <div
                  className="dot active"
                  onClick={(e) => changeSlide(0)}
                ></div>
                <div className="dot" onClick={(e) => changeSlide(1)}></div>
                <div className="dot" onClick={(e) => changeSlide(2)}></div>
                <div className="dot" onClick={(e) => changeSlide(3)}></div>
              </div>{" "}
              <div className="main-img md:ml-2 bg-[green] h-[50vw] w-[32vw] hidden md:block">
                {images[0]}
              </div>
            </div>

            <div className="w-[76vw] md:w-[46vw]">
              <h1 className="text-2xl m-2">{product.name}</h1>
              <h1 className="text-2xl m-2">${product.price}</h1>
              <p className="m-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                amet mollitia dolore cumque aliquam deleniti molestiae accusamus
                iure qui velit necessitatibus non sed sint, itaque omnis
                voluptatem cupiditate! Neque, nihil?
              </p>
              <button onClick={addToCartFromChild} className="m-2">
                Add To Cart
              </button>
            </div>
          </div>
        ) : (
          <p>Replace with screen loader, ie. faded boxes</p>
        )}
      </div>
    </>
  );
}

export default ProductPage;
