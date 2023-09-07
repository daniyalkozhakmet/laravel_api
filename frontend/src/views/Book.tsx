import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { Link, useParams } from "react-router-dom";
import { getBookById } from "../feature/book/bookFunctions";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
export const Book = () => {
  const params = useParams();

  let bookId = params.id;

  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state) => state.book);
  useEffect(() => {
    if (bookId) dispatch(getBookById(bookId));
  }, [bookId]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert message={error.message} className="alert alert-danger" />
  ) : (
    book && (
      <div className="my-4">
        <div className="card my-1 pe-auto">
          <div className="card-body">
            <h5 className="card-title">{book.name}</h5>
            <div className="my-2">
              {book.categories &&
                book.categories.map((category) => (
                  <a
                    role="button"
                    key={category.id}
                    className="text-light bg-dark p-1 mx-1 rounded"
                    href={`#`}
                  >
                    {category.name}
                  </a>
                ))}
            </div>
            <p className="card-text">{book.description}</p>
            <Link to={`/home?active=books`} className="card-link">
              Back
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
