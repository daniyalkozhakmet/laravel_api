import { Link, useLocation } from "react-router-dom";
import { ifAuth } from "../feature/user/userFunctions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBooks } from "../feature/book/bookFunctions";
import { Books } from "../components/book/Books";
import { AuthTab } from "../components/AuthTab";
import { getAuthors } from "../feature/author/authorFunctions";
import { Authors } from "../components/author/Authors";
const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const activeTab = params.get("active");
  useEffect(() => {
    if (ifAuth()) {
      if (activeTab == "books") {
        dispatch(getBooks(page ? page : ""));
      } else if (activeTab == "authors") {
        dispatch(getAuthors(page ? page : ""));
      } else dispatch(getBooks(""));
    }
  }, [page, activeTab]);
  return (
    <>
      {ifAuth() ? (
        <>
          <AuthTab />
          {activeTab == "books" ? <Books /> : <Authors />}
        </>
      ) : (
        <div className="my-3">
          <h1>Home</h1>
        </div>
      )}
    </>
  );
};

export default Home;
