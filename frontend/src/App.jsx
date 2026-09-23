import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Dashboard from "./components/Dashboard";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { getUserFromToken } from "./services/authService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(getUserFromToken());
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [employeeRefresh, setEmployeeRefresh] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/auth/login?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

setUser(getUserFromToken());
setIsLoggedIn(true);
setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  setUser(null);
  setIsLoggedIn(false);
};

if (isLoggedIn) {
  return (
    <>
      <Navbar
  onLogout={handleLogout}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  user={user}
/>
      {currentPage === "dashboard" && <Dashboard />}

{currentPage === "employees" && (
  <EmployeeTable
  user={user}
  onAddEmployee={() => setCurrentPage("add-employee")}
  onEditEmployee={(employee) => {
    setSelectedEmployee(employee);
    setCurrentPage("edit-employee");
  }}
  refresh={employeeRefresh}
/>
)}

{currentPage === "add-employee" && (
  <AddEmployee
    onCancel={() => setCurrentPage("employees")}
    onEmployeeAdded={() => {
      setEmployeeRefresh((prev) => prev + 1);
      setCurrentPage("employees");
    }}
  />
)}
{currentPage === "edit-employee" && selectedEmployee && (
  <EditEmployee
    employee={selectedEmployee}
    onCancel={() => {
      setSelectedEmployee(null);
      setCurrentPage("employees");
    }}
    onEmployeeUpdated={() => {
      setEmployeeRefresh((prev) => prev + 1);
      setSelectedEmployee(null);
      setCurrentPage("employees");
    }}
  />
)}
    </>
  );
}

  return (
    <div className="app">
      <div className="login-container">
        <div className="login-card">
          <div className="logo">EMS</div>

          <h1>Employee Management System</h1>

          <p className="subtitle">
            Sign in to manage your employees
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {message && (
              <p className="login-message">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;