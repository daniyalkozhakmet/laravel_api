import React, { useReducer } from "react";
import { Book } from "../../feature/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { Pagination } from "../Pagination";
import { Spinner } from "../Spinner";
import { Alert } from "../Alert";
import { getBookByCategory, getBooks } from "../../feature/book/bookFunctions";
export const Books = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active") ? params.get("active") : "books";
  const { books, meta, loading, error, category_name } = useAppSelector(
    (state) => state.book
  );
  const dispatch = useAppDispatch();
  const getBookByCategoryHandler = (categoryId: string) => {
    if (categoryId) {
      dispatch(getBookByCategory({ page: "", id: categoryId }));

      handleClick();
    }
  };
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
  function handleBack() {
    dispatch(getBooks(""));
    forceUpdate();
  }

  return (
    <div className="my-4">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {error ? (
            <Alert
              message="Something went wrong"
              className="alert alert-danger"
            />
          ) : (
            <>
              {books && meta && (
                <>
                  {books && books.length == 0 && (
                    <Alert
                      message="No book found"
                      className="alert alert-warning"
                    />
                  )}
                  {category_name && (
                    <div className="d-flex justify-content-between align-items-center">
                      <h1>{category_name} </h1>
                      <Link
                        to={`/home?active=${activeTab}`}
                        className="btn btn-primary"
                        onClick={() => handleBack()}
                      >
                        Back
                      </Link>
                    </div>
                  )}

                  {books.map((b) => {
                    return (
                      <div className="card my-1 pe-auto" key={b.id}>
                        <div className="card-body">
                          <h5 className="card-title">{b.name}</h5>
                          <div className="my-2">
                            {b.categories &&
                              b.categories.map((category) => (
                                <a
                                  role="button"
                                  key={category.id}
                                  className="text-light bg-dark p-1 mx-1 rounded"
                                  onClick={() =>
                                    getBookByCategoryHandler(
                                      String(category.id)
                                    )
                                  }
                                  href={`#`}
                                >
                                  {category.name}
                                </a>
                              ))}
                          </div>
                          <p className="card-text">{b.description}</p>
                          <Link to={`/books/${b.id}`} className="card-link">
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  {meta.links && meta.links.length > 3 && (
                    <div className="d-flex justify-content-center align-items-center my-3">
                      <Pagination meta={meta} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
