import { Link } from "react-router-dom";

function Header() {
  return (
  <Link to={"/"} aria-label="link-to-homepage">
  <h1 className="app-name">Mysterious Musings</h1>
  </Link>
  )
}

export default Header;
