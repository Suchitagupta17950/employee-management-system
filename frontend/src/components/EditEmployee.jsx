import { useState } from "react";
import "./AddEmployee.css";
const API_URL = import.meta.env.VITE_API_URL;

function EditEmployee({ employee, onEmployeeUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: employee.firstName || "",
    lastName: employee.lastName || "",
    email: employee.email || "",
    department: employee.department || "",
    salary: employee.salary || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/employees/${employee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            salary: Number(formData.salary),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update employee"
        );
      }

      setMessage("Employee updated successfully!");

      setTimeout(() => {
        if (onEmployeeUpdated) {
          onEmployeeUpdated();
        }
      }, 800);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-page">

      <div className="form-header">
        <div>
          <h1>Edit Employee</h1>
          <p>Update employee information.</p>
        </div>

        <button
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Employee"}
            </button>

          </div>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

        </form>

      </div>

    </div>
  );
}

export default EditEmployee;