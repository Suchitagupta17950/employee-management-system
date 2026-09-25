const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async (page = 0, size = 10) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/employees?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();

  return data.data;
};

export const getAllEmployees = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/employees/all`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch all employees");
  }

  const data = await response.json();

  return data.data;
};

export const searchEmployees = async (
  keyword = "",
  department = ""
) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();

  if (keyword.trim()) {
    params.append("keyword", keyword.trim());
  }

  if (department.trim()) {
    params.append("department", department);
  }

  const response = await fetch(
    `${API_URL}/employees/search/filter?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search employees");
  }

  const data = await response.json();

  return data.data;
};