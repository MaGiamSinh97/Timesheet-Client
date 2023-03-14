import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Fileupload from "./components/uploadfile.component";
import Timesheet from "./components/timesheet.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Timesheet
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/upload"} className="nav-link">
                Upload File
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Timesheet/>} />
            <Route path="/upload" element={<Fileupload/>} />
          </Routes> 
        </div>
      </div>
    );
  }
}

export default App;
