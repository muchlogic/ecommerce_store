import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

function Checkout({}) {
  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // user info
  const [countryOrRegion, setCountryOrRegion] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // payment details
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleCountryOrRegion = (e) => {
    setCountryOrRegion(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleProvince = (e) => {
    setProvince(e.target.value);
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSecurityCode = (e) => {
    setSecurityCode(e.target.value);
  };

  const handleNameOnCard = (e) => {
    setNameOnCard(e.target.value);
  };

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
  // get cart subtotal, tax, and total
  useEffect(() => {
    let sum = 0;
    if (cart != null) {
      cart.forEach((item) => (sum += item.amount * item.price));
      setSubTotal(Math.round(sum, 2));
      setTax(Math.round(sum * 0.13, 2));
      setTotal(Math.round(sum, 2) + Math.round(sum * 0.13, 2));
    }
  }, [0]);

  // orders can be placed by users and guests, check for which and place order into user record or guests orders collection
  const placeOrder = () => {
    let valid = false;
    console.log(user, refreshToken);
    if (user && refreshToken) {
      console.log("trying to place order");
      // if both exists then user is logged in
      fetch(`https://localhost:3000/signin/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      })
        .then((response) => {
          let status_code = response.status; // examine status codes
          if (status_code == 200) valid = true;
          return response.json();
        })
        .then((data) => {
          if (valid) {
            fetch(`https://localhost:3000/users/place-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.accessToken}`,
              },
              body: JSON.stringify({
                cart: cart,
                total: total,
                countryOrRegion: countryOrRegion,
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                cardNumber: cardNumber,
                expirationDate: expirationDate,
                securityCode: securityCode,
                nameOnCard: nameOnCard,
              }),
            })
              .then((response) => {
                let status_code = response.status; // examine status code
                if (status_code == 200) {
                  console.log("Order has been placed");
                  navigate("/thank-you");
                } else {
                  console.log("Order has not been placed due to error");
                }
              })
              .catch((error) => {
                console.error(error);
              });
            setUser(data.accessToken);
            sessionStorage.setItem("cart", JSON.stringify([]));
          } else {
            // user is a guest, so place their order into the general pool
            console.log("user is a guest");
          }
        });
    } else {
      console.log("broken");
    }
  };

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
                  value={countryOrRegion}
                  onChange={handleCountryOrRegion}
                  type="text"
                />
              </div>
              <div className="col-span-3">
                <label className="label block">
                  <h1>First Name</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={firstName}
                  onChange={handleFirstName}
                  type="text"
                />
              </div>
              <div className="col-span-3">
                <label className="label block">
                  <h1>Last Name</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={lastName}
                  onChange={handleLastName}
                  type="text"
                />
              </div>
              <div className="col-span-6">
                <label className="label block">
                  <h1>Address</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={address}
                  onChange={handleAddress}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>City</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={city}
                  onChange={handleCity}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>Province</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={province}
                  onChange={handleProvince}
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <label className="label block">
                  <h1>Postal Code</h1>
                </label>
                <input
                  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={postalCode}
                  onChange={handlePostalCode}
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
                      value={cardNumber}
                      onChange={handleCardNumber}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="label block">
                      <h1>Expiration date (MM/YY)</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      value={expirationDate}
                      onChange={handleExpirationDate}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="label block">
                      <h1>Security code</h1>
                    </label>
                    <input
                      className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      value={securityCode}
                      onChange={handleSecurityCode}
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
                      value={nameOnCard}
                      onChange={handleNameOnCard}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-6 flex justify-center items-center mt-5">
                <Link to="" onClick={placeOrder}>
                  <h1 className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Place Order
                  </h1>
                </Link>
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
