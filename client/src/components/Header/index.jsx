import Nav from "../Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="./plantasialogo.png" alt="Plantasia logo" />
        </Link>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default Header;
