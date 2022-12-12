import React, { lazy, Suspense, createElement } from "react";
import ReactDOM from "react-dom/client";
import CircularProgress from "@mui/material/CircularProgress";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";
import LoginForm from "./components/form/LoginForm";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constants";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const TokenForm = lazy(() => import("./components/form/TokenForm"));
const StartForm = lazy(() => import("./components/form/StartForm"));
const ProjectsForm = lazy(() => import("./components/form/ProjectsForm"));
const WorkForm = lazy(() => import("./components/form/WorkForm"));

const Main = () => {
  const renderAuthenticateRoute = (element: React.FunctionComponent) => (
    <AuthenticatedRoute>
      <App>
        {createElement(element)}
      </App>
    </AuthenticatedRoute>
  );

  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path={PUBLIC_ROUTES.LOGIN} element={<App><LoginForm /></App>} />
        </Routes>
        <Routes>
          <Route path={AUTH_ROUTES.TOKEN} element={renderAuthenticateRoute(TokenForm)} />
        </Routes>
        <Routes>
          <Route path={AUTH_ROUTES.PROJECTS} element={renderAuthenticateRoute(ProjectsForm)} />
        </Routes>
        <Routes>
          <Route path={`${AUTH_ROUTES.WORK}${AUTH_ROUTES.SECTIONS}`} element={renderAuthenticateRoute(WorkForm)} />
        </Routes>
        <Routes>
          <Route path={`${AUTH_ROUTES.WORK}${AUTH_ROUTES.CASES}`} element={renderAuthenticateRoute(WorkForm)} />
        </Routes>
        <Routes>
          <Route path={`${AUTH_ROUTES.WORK}${AUTH_ROUTES.REFERENCES}`} element={renderAuthenticateRoute(WorkForm)} />
        </Routes>
        <Routes>
          <Route path={AUTH_ROUTES.DASHBOARD} element={renderAuthenticateRoute(StartForm)} />
        </Routes>
      </Suspense>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
