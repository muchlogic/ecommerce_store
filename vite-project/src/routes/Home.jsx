import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../main.css";
import "../Home.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Button, IconButton } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [user, setUser] = useState(null); // user is jwt token
  const [refreshToken, setRefreshToken] = useState(null);
  const [showLinks, setShowLinks] = useState(false);
  const [cart, setCart] = useState([]);
  const showLinksString = showLinks ? "top-[11%]" : "top-[-100%]";
  const location = useLocation();
  // localStorage.setItem("user", null);
  // localStorage.setItem("cart", JSON.stringify([]));

  useEffect(() => {
    let tempUser = null;
    if (location.state != null) {
      // if user logged in then set user object and store user data in local storage
      localStorage.setItem("user", JSON.stringify(location.state.user));
      localStorage.setItem("refresh", JSON.stringify(location.state.refresh));
      setUser(location.state.user);
      setRefreshToken(location.state.refresh);
      tempUser = location.state.user;
      console.log("using login info");
    } else if (
      localStorage.getItem("user") != "undefined" &&
      localStorage.getItem("refresh") != "undefined"
    ) {
      // if user did not login but thier data remains in local storage then set user using that
      setUser(JSON.parse(localStorage.getItem("user")));
      setRefreshToken(JSON.parse(localStorage.getItem("refresh")));
      tempUser = JSON.parse(localStorage.getItem("user"));
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
      let temp = JSON.parse(localStorage.getItem("cart"));
      if (temp) {
        setCart(temp);
      }
    }
    // if user is not logged in and both carts are empty, use base ([])
    // do nothing
  }, [0]);

  // overhead for cart when changed
  useEffect(() => {
    // if cart is non-empty update cart in local storage and db
    // console.log(cart);
    if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));

    if (user) {
      // if the user is logged in update the db cart, or has previously logged in
      console.log("updated db cart");
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

  return (
    <>
      <header className="bg-white border-b-[0.5px] border-slate-500">
        <nav className="flex justify-between items-center w-[92%] h-20 mx-auto">
          <h1 className="text-3xl font-bold underline text-[black] z-20 w-[140px]  flex items-center justify-center">
            LOGO
          </h1>
          <div
            className={`transition-all ease-in-out delay-[1] nav-links ${showLinksString} absolute md:relative bg-white md:top-auto left-0 w-full md:w-auto z-10 border-b-[0.5px] border-slate-500 md:border-none`}
          >
            <ul className="relative flex flex-col md:flex-row items-center md:gap-[4vw] px-5">
              <li className="py-2">
                <Link onClick={show_nav_links} to={``}>
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
          <div className="flex z-20 justify-center w-[140px]">
            <Link to={user ? "/Home/Profile" : "/Login"}>
              <IconButton>
                <AccountBoxIcon fontSize="large" />
              </IconButton>
            </Link>

            <Link to={`/Home/Cart`}>
              <IconButton>
                <ShoppingCartIcon fontSize="large" />
                {cart.length > 0 && (
                  <div className="bg-white border-2 border-rose-500 rounded-full absolute h-5 w-5 top-0 right-0 text-sm ">
                    <h1 className="absolute left-[50%] top-[42%] translate-x-[-50%] translate-y-[-50%]">
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
            ]}
          />
        </main>
        <footer className="bg-[#6e6b6b] text-black h-[400px] flex justify-center">
          <div className="links text-xl w-[88vw] flex justify-between">
            <div>
              <h1>Store Links</h1>
              <ul className="mt-2">
                <li className="mt-1">
                  <a href="">Shop</a>
                </li>
                <li className="mt-1">
                  <a href="">About</a>
                </li>
                <li className="mt-1">
                  <a href="">Refund Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h1>Socials</h1>
              <ul className="flex">
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

            <h1>News Letter</h1>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
