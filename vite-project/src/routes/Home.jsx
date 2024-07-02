import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../main.css";
import "../Home.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Button, IconButton } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Slider from "./HomeNav/Slider";

function Home() {
  const [user, setUser] = useState(null); // user is jwt token
  const [refreshToken, setRefreshToken] = useState(null);
  const [update, setUpdate] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const [valid, setValid] = useState(false);
  const [cart, setCart] = useState([]);
  const showLinksString = showLinks ? "top-[11%]" : "top-[-100%]";
  const location = useLocation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    let tempUser = null;
    let tempRefresh = null;
    if (location.state != null) {
      // if user logged in then set user object and store user data in local storage
      sessionStorage.setItem("user", JSON.stringify(location.state.user));
      sessionStorage.setItem("refresh", JSON.stringify(location.state.refresh));
      setUser(location.state.user);
      setRefreshToken(location.state.refresh);
      setValid(true);
      tempUser = location.state.user;
      console.log("using login info");
    } else if (
      sessionStorage.getItem("user") != "undefined" &&
      sessionStorage.getItem("refresh") != "undefined"
    ) {
      // if user did not login but thier data remains in local storage then set user using that,
      // and attempt to refresh the user using the refresh token, if fails then restrict
      // sensitive info until they login again

      tempUser = JSON.parse(sessionStorage.getItem("user"));
      tempRefresh = JSON.parse(sessionStorage.getItem("refresh"));
      let result = true;
      fetch(`https://localhost:3000/signin/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: tempRefresh,
        }),
      })
        .then((response) => {
          let status_code = response.status; // examine status codes
          if (status_code == 403 || status_code == 401) result = false; // if refresh failed the session is not valid
          return response.json();
        })
        .then((data) => {
          if (result) {
            setUser(data.accessToken);
            setRefreshToken(tempRefresh);
            setValid(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("using local info");
    }

    let tempCart = []; // decode jwt and retrieve cart from logged in user
    if (location.state !== null) {
      let decoded = jwtDecode(location.state.user);
      tempCart = decoded.cart;
    }

    // set the cart state and local storage accordingly
    if (tempUser !== null && tempCart.length > 0) {
      // if user is logged in and user cart is non-empty, use db cart
      console.log("using user cart");
      setCart(tempCart);
    } else if (
      (tempUser !== null && tempCart.length === 0) ||
      tempUser === null
    ) {
      // if user is logged in and cart is empty, use local storage cart if exists
      // (for if the user decides to create an account after adding to cart)
      console.log("using local cart");
      let temp = JSON.parse(sessionStorage.getItem("cart"));
      if (temp) {
        setCart(temp);
      }
    }
    // if user is not logged in and both carts are empty, use base ([])
    // do nothing
  }, []);

  // overhead for cart when changed
  useEffect(() => {
    // if cart is non-empty update cart in local storage and db
    // console.log(cart);
    if (cart.length > 0) sessionStorage.setItem("cart", JSON.stringify(cart));

    if (user) {
      // if the user is logged in update the db cart, or has previously logged in
      fetch(`https://localhost:3000/users/update-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          cart: cart,
        }),
      })
        .then((response) => {
          let status_code = response.status; // examine status codes
          return response.json();
        })
        .then((data) => {
          // console.log(data)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cart]);

  const show_nav_links = (e) => {
    if (window.visualViewport.width <= 768) {
      setShowLinks(!showLinks);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <header className="bg-white border-b-[0.5px] border-slate-500">
        <nav className="flex justify-between items-center w-[92%] h-20 mx-auto">
          <Link to="/home">
            <h1 className="text-3xl font-bold underline text-[black] z-20 w-[200px] flex items-center justify-center">
              LOGO
            </h1>
          </Link>
          <div
            className={`transition-all ease-in-out delay-[1] nav-links ${showLinksString} absolute md:relative bg-white md:top-auto left-0 w-full md:w-auto z-10 border-b-[0.5px] border-slate-500 md:border-none`}
          >
            <ul className="relative flex flex-col md:flex-row justify-center items-center md:gap-[4vw] px-5">
              <li className="py-2">
                <Link onClick={show_nav_links} to="/home">
                  <h1 className="text-black text-2xl hover:text-[#aca4a4] ">
                    Home
                  </h1>
                </Link>
              </li>
              <li className="py-2">
                <Link onClick={show_nav_links} to={`/home/about`}>
                  <h1 className="text-black text-2xl hover:text-[#aca4a4] ">
                    About
                  </h1>
                </Link>
              </li>
              <li className="py-2">
                <Link onClick={show_nav_links} to={`/home/shop`}>
                  <h1 className="text-black text-2xl hover:text-[#aca4a4]">
                    Shop
                  </h1>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex z-20 justify-center w-[200px]">
            <Link to={user && valid ? "/Home/Profile" : "/Login"}>
              <IconButton>
                <AccountBoxIcon fontSize="large" />
              </IconButton>
            </Link>

            <Link to={`/Home/Cart`}>
              <IconButton>
                <ShoppingCartIcon fontSize="large" className="cart-icon" />
                {cart.length > 0 && (
                  <div className="bg-black text-white font-bold rounded-full absolute h-5 w-5 top-0 right-0 text-sm ">
                    <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                      {cart.length}
                    </h1>
                  </div>
                )}
              </IconButton>
            </Link>
            <div className="md:hidden">
              <IconButton onClick={show_nav_links}>
                <DehazeIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </nav>
      </header>
      <div className="relative flex flex-col min-h-[100vh] h-body">
        <main className="relative">
          <Outlet
            context={[
              cart,
              setCart,
              user,
              setUser,
              refreshToken,
              setRefreshToken,
              setUpdate,
            ]}
          />
        </main>
        <Slider />
        <footer className="bg-[#6e6b6b] text-black py-6 h-[400px] flex justify-center">
          <div className="links text-xl w-[88vw] flex justify-around flex-wrap gap-y-4">
            <div className="px-4">
              <h1 className="text-2xl">Store Links</h1>
              <ul className="flex flex-col gap-2">
                <li className="">
                  <a href="">Shop</a>
                </li>
                <li className="">
                  <a href="">About</a>
                </li>
                <li className="">
                  <a href="">Refund Policy</a>
                </li>
              </ul>
            </div>
            <div className="px-4">
              <h1 className="text-2xl">Socials</h1>
              <ul className="flex flex-col lg:flex-row gap-2">
                <li className="mr-2">
                  <a href="">Twitter</a>
                </li>
                <li className="mr-2">
                  <a href="">Instagram</a>
                </li>
                <li className="">
                  <a href="">Facebook</a>
                </li>
              </ul>
            </div>
            <div className="px-4 pb-4">
              <form className="flex flex-col h-fit w-[30vw] min-w-[350px]">
                <label htmlFor="news_input">
                  <h1 className="text-2xl">Newsletter</h1>
                </label>
                <div>
                  <input
                    id="news_input"
                    className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleEmail}
                    value={email}
                    type="text"
                  />
                  <button
                    className="btn bg-white hover:bg-slate-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    // onClick={handleSubmit}
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
