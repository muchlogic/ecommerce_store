import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            navigate("../Login", { relative: "path" });
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
      <div>
        <h1>Sign Up</h1>
        <form>
          <label className="label">Email</label>
          <input onChange={handleEmail} value={email} type="text" />

          <label className="label">Password</label>
          <input onChange={handlePassword} value={password} type="password" />

          <label className="label">Address</label>
          <input onChange={handleAddress} value={address} type="text" />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
