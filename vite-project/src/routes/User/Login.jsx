import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    // use error validation and finally make call to data base and stores {email, password}
    e.preventDefault();
    let valid = email !== "" && password !== "" ? true : false;

    if (valid) {
      // get user info from server if user credentials are valid
      fetch(`https://localhost:3000/signin/${email}/${password}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let status_code = response.status;
          return response.json().then((data) => ({ status_code, data }));
        })
        .then(({ status_code, data }) => {
          // check status codes ie. wrong password, or invalid email
          // check status code, and make changes to client to inform (use modal?)
          if (status_code == 200) {
            // send user to login page after sigining up
            if (data) {
              console.log("successfully logged in ");
              navigate("../home", {
                relative: "path",
                state: { user: data },
              });
            }
          } else {
            console.log("invalid login");
          }
          // return data.json();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // update page ("please fill out email and password")
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form>
          <label className="label">Email</label>
          <input onChange={handleEmail} value={email} type="text" />

          <label className="label">Password</label>
          <input onChange={handlePassword} value={password} type="password" />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
