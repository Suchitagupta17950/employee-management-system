const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import {
  getEmployees,
  getAllEmployees,
  searchEmployees,
} from "../services/employeeService";
import "./EmployeeTable.css";

function EmployeeTable({
  user,
  onAddEmployee,
  onEditEmployee,
  refresh,
}) {
 
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [loading, setLoading] = useState(true);

    const isAdmin = user?.role === "ADMIN";

  const departments = [
  ...new Set(
    allEmployees
      .map((employee) => employee.department)
      .filter(Boolean)
  ),
];

  useEffect(() => {
  loadEmployees();
  loadAllEmployees();
}, [currentPage, refresh]);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees(currentPage, 10);

      setEmployees(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllEmployees = async () => {
  try {
    const data = await getAllEmployees();
    setAllEmployees(data);
  } catch (error) {
    console.error("Failed to load all employees:", error);
  }
};

  const handleFilterChange = async (
    newSearch,
    newDepartment
  ) => {
    const hasSearch = newSearch.trim() !== "";
    const hasDepartment = newDepartment.trim() !== "";

    // No filters selected
    if (!hasSearch && !hasDepartment) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);

      const results = await searchEmployees(
        newSearch,
        newDepartment
      );

      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    handleFilterChange(
      value,
      department
    );
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);

    handleFilterChange(
      search,
      value
    );
  };

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/employees/${employee.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete employee"
        );
      }

      alert("Employee deleted successfully!");

      // Reload normal employee list
      loadEmployees();

      // If filters are active, refresh filtered results too
      if (
        search.trim() !== "" ||
        department.trim() !== ""
      ) {
        handleFilterChange(
          search,
          department
        );
      }
    } catch (error) {
      console.error("Delete employee error:", error);
      alert(error.message);
    }
  };

  const isSearching =
    search.trim() !== "" ||
    department.trim() !== "";

  const displayedEmployees = isSearching
    ? searchResults
    : employees;

  return (
    <div className="employee-page">

      {/* Header */}

      <div className="employee-page-header">
        <div>
          <h1>Employees</h1>

          <p>
            Manage and view all employees in the organization.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}

      <div className="employee-toolbar">

        <div className="search-filters">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
          />

          <select
            value={department}
            onChange={(e) =>
              handleDepartmentChange(e.target.value)
            }
          >
            <option value="">
              All Departments
            </option>

            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>

        </div>

        {isAdmin && (
          <button
            className="add-button"
            onClick={onAddEmployee}
          >
            + Add Employee
          </button>
        )}

      </div>

      {/* Employee Table */}

      <div className="table-container">

        {loading && employees.length === 0 ? (
          <p className="table-message">
            Loading employees...
          </p>
        ) : searching ? (
          <p className="table-message">
            Searching employees...
          </p>
        ) : displayedEmployees.length === 0 ? (
          <p className="table-message">
            No employees found.
          </p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {displayedEmployees.map((employee) => (

                <tr key={employee.id}>

                  <td>
                    #{employee.id}
                  </td>

                  <td>
                    <div className="employee-name">

                      <div className="table-avatar">
                        {employee.firstName?.charAt(0)}
                        {employee.lastName?.charAt(0)}
                      </div>

                      <span>
                        {employee.firstName}{" "}
                        {employee.lastName}
                      </span>

                    </div>
                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    <span className="department-badge">
                      {employee.department}
                    </span>
                  </td>

                  <td>
                    ₹{employee.salary}
                  </td>

                  <td>

                    <div className="action-buttons">

                      {isAdmin && (
                        <>
                          <button
                            className="edit-button"
                            onClick={() =>
                              onEditEmployee(employee)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(employee)
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

        {/* Pagination */}

        {!isSearching &&
          !loading &&
          totalPages > 0 && (

            <div className="pagination">

              <div className="pagination-info">
                Showing {employees.length} of{" "}
                {totalElements} employees
              </div>

              <div className="pagination-controls">

                <button
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev - 1
                    )
                  }
                  disabled={currentPage === 0}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage + 1} of{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev + 1
                    )
                  }
                  disabled={
                    currentPage >= totalPages - 1
                  }
                >
                  Next
                </button>

              </div>

            </div>
          )}

      </div>

    </div>
  );
}

export default EmployeeTable;

