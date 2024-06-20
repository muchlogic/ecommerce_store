import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  let navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    // use error validation and finally make call to data base and stores {email, password}
    e.preventDefault();
    let valid = true;

    // test errors for email and passwords

    if (valid) {
      // go back to root, and goto login after valid is passed

      // post to server and add new user to db
      fetch(`https://localhost:3000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          address: address,
        }),
      })
        .then((response) => {
          let status_code = response.status;
          // check status code, and make changes to client to inform (use modal?)
          if (status_code == 200) {
            // send user to login page after sigining up
            navigate("/Home/Login");
          } else if (status_code === 409) {
            // the email they used to sign up is already in use
            console.log("email in use");
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // update page to notify user of errors in input
    }
  };

  return (
    <>
      <header className="bg-white border-b-[0.5px] border-slate-500">
        <nav className="flex justify-between items-center w-[92%] h-20 mx-auto">
          <h1 className="text-3xl font-bold underline text-[black] z-20 w-[140px] flex items-center justify-center">
            LOGO
          </h1>
        </nav>
      </header>
      <div className="flex flex-col mx-[4vw] mt-[4vh] h-[50vh] items-center">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full">
          Sign Up
        </h1>
        <form className="flex flex-col h-fit w-[30vw] min-w-[350px] mt-5">
          <div>
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

          <div>
            <label className="label block mb-2">
              <h1>Address</h1>
            </label>
            <input
              className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleAddress}
              value={address}
              type="text"
            />
          </div>

          <div className="flex w-full justify-between">
            <button
              className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/Login">
              <h1 className="my-2 mx-4 underline">Have an account?</h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
