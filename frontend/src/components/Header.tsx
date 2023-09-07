import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../feature/user/userFunctions";
import { getToken } from "../feature/user/userFunctions";
import { filterBooks } from "../feature/book/bookFunctions";
export const Header = () => {
  const [search, setSearch] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isAuthenticated: string | false = getToken("token");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active") ? params.get("active") : "books";
  const logoutHandler = () => {
    dispatch(logout());
  };
  const searchHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(filterBooks(search));
    setSearch("");
  };
  return (
    <nav className="navbar navbar-light bg-light shadow">
      <div className="container">
        <Link to={`/home?active=${activeTab}`} className="navbar-brand">
          Bookstore
        </Link>
        {isAuthenticated ? (
          <div className="d-flex justify-content-center align-items-center">
            <form className="form-inline d-flex">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 mx-1"
                type="submit"
                onClick={(e) => {
                  searchHandler(e);
                }}
              >
                Search
              </button>
            </form>
            <button
              className="btn btn-outline-primary"
              onClick={(e: React.MouseEvent) => {
                logoutHandler();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
