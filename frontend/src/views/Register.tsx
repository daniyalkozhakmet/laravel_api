import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "../feature/user/userFunctions";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });
  const dispatch = useAppDispatch();
  const {
    user: userStore,
    error,
    loading,
  } = useAppSelector((state) => state.user);
  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(register(user));
    console.log(user);
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column my-3">
        <h1 className="my-3">Login</h1>
        {error && !error.errors ? (
          <Alert message={error.message} className="alert alert-danger" />
        ) : null}
        <form className="w-75">
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              value={user.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, name: e.currentTarget.value });
              }}
            />
            {error && error.errors && error.errors.name ? (
              <Alert message={error.errors.name} className="text-danger" />
            ) : null}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={user.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, email: e.currentTarget.value });
              }}
            />
            {error && error.errors && error.errors.email ? (
              <Alert message={error.errors.email} className="text-danger" />
            ) : null}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={user.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user, password: e.currentTarget.value });
              }}
            />
            {error && error.errors && error.errors.password ? (
              <Alert message={error.errors.password} className="text-danger" />
            ) : null}
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword2">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={user.password_confirmation}
              placeholder="Confirm password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({
                  ...user,
                  password_confirmation: e.currentTarget.value,
                });
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-2"
            onClick={(e: React.MouseEvent) => {
              submitHandler(e);
            }}
          >
            Submit
          </button>
          <p>
            Already have an account?<Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};
