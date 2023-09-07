import { Link, useLocation } from "react-router-dom";
const NotFound = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active") ? params.get("active") : "books";
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="border border-danger p-5 d-flex justify-content-center align-items-center flex-column">
        <h1>404</h1>
        <div className="text-danger font-weight-bold text-uppercase">
          Not Found
        </div>
        <Link
          to={`/home?active=${activeTab}`}
          className="btn btn-outline-dark mt-3"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
