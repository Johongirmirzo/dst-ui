import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AuthContext } from "./context/AuthContext";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register user={user} />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
