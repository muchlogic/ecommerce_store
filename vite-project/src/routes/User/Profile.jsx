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
      console.log("using login info");
    } else if (localStorage.getItem("user") != null) {
      // if user did not login but thier data remains in local storage then set user using that
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log("using local info");
    }
  }, [0]);

  return (
    <>
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[100vh]">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500">
          My Account
        </h1>
        <h1 className="mt-5 text-2xl">Hello User</h1>
        <div className="flex justify-center w-[92vw] mt-5">
          <div className="text-xl w-[46vw]">
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
          <div className="flex flex-col text-xl w-[46vw]">
            <h1 className="w-fit border-b-[0.5px] border-slate-500">
              Account Details
            </h1>
            <div className="flex-col mt-5">
              <Link to="/">
                <h1>Sign out</h1>
              </Link>
              <Link to="/">
                <h1>Saved Address</h1>
              </Link>
              <Link to="/">
                <h1>Change Email</h1>
              </Link>
              <Link to="/">
                <h1>Change Password</h1>
              </Link>
              <Link to="/">
                <h1>Logout</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
