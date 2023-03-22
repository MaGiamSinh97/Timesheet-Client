import { Routes, Route, Link ,Navigate,Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Fileupload from "./components/uploadfile.component";
import Timesheet from "./components/timesheet.component";
import { Project } from "./components/project.component";
import { Employee } from "./components/employee.component";
import Login from "./components/login.component";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  window.location.reload();
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/landing',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };
  const token = getToken();
  const handleLogout = () => {sessionStorage.clear();window.location.reload();};

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">        
          <Link to={"/"} className="navbar-brand">
            Timesheet
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">         
              <Link to={"/timesheet"} className="nav-link">
                My Timesheet
              </Link>
            </li>
            <li className="nav-item">
              {token.role === 1?(<Link to={"/project"} className="nav-link">
                Project
              </Link>):""}

            </li>
            <li className="nav-item">
            {token.role === 1?(<Link to={"/employee"} className="nav-link">
                Employee
              </Link>):""}
            </li>
            <li className="nav-item">
            {token.role === 1?(<Link to={"/upload"} className="nav-link">
                Upload File
              </Link>):""}
            </li>          
          </div>
          {token?(<span style={{color:'white',paddingRight:'10px'}}>{token.name}</span>):("")}
          {token?(<button className="btn btn-secondary float-right" onClick={handleLogout}>Sign Out</button>):("")}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route index element={<Timesheet />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/timesheet" element={<Timesheet/>} />
            <Route path="/upload" element={  
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={!!token && token.role === 1}
            >
              <Fileupload/>
            </ProtectedRoute>} />
            <Route path="/project" element={  
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={!!token && token.role === 1}
            >
              <Project/>
            </ProtectedRoute>} />
            <Route path="/employee" element={  
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={!!token && token.role === 1}
            >
              <Employee/>
            </ProtectedRoute>} />
          </Routes> 
        </div>
      </div>
  );
}
export default App;
