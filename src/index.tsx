import React, { lazy, Suspense, createElement } from 'react';
import ReactDOM from 'react-dom/client';
import CircularProgress from '@mui/material/CircularProgress';
import { MemoryRouter as Router, BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const Router = process.env.ENV === "PROD" ? MemoryRouter : BrowserRouter;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const TokenForm = lazy(() => import("./components/form/TokenForm"));
const StartForm = lazy(() => import("./components/form/StartForm"));
const Projects = lazy(() => import("./components/form/Projects"));

const Main = () => {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />} >
        <Routes>
          <Route path="/token" element={<App><TokenForm /></App> } />
        </Routes>
        <Routes>
          <Route path="/projects" element={<App><Projects /></App> } />
        </Routes>
        <Routes>
          <Route path="/" element={<App><StartForm /></App>} />
        </Routes>
      </Suspense>
    </Router>
  )
}
root.render(
  <React.StrictMode>
      <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
