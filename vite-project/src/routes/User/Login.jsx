import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
              navigate("/Home", {
                relative: "path",
                state: { user: data.accessToken, refresh: data.refreshToken },
              });
            }
          } else {
            console.log("invalid login!");
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
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[50vh] items-center">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full">
          Login
        </h1>
        <form className="flex flex-col h-fit w-[30vw] min-w-[350px] mt-5">
          <div>
            {" "}
            <label className="label block mb-2">
              <h1>Email</h1>
            </label>
            <input
              className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleEmail}
              value={email}
              type="text"
            />
          </div>

          <div>
            {" "}
            <label className="label block mb-2">
              <h1>Password</h1>
            </label>
            <input
              className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handlePassword}
              value={password}
              type="password"
            />
          </div>

          <div className="flex w-full justify-between">
            <button
              className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
              type="submit"
            >
              Login
            </button>
            <Link to="/Home/Signup">
              <h1 className="my-2 mx-4 underline">Don't have an account?</h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
