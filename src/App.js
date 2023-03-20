import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Fileupload from "./components/uploadfile.component";
import Timesheet from "./components/timesheet.component";
import { Project } from "./components/project.component";
import { Employee } from "./components/employee.component";

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
                My Timesheet
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/project"} className="nav-link">
                Project
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/employee"} className="nav-link">
                Employee
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
            <Route path="/project" element={<Project/>} />
            <Route path="/employee" element={<Employee/>} />
          </Routes> 
        </div>
      </div>
    );
  }
}

export default App;
