import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";

function Header() {
  return (
    <div className="app-header">
      <Link to={"/"} aria-label="link-to-homepage">
        <h1 className="app-name">Mysterious Musings</h1>
      </Link>
      <UserIcon />
    </div>
  );
}

export default Header;
