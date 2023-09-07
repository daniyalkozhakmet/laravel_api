import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination";
import { Spinner } from "../Spinner";
import { Alert } from "../Alert";
export const Authors = () => {
  const { authors, meta, loading, error } = useAppSelector(
    (state) => state.author
  );
  return (
    // <div className="my-4">
    //   {authors && meta ? (
    //     <div>
    //       {authors.map((b) => {
    //         return (
    //           <div className="card my-1 pe-auto" key={b.id}>
    //             <div className="card-body">
    //               <h5 className="card-title">{b.name}</h5>
    //               <Link to={`author/${b.id}`} className="card-link">
    //                 View
    //               </Link>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       <div className="d-flex justify-content-center align-items-center my-3">
    //         <Pagination meta={meta} />
    //       </div>
    //     </div>
    //   ) : (
    //     <p>No Author</p>
    //   )}
    // </div>
    <div className="my-4">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {error ? (
            <Alert
              message="Something went erong"
              className="alert alert-danger"
            />
          ) : (
            <>
              {authors && meta && (
                <>
                  {authors.map((b) => {
                    return (
                      <div className="card my-1 pe-auto" key={b.id}>
                        <div className="card-body">
                          <h5 className="card-title">{b.name}</h5>
                          <Link to={`authors/${b.id}`} className="card-link">
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  <div className="d-flex justify-content-center align-items-center my-3">
                    <Pagination meta={meta} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
