import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={"nav-bar"}>
      <Link to={"/articles"}>
        <p>All Articles</p>
      </Link>
    </div>
  );
}

export default NavBar;
