import React, { FC } from "react";

export const Spinner = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      ></div>
    </div>
  );
};
