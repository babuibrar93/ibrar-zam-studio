import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <div className="App">
        {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
        <Router>
          <React.Fragment>
            <Routes>
              <Route path="/" exact element={<Auth />} />
              <Route
                path="/home"
                exact
                element={token ? <Home /> : <Navigate to="../" />}
              />
            </Routes>
          </React.Fragment>
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
