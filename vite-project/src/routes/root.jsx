import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function root() {
  return (
    <>
      <div className="sign-up-container">
        <nav>
          <ul>
            <li>
              <Link to={`Signup`}>sign up</Link>
            </li>
            <li>
              <Link to={`Login`}>login</Link>
            </li>
            <li>
              <Link to={`Home`}>home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default root;
