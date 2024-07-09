import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Signup from "./routes/User/Signup";
import Login from "./routes/User/Login";
import Home from "./routes/Home";
import Link2 from "./routes/HomeNav/Link2";
import About from "./routes/HomeNav/About";
import Products from "./routes/HomeNav/Products";
import CreateProduct from "./routes/Admin/CreateProduct";
import Cart from "./routes/Checkout/Cart";
import ProductPage from "./routes/HomeNav/ShopItems/ProductPage";
import AllProducts from "./routes/HomeNav/ShopItems/AllProducts";
import Profile from "./routes/User/Profile";
import ChangePassword from "./routes/User/ChangePassword";
import Checkout from "./routes/Checkout/Checkout";
import VeiwOrder from "./routes/User/VeiwOrder";
import ThankYou from "./routes/Checkout/ThankYou";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Link2 />, // temp
      },
      {
        path: "/about",
        element: <About />, // temp
      },
      {
        path: "/shop",
        element: <Products />, // temp
      },
      {
        path: "/shop/:category",
        element: <AllProducts />,
      },
      {
        path: "/product-page/:id",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/profile",
        element: <Profile />, // temp
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/veiw-order",
        element: <VeiwOrder />,
      },
      {
        path: "/thank-you",
        element: <ThankYou />,
      },
    ],
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/AddProduct",
    element: <CreateProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
