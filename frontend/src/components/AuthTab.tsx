import React from "react";
import { Link, useLocation } from "react-router-dom";
export const AuthTab = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active");
  return (
    <ul className="nav nav-tabs my-3">
      <li className="nav-item">
        <Link
          to="/home?active=books"
          className={`nav-link ${activeTab == "books" && "active"} `}
        >
          Books
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/home?active=authors"
          className={`nav-link ${activeTab == "authors" && "active"} `}
        >
          Authors
        </Link>
      </li>
    </ul>
  );
};
