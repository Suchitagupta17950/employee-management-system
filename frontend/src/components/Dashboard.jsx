import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService";
import "./Dashboard.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getAllEmployees();

      setEmployees(data);
      setTotalEmployees(data.length);
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ];

  const averageSalary =
    employees.length > 0
      ? employees.reduce(
          (total, employee) =>
            total + Number(employee.salary || 0),
          0
        ) / employees.length
      : 0;

  const recentEmployees = [...employees]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const departmentCounts = employees.reduce(
    (counts, employee) => {
      const department = employee.department;

      counts[department] =
        (counts[department] || 0) + 1;

      return counts;
    },
    {}
  );

  return (
    <div className="dashboard">

      {/* Dashboard Header */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back! Here's an overview of your
            employees.
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats-container">

        <div className="stat-card">
          <div className="stat-icon">👥</div>

          <div>
            <p>Total Employees</p>

            <h2>
              {loading ? "..." : totalEmployees}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>

          <div>
            <p>Departments</p>

            <h2>
              {loading ? "..." : departments.length}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>

          <div>
            <p>System Status</p>

            <h2>Active</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>

          <div>
            <p>Average Salary</p>

            <h2>
              {loading
                ? "..."
                : `₹${Math.round(
                    averageSalary
                  ).toLocaleString("en-IN")}`}
            </h2>
          </div>
        </div>

      </div>

      {/* Recent Employees */}

      <div className="employees-section">

        <div className="section-header">
          <h2>Recent Employees</h2>

          <span>Latest 5</span>
        </div>

        {loading ? (
          <p className="loading">
            Loading employees...
          </p>
        ) : recentEmployees.length === 0 ? (
          <p className="empty">
            No employees found.
          </p>
        ) : (
          <div className="employee-list">

            {recentEmployees.map((employee) => (
              <div
                className="employee-card"
                key={employee.id}
              >

                <div className="employee-avatar">
                  {employee.firstName?.charAt(0)}
                  {employee.lastName?.charAt(0)}
                </div>

                <div className="employee-info">
                  <h3>
                    {employee.firstName}{" "}
                    {employee.lastName}
                  </h3>

                  <p>{employee.email}</p>
                </div>

                <div className="employee-department">
                  {employee.department}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Department Summary */}

      <div className="department-section">

        <div className="section-header">
          <h2>Department Summary</h2>

          <span>
            {departments.length} departments
          </span>
        </div>

        <div className="department-list">

          {Object.entries(departmentCounts).map(
            ([department, count]) => (
              <div
                className="department-item"
                key={department}
              >
                <span>{department}</span>

                <strong>
                  {count} employees
                </strong>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;