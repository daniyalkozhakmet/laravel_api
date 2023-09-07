import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import GuestLayout from "./layouts/GuestLayout";
import NotFound from "./views/NotFound";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Protected } from "./components/Protected";
import { IfProtected } from "./components/IfProtected";
import { useAppSelector } from "./hooks/hooks";
import { Admin } from "./views/Admin";
import { Book } from "./views/Book";
function App() {
  const userState = useAppSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route
            path="/login"
            element={
              <IfProtected>
                <Login />
              </IfProtected>
            }
          />
          <Route
            path="/register"
            element={
              <IfProtected>
                <Register />
              </IfProtected>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/books/:id"
            element={
              <Protected>
                <Book />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
