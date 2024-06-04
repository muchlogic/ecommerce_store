import { light } from "@mui/material/styles/createPalette";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Cart({}) {
  // const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useOutletContext();

  useEffect(() => {
    // make fetch to using all ids to get names, imgs, etc to display
    // setCart(JSON.parse(localStorage.getItem("cart")));

    let sum = 0;
    if (cart != null) {
      cart.forEach((item) => (sum += item.amount * item.price));
    }

    setTotal(sum);
  }, [cart]);

  const removeFromCart = (product) => {
    const newCart = cart
      .map((item) => {
        if (item.productID === product.productID) {
          if (item.amount == 1) {
            console.log("marked");
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
    localStorage.setItem("cart", JSON.stringify(newCart)); // update local storage cart
  };

  return (
    <>
      <div className="min-h-[400px] mx-[6vw] my-[2vh] w-[88vw]">
        <h1 className="text-2xl">Shopping Cart</h1>
        {cart != null ? (
          <>
            <ul className="relative text-xl">
              {cart.map((item) => {
                return (
                  <li
                    key={item.productID}
                    className="w-[100%] flex flex-col sm:flex-row justify-between my-4 relative border-b-[0.5px] border-gray-600 pb-4"
                  >
                    <div className="flex min-w-[350px] ">
                      <div className="min-w-[200px] w-[200px] min-h-[200px] bg-[green] md:bg-[blue]"></div>
                      <h1 className="my-1 mx-4">{item.name}</h1>
                    </div>
                    <div className="flex justify-between sm:justify-around self-end sm:self-auto max-w-[46vw] w-[400px] sm:mr-[5vw] absolute bottom-4 sm:bottom-auto sm:relative">
                      <h1 className="my-1 mx-4">{item.amount}</h1>
                      <h1 className="my-1 mx-4">${item.price * item.amount}</h1>
                    </div>
                    <div className="absolute right-0 top-1 mx-[1vw]">
                      <button
                        className="bg-[red]"
                        onClick={() => removeFromCart(item)}
                      >
                        Rrem
                      </button>
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
          </>
        ) : (
          <p>carts empty boi</p>
        )}
      </div>
    </>
  );
}

export default Cart;
