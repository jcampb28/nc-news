import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";
import logo from "../assets/logo.png"

function Header() {
  return (
      <div className="app-header">
      <Link to={"/"} aria-label="link-to-homepage" className="app-name">
        <img className="logo" src={logo} alt="A logo with the words Mysterious Musings superimposed over two of the letter M" />
      </Link>
      <UserIcon />
    </div>
  );
}

export default Header;
