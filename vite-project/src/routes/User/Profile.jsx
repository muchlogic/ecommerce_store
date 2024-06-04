import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  Link,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const [cart, setCart, user, setUser] = useOutletContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      // if user logged in then set user object and store user data in local storage
      localStorage.setItem("user", JSON.stringify(location.state.user));
      setUser(location.state.user);
    } else if (localStorage.getItem("user") != null) {
      // if user did not login but thier data remains in local storage then set user using that
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [0]);

  const logOut = () => {
    // logout sequence removes all user data from browser and redirects them to login page
    localStorage.setItem("user", null);
    localStorage.setItem("cart", JSON.stringify([]));
    console.log("logged out");
  };

  return (
    <>
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[100vh]">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500">
          My Account
        </h1>
        <h1 className="mt-5 text-2xl">Hello User</h1>
        <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 w-[92vw] mt-5">
          <div className="text-xl w-[46vw] ">
            <h1 className="w-fit border-b-[0.5px] border-slate-500">
              Order History
            </h1>
            <div className="mt-5">
              {orderHistory.length > 0 ? (
                <ul>
                  {orderHistory.map((order) => {
                    return <li>order details link</li>;
                  })}
                </ul>
              ) : (
                <h1>No history</h1>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between text-xl w-[46vw]">
            <h1 className="w-fit border-b-[0.5px] border-slate-500">
              Account Details
            </h1>
            <div className="flex flex-col mt-5 space-y-10">
              <Link to="/">
                <div className="border-b-[0.5px] border-slate-500 w-fit">
                  <h1>Saved Address</h1>
                  <h1>{jwtDecode(user).address}</h1>
                </div>
              </Link>
              <div>
                {" "}
                <div className="border-b-[0.5px] border-slate-500 w-fit">
                  <Link to="/">
                    <h1>Change Email</h1>
                  </Link>
                  <Link to="/">
                    <h1>Change Password</h1>
                  </Link>
                </div>
              </div>{" "}
              <Link to="/" onClick={() => logOut()}>
                <h1 className="border-b-[0.5px] border-slate-500 w-fit">
                  Logout
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
