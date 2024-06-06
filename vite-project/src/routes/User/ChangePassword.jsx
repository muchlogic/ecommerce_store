import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

  let navigate = useNavigate();

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // perform password security checks
    let result = false;
    if (user && confirmPassword === newPassword) {
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
          if (status_code == 200) result = true;
          return response.json();
        })
        .then((data) => {
          // if token was successfully refreshed allow them to change password
          if (result) {
            setUser(data.accessToken);
            console.log("token refreshed");
            // if previous fetch was OK (200) then change password
            fetch(`https://localhost:3000/users/update-password`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user}`,
              },
              body: JSON.stringify({
                password: confirmPassword,
              }),
            })
              .then((response) => {
                let status_code = response.status; // examine status codes
                if (status_code == 200) result = true;
                return response.json();
              })
              .then((data2) => {
                console.log(data2);
                navigate("/Home/Profile");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      if (!result) {
        // send them to login again to re-auth before being allowed to preform sensitive operation
        navigate("/Login");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[50vh] items-center">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full">
          Change Password
        </h1>
        <form className="flex flex-col h-fit w-[30vw] min-w-[350px] mt-5">
          <div>
            {" "}
            <label className="label block mb-2">
              <h1>New Password</h1>
            </label>
            <input
              className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleNewPassword}
              value={newPassword}
              type="password"
            />
          </div>

          <div>
            {" "}
            <label className="label block mb-2">
              <h1>Confirm Password</h1>
            </label>
            <input
              className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              type="password"
            />
          </div>

          <div>
            <button
              className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
