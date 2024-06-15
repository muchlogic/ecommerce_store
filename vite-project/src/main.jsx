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
    element: <Root />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/",
        element: <Link2 />, // temp
      },
      {
        path: "/home/about",
        element: <About />, // temp
      },
      {
        path: "/home/shop",
        element: <Products />, // temp
      },
      {
        path: "/home/shop/:category",
        element: <AllProducts />,
      },
      {
        path: "/home/Link3",
        element: <About />, // temp
      },
      {
        path: "/home/product-page/:id",
        element: <ProductPage />,
      },
      {
        path: "/home/cart",
        element: <Cart />,
      },
      { path: "/home/checkout", element: <Checkout /> },
      {
        path: "/home/profile",
        element: <Profile />, // temp
      },
      {
        path: "/home/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/home/veiw-order",
        element: <VeiwOrder />,
      },
      {
        path: "/home/thank-you",
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
