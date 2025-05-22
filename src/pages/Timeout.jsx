import { Link } from "react-router-dom";

function Timeout() {
  return (
    <div className="error-page">
      <h1 className="error-page-header">
        Connection timed out.
      </h1>
      <h2 className="error-page-sub-header">
        Please check your connection and try again.
      </h2>
      <Link to="/">
        <button className="error-page-button">Back to home</button>
      </Link>
    </div>
  );
}

export default Timeout;
