import React from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          {/* <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li> */}
          <li className="mx-1">
            <Link to="/me">
              Profile
            </Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <div className="nav-links">
        <Link to="/">
          <h1>
            🌱 Plantasia 🪴
          </h1>
        </Link>

        <nav>
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/">
                Home
              </Link>
            </li>
            <li className="mx-1">
              <Link to="/shop">
                Shop
              </Link>
            </li>
            <li className="mx-1">
              <Link to="/forum">
                Forum
              </Link>
            </li>
            <li className="mx-1">
              <Link to="/plantcare">
                Plant Care
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="nav-items-right">
        {showNavigation()}
      </div>
    </header>
  );
}

export default Nav;
