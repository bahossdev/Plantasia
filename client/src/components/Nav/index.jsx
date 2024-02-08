import React from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
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
      <h1>
        <Link to="/">
          🌱 Plantasia 🪴
        </Link>
      </h1>

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

      {showNavigation()}
    </header>
  );
}

export default Nav;
