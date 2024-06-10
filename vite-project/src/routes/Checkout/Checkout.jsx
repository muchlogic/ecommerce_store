import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

function Checkout({}) {
  // const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

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
            console.log(data);
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
  // get cart subtotal, tax, and total
  useEffect(() => {
    let sum = 0;
    if (cart != null) {
      cart.forEach((item) => (sum += item.amount * item.price));
      setSubTotal(Math.round(sum, 2));
      setTax(Math.round(sum * 1.13, 2));
      setTotal(Math.round(sum, 2) + Math.round(sum * 1.13, 2));
    }
  }, [cart]);

  return (
    <>
      <div className="mx-[12vw] my-[2vh] mb-10">
        <div className="relative flex flex-col lg:flex-row lg:justify-center items-center lg:items-start ">
          <div className="w-[90vw] lg:w-[38vw] flex justify-center lg:mr-[4vw]">
            <div className="w-[80vw] lg:w-[38vw] grid grid-cols-6 gap-y-1 gap-x-3">
              <div className="col-span-6">
                <label className="label block">
                  <h1>Country/Region</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-3">
                <label className="label block">
                  <h1>First Name</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-3">
                <label className="label block">
                  <h1>Last Name</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-6">
                <label className="label block">
                  <h1>Address</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>City</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>Province</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>Postal Code</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  //   onChange={handleConfirmPassword}
                  //   value={confirmPassword}
                  type="text"
                />
              </div>
              <div className="col-span-6">
                <h1 className="mb-2">Payment</h1>
                <div className="grid grid-cols-2 gap-x-3 p-2 bg-[grey] rounded-md">
                  <div>
                    <label className="label block">
                      <h1>Card Number</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      //   onChange={handleConfirmPassword}
                      //   value={confirmPassword}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="label block">
                      <h1>Expiration date (MM/YY)</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      //   onChange={handleConfirmPassword}
                      //   value={confirmPassword}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="label block">
                      <h1>Security code</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      //   onChange={handleConfirmPassword}
                      //   value={confirmPassword}
                      type="text"
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="label block">
                      <h1>Name on card</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      //   onChange={handleConfirmPassword}
                      //   value={confirmPassword}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-0 w-[80vw] lg:w-[38vw] lg:border-l-[0.5px] lg:border-gray-600 mt-5">
            <h1 className="text-xl lg:ml-[2vw] w-fit border-b-[0.5px] border-gray-600">
              Order Summary
            </h1>
            <ul className="relative text-xl lg:ml-[2vw] mt-4">
              {cart.map((item) => {
                return (
                  <li
                    key={item.productID}
                    className="w-full flex justify-between border-b-[0.5px] border-gray-600 pb-4 mb-4"
                  >
                    <div className="flex">
                      <div className="h-[50px] w-[50px] bg-[blue]"></div>
                      <h1 className="my-1 mx-4 h-fit">{item.name}</h1>
                    </div>
                    <div className="flex">
                      <h1 className="my-1 mr-4">{item.amount}</h1>
                      <h1 className="my-1 ml-4">${item.price * item.amount}</h1>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="lg:ml-[2vw] relative h-[20vh]">
              <div className="grid grid-cols-2 text-xl">
                <div>
                  <h1 className="">Subtotal:</h1>
                </div>
                <div>
                  <h1 className="flex justify-end">${subTotal}</h1>
                </div>
                <div>
                  <h1>Tax:</h1>
                </div>
                <div>
                  <h1 className="flex justify-end">${tax}</h1>
                </div>
                <div>
                  <h1>Total:</h1>
                </div>
                <div>
                  <h1 className="flex justify-end">${total}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
