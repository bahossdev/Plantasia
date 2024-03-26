import React from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
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
    <header className="flex-row px-1 nav-links">
        <nav>
          <div className="nav-items-left">
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-1">
                <Link to="/plantcare">Plant Care</Link>
              </li>
              <li className="mx-1">
                <Link to="/guide">Guide</Link>
              </li>
              <li className="mx-1">
                <Link to="/forum">Forum</Link>
              </li>
              <li className="mx-1">
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </div>
          <div className="nav-items-right">{showNavigation()}</div>
        </nav>
    </header>
  );

}

export default Nav;
