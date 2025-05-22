import { Link } from "react-router-dom";

function ArticleNotFound() {
  return (
    <div className="error-page">
      <h1 className="error-page-header">
        Sorry, that article doesn't seem to exist.
      </h1>
      <h2 className="error-page-sub-header">
        Have you typed the address correctly?
      </h2>
      <Link to="/articles">
        <button className="error-page-button">Back to article list</button>
      </Link>
    </div>
  );
}

export default ArticleNotFound;
