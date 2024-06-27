import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../Modal";
import Close from "@mui/icons-material/Close";

function Cart({}) {
  // const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(
    () => {
      // fetch users cart from db to display
      if (user) {
        fetch(`https://localhost:3000/users/get-cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        })
          .then((response) => {
            let status_code = response.status; // examine status code
            return response.json();
          })
          .then((data) => {
            setCart(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [user],
    []
  );
  // get cart subtotal
  useEffect(() => {
    let sum = 0;
    if (cart != null) {
      cart.forEach((item) => {
        sum += item.amount * item.price;
      });
      setTotal(Math.round(sum, 2));
    }
  }, [cart]);

  const addToCart = (product) => {
    const newCart = cart.map((item) => {
      if (item.productID === product.productID) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart)); // update local storage cart
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

  const removeFromCart = (product, all) => {
    const newCart = cart
      .map((item) => {
        if (item.productID === product.productID) {
          if (item.amount == 1 || all) {
            return null; // mark for removal from cart if count is 1
          } else {
            return { ...item, amount: item.amount - 1 };
          }
        } else {
          return item;
        }
      })
      .filter((item) => item !== null); // filter null
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart)); // update local storage cart
    setMessage("Item removed from cart");
    const modal = document.getElementsByClassName("Modal")[0];
    modal.classList.replace("invisible", "visible");
    modal.classList.replace("opacity-0", "opacity-100");
    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      modal.classList.replace("opacity-100", "opacity-0");
      modal.classList.replace("visible", "invisible");
    }, 3000);
  };

  return (
    <>
      <div className="min-h-[400px] mx-[4vw] my-[2vh]">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full">
          Shopping Cart
        </h1>
        {cart.length > 0 ? (
          <>
            <ul className="relative text-xl">
              {cart.map((item) => {
                return (
                  <li
                    key={item.productID}
                    className="w-[100%] flex flex-col md:flex-row justify-between my-4 relative border-b-[0.5px] border-gray-600 pb-4"
                  >
                    <div className="flex min-w-[350px] ">
                      <Link to={`../ProductPage/${item.productID}`}>
                        <div className="min-w-[200px] w-[200px] min-h-[200px] bg-[green] md:bg-[blue]"></div>
                      </Link>
                      <Link
                        className="h-fit"
                        to={`../ProductPage/${item.productID}`}
                      >
                        <h1 className="my-1 mx-4 h-fit">{item.name}</h1>
                      </Link>
                    </div>
                    <div className="flex justify-between md:justify-around self-end md:self-auto max-w-[46vw] w-[600px] md:mr-[10vw] absolute bottom-4 md:bottom-auto md:relative">
                      <h1 className="my-1 mx-4">{item.amount}</h1>
                      <h1 className="my-1 mx-4">
                        ${Math.round(item.price * item.amount, 2)}
                      </h1>
                    </div>
                    <div className="flex absolute justify-between right-0 top-0 w-[120px]">
                      <IconButton onClick={() => removeFromCart(item, false)}>
                        <RemoveRoundedIcon fontSize="md" />
                      </IconButton>
                      <IconButton onClick={() => addToCart(item)}>
                        <AddRoundedIcon fontSize="md" />
                      </IconButton>
                      <IconButton onClick={() => removeFromCart(item, true)}>
                        <Close fontSize="md" />
                      </IconButton>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="relative w-[100%] h-[5vh]">
              <h1 className="absolute right-0 mx-4 text-2xl">
                Subtotal: ${total}
              </h1>
            </div>
            <div className="relative text-2xl w-[100%] h-[6vh]">
              <div className="w-fit absolute right-0 mx-4">
                <Link to="/Home/Checkout">
                  <h1 className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Checkout
                  </h1>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-xl mt-5">Your cart is empty</h1>
        )}
      </div>
      <Modal message={message} />
    </>
  );
}

export default Cart;
