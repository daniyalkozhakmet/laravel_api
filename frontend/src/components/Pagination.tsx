import React from "react";
import { Link as LinkType } from "../feature/book/bookSlice";
import { Link, useLocation } from "react-router-dom";
interface PaginationProp {
  meta: LinkType;
}
export const Pagination = ({ meta }: PaginationProp) => {
  let total = Array.from(Array(meta.last_page).keys());
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active");
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {total.map((link, index) => {
          if (link + 1 == meta.current_page) {
            return (
              <li key={index} className="page-item active">
                <Link
                  className="page-link"
                  to={`/home?active=${activeTab}&&page=${link + 1}`}
                >
                  {link + 1}
                </Link>
              </li>
            );
          }
          return (
            <li key={index} className="page-item">
              <Link
                className="page-link"
                to={`/home?active=${activeTab}&&page=${link + 1}`}
              >
                {link + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
