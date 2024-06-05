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
      <div>
        <h1>Change Password</h1>
        <form>
          <label className="label">New Password</label>
          <input
            onChange={handleNewPassword}
            value={newPassword}
            type="password"
          />

          <label className="label">Confirm Password</label>
          <input
            onChange={handleConfirmPassword}
            value={confirmPassword}
            type="password"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
