import "../Navbar/Navbar.scss";
import { Link } from "react-router-dom";
import Switch from "@mui/joy/Switch";

const Navbar = ({ mode, toggleMode }) => {
  return (
    <div className={`navbar ${mode === false ? "light-mode" : "dark-mode"}`}>
      <Link
        className={`${mode === false ? "nav-link-light" : "nav-link-dark"}`}
        to={"/"}
      >
        Home
      </Link>
      <Link
        className={`${mode === false ? "nav-link-light" : "nav-link-dark"}`}
        to={"/search_coins"}
      >
        Search Coins
      </Link>
      <Switch
        className="toggle"
        size="lg"
        variant="outlined"
        onClick={toggleMode}
      />
    </div>
  );
};

export default Navbar;
