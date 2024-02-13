import Nav from "../Nav";
import { Link } from "react-router-dom";
import logo from '../../assets/plantasialogo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Plantasia logo" />
        </Link>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default Header;
