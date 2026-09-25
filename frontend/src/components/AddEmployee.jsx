import { useState } from "react";
import "./AddEmployee.css";
const API_URL = import.meta.env.VITE_API_URL;

function AddEmployee({ onEmployeeAdded, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
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
        `${API_URL}/employees`,
        {
          method: "POST",
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
      console.log("Add Employee Response:", response.status, data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add employee"
        );
      }

     setMessage("Employee added successfully!");

setFormData({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  salary: "",
});

setTimeout(() => {
  if (onEmployeeAdded) {
    onEmployeeAdded();
  }
}, 1000);
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
          <h1>Add Employee</h1>
          <p>Add a new employee to the organization.</p>
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
                placeholder="Enter first name"
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
                placeholder="Enter last name"
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
                placeholder="Enter email"
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
                placeholder="e.g. IT"
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
                placeholder="Enter salary"
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
              {loading ? "Saving..." : "Save Employee"}
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

export default AddEmployee;