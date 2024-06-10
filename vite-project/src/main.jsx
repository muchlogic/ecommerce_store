import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Signup from "./routes/User/Signup";
import Login from "./routes/User/Login";
import Home from "./routes/Home";
import Link2 from "./routes/Link2";
import About from "./routes/HomeNav/About";
import Products from "./routes/HomeNav/Products";
import CreateProduct from "./routes/Admin/CreateProduct";
import Cart from "./routes/Checkout/Cart";
import ProductPage from "./routes/HomeNav/ProductPage";
import AllProducts from "./routes/HomeNav/AllProducts";
import Profile from "./routes/User/Profile";
import ChangePassword from "./routes/User/ChangePassword";
import Checkout from "./routes/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/Home",
    element: <Home />,
    children: [
      {
        path: "/Home/",
        element: <Link2 />, // temp
      },
      {
        path: "/Home/Signup",
        element: <Signup />,
      },
      {
        path: "/Home/Login",
        element: <Login />,
      },
      {
        path: "/Home/About",
        element: <About />, // temp
      },
      {
        path: "/Home/Products",
        element: <Products />, // temp
      },
      {
        path: "/Home/Products/:category",
        element: <AllProducts />,
      },
      {
        path: "/Home/Link3",
        element: <About />, // temp
      },
      {
        path: "/Home/ProductPage/:id",
        element: <ProductPage />,
      },
      {
        path: "/Home/Cart",
        element: <Cart />,
      },
      { path: "/Home/Checkout", element: <Checkout /> },
      {
        path: "/Home/Profile",
        element: <Profile />, // temp
      },
      {
        path: "/Home/change-password",
        element: <ChangePassword />,
      },
    ],
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
