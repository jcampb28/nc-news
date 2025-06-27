import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <Link to={"/articles"} className="nav-bar-item">
        <p className="nav-bar-item-text">All Articles</p>
      </Link>
    </div>
  );
}

export default NavBar;
