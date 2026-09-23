import "./Navbar.css";

function Navbar({
  onLogout,
  currentPage,
  setCurrentPage,
  user,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">EMS</div>

        <div>
          <h2>Employee Management</h2>
          <span>System</span>
        </div>
      </div>

      <div className="navbar-links">
        <button
          className={currentPage === "dashboard" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={currentPage === "employees" ? "nav-link active" : "nav-link"}
          onClick={() => setCurrentPage("employees")}
        >
          Employees
        </button>
      </div>

      <div className="navbar-right">
        <div className="user-info">
  <div className="user-avatar">
    {user?.username?.charAt(0).toUpperCase()}
  </div>

  <div>
    <p>{user?.username}</p>
    <span>{user?.role}</span>
  </div>
</div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;