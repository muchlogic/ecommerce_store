import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  Link,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const [cart, setCart, user, setUser, refreshToken] = useOutletContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const location = useLocation();

  // get orders
  useEffect(() => {
    fetch("https://localhost:3000/users/get-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => {
        let status_code = response.status; // examine status codes
        return response.json();
      })
      .then((data) => {
        setOrderHistory(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [0]);

  const logOut = () => {
    // logout sequence removes all user data from browser and redirects them to login page
    localStorage.setItem("user", null);
    localStorage.setItem("refresh", null);
    localStorage.setItem("cart", JSON.stringify([]));
    fetch(`https://localhost:3000/signin/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
      .then((response) => {
        let status_code = response.status; // examine status codes
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[100vh]">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500">
          My Account
        </h1>
        <h1 className="mt-5 text-2xl">Hello User</h1>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-10 md:space-y-0 w-[92vw] mt-5">
          <div className="text-xl w-[92vw] md:w-[46vw]">
            <h1 className="w-fit border-b-[0.5px] border-slate-500">
              Order History
            </h1>
            <div className="mt-5">
              {orderHistory.length > 0 ? (
                <div className="grid grid-cols-4">
                  <h1>Order date</h1>
                  <h1>Status</h1>
                  <h1>Total</h1>
                  <h1></h1>
                  {orderHistory.map((order, index) => {
                    return (
                      <>
                        <h1 className="">{order.date.substr(0, 10)}</h1>
                        <h1>Order received</h1>
                        <h1>${order.total}</h1>
                        <Link to="/Home/veiw-order" state={{ order: order }}>
                          <h1 className="text-[blue] hover:text-[#685d5d]">
                            Veiw details
                          </h1>
                        </Link>
                      </>
                    );
                  })}
                </div>
              ) : (
                <h1>No history</h1>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between text-xl w-[92vw] md:w-[46vw] md:border-l-[1px] md:border-slate-500 md:pl-5">
            <h1 className="w-fit border-b-[0.5px] border-slate-500">
              Account Details
            </h1>
            <div className="flex flex-col mt-5 space-y-10">
              <Link to="/">
                <div className="border-b-[0.5px] border-slate-500 w-fit">
                  <h1>Saved Address</h1>
                  <h1 className="text-[blue] hover:text-[#685d5d]">
                    temp address
                  </h1>
                </div>
              </Link>
              <div>
                {" "}
                <div className="border-b-[0.5px] border-slate-500 w-fit">
                  <Link to="/">
                    <h1>Change Email</h1>
                  </Link>
                  <Link to="/Home/change-password">
                    <h1 className="text-[blue] hover:text-[#685d5d]">
                      Change Password
                    </h1>
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
