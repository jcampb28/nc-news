import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="error-page">
      <h1 className="error-page-header">Sorry, that page doesn't exist.</h1>
      <h2 className="error-page-sub-header">
        Have you typed the address correctly?
      </h2>
      <Link to="/">
        <button className="error-page-button">Back to home</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
