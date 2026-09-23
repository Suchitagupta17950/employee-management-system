# Employee Management System

A full-stack **Employee Management System** built with **Spring Boot, React, and MySQL**, featuring JWT-based authentication, role-based authorization, employee CRUD operations, search and filtering, pagination, validation, exception handling, and Swagger API documentation.

The project demonstrates how a modern full-stack application can be designed with a secure REST API backend and a responsive React frontend.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login using username and password
* Role-based access control
* Two user roles:

  * `ADMIN`
  * `USER`
* Protected employee APIs
* ADMIN-only operations:

  * Add employee
  * Edit employee
  * Delete employee
* ADMIN and USER can:

  * View employees
  * Search employees
  * Filter employees
* Passwords are stored using BCrypt hashing
* JWT secret and database credentials are stored using environment variables

---

### 👨‍💼 Employee Management

ADMIN users can manage employee records through the React dashboard.

Supported operations:

* Create employee
* View employees
* View employee by ID
* Update employee
* Delete employee
* Search employees
* Filter employees by department
* Search by:

  * First name
  * Last name
  * Email
* Combine keyword search with department filtering
* Pagination for employee listing

---

### 🔎 Search & Filtering

The application provides a combined search API that supports:

```text
Keyword only
Department only
Keyword + Department
No filters
```

The keyword can match:

```text
First Name
Last Name
Email
```

For example:

```text
Keyword: Gupta
Department: IT
```

returns employees whose first name, last name, or email contains `Gupta` and who belong to the IT department.

The backend also removes duplicate employees when the same employee matches multiple search conditions.

---

### 📊 Dashboard

The dashboard provides an overview of employee data, including:

* Total number of employees
* Number of departments
* Average salary
* Recent employees
* Employee distribution by department

The dashboard fetches employee data from the backend through a REST API.

---

### 🛡️ Validation & Exception Handling

The backend includes centralized exception handling using `@RestControllerAdvice`.

The application handles:

* Invalid request data
* Employee not found
* Duplicate employee email
* Unauthorized requests
* Forbidden operations
* Unexpected server errors

Example validation response:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": "Email should be valid"
  }
}
```

Example duplicate-email response:

```json
{
  "success": false,
  "message": "Employee already exists with email: amit@gmail.com",
  "data": null
}
```

---

## 🏗️ System Architecture

The application follows a layered architecture.

```text
                 ┌─────────────────────┐
                 │     React Frontend   │
                 │      Port: 5173      │
                 └──────────┬──────────┘
                            │
                            │ HTTP / REST API
                            ▼
                 ┌─────────────────────┐
                 │   Spring Boot API   │
                 │      Port: 8080      │
                 └──────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        Controller       Service      Security/JWT
             │              │
             │              ▼
             │         Repository
             │              │
             └──────────────┤
                            ▼
                     ┌─────────────┐
                     │   MySQL DB  │
                     └─────────────┘
```

### Request Flow

A typical employee request follows this flow:

```text
React UI
   ↓
HTTP Request
   ↓
JWT Authentication Filter
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
JSON Response
   ↓
React UI
```

---

# 🛠️ Tech Stack

## Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Hibernate
* Maven
* Bean Validation
* OpenAPI / Swagger

## Frontend

* React
* JavaScript
* HTML
* CSS
* Vite
* Fetch API

## Database

* MySQL

## Development Tools

* VS Code
* Git
* GitHub
* MySQL
* Swagger UI

---

# 📁 Project Structure

```text
employee-management-system/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AddEmployee.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditEmployee.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── employeeService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── src/
│   ├── main/
│   │   ├── java/com/ems/employee/
│   │   │
│   │   ├── config/
│   │   │   ├── OpenApiConfig.java
│   │   │   └── SecurityConfig.java
│   │   │
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   └── EmployeeController.java
│   │   │
│   │   ├── dto/
│   │   │   ├── AuthResponseDTO.java
│   │   │   ├── EmployeeRequestDTO.java
│   │   │   └── EmployeeResponseDTO.java
│   │   │
│   │   ├── entity/
│   │   │   ├── Employee.java
│   │   │   └── User.java
│   │   │
│   │   ├── exception/
│   │   │   ├── EmployeeAlreadyExistsException.java
│   │   │   ├── EmployeeNotFoundException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   │
│   │   ├── mapper/
│   │   │   └── EmployeeMapper.java
│   │   │
│   │   ├── repository/
│   │   │   ├── EmployeeRepository.java
│   │   │   └── UserRepository.java
│   │   │
│   │   ├── response/
│   │   │   └── ApiResponse.java
│   │   │
│   │   ├── security/
│   │   │   ├── CustomAuthenticationEntryPoint.java
│   │   │   ├── CustomUserDetailsService.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── JwtService.java
│   │   │
│   │   ├── service/
│   │   │   ├── EmployeeService.java
│   │   │   └── EmployeeServiceImpl.java
│   │   │
│   │   └── EmployeeManagementSystemApplication.java
│   │
│   └── resources/
│       ├── application.properties
│       └── application-dev.properties
│
├── .gitignore
├── pom.xml
├── mvnw
└── mvnw.cmd
```

---

# 🔑 Authentication Flow

The application uses JWT for stateless authentication.

### Step 1 — Login

The user submits:

```text
Username
Password
```

to:

```http
POST /auth/login
```

### Step 2 — Authentication

Spring Security verifies the username and password using the database.

Passwords are checked using BCrypt.

### Step 3 — JWT Generation

After successful authentication, the backend generates a JWT containing information such as:

```json
{
  "sub": "admin",
  "role": "ADMIN"
}
```

### Step 4 — Store Token

The React frontend stores the token in browser `localStorage`.

### Step 5 — Send Token

For protected requests, the frontend sends:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Step 6 — JWT Filter

`JwtAuthenticationFilter` validates the token before allowing access to protected APIs.

### Step 7 — Authorization

Spring Security checks the user's role.

For example:

```text
ADMIN → POST /employees → Allowed

USER → POST /employees → 403 Forbidden
```

---

# 👥 Role-Based Access Control

| Operation        | ADMIN | USER |
| ---------------- | :---: | :--: |
| Login            |   ✅   |   ✅  |
| View employees   |   ✅   |   ✅  |
| Search employees |   ✅   |   ✅  |
| Filter employees |   ✅   |   ✅  |
| Add employee     |   ✅   |   ❌  |
| Edit employee    |   ✅   |   ❌  |
| Delete employee  |   ✅   |   ❌  |

The frontend also hides ADMIN-only buttons from USER accounts.

However, authorization is enforced on the **backend as well**, so hiding buttons in the frontend is not the only security mechanism.

---

# 🌐 REST API Endpoints

## Authentication

### Login

```http
POST /auth/login
```

Parameters:

```text
username
password
```

Returns a JWT after successful authentication.

---

## Employee APIs

### Create Employee

```http
POST /employees
```

Role:

```text
ADMIN
```

---

### Get Employees

```http
GET /employees
```

Supports pagination:

```text
?page=0&size=10
```

Example:

```http
GET /employees?page=0&size=10
```

---

### Get All Employees

```http
GET /employees/all
```

Returns all employees without pagination.

This endpoint is used by the frontend for dashboard calculations and department dropdown data.

---

### Get Employee By ID

```http
GET /employees/{id}
```

Example:

```http
GET /employees/5
```

---

### Update Employee

```http
PUT /employees/{id}
```

Role:

```text
ADMIN
```

---

### Delete Employee

```http
DELETE /employees/{id}
```

Role:

```text
ADMIN
```

---

### Search By Department

```http
GET /employees/search?department=IT
```

---

### Search By Name

```http
GET /employees/search/name?name=Suchita
```

---

### Search By Email

```http
GET /employees/search/email?email=gmail.com
```

---

### Combined Search

```http
GET /employees/search/filter
```

Parameters:

```text
keyword
department
```

Examples:

```http
GET /employees/search/filter?keyword=Gupta
```

```http
GET /employees/search/filter?department=IT
```

```http
GET /employees/search/filter?keyword=Gupta&department=IT
```

---

# 📄 API Response Format

The application uses a common response structure:

```json
{
  "success": true,
  "message": "Employee fetched successfully",
  "data": {}
}
```

This provides a consistent API response format across the application.

---

# 📚 Swagger API Documentation

The project uses **OpenAPI/Swagger** for API documentation and testing.

After starting the backend, open:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger can be used to:

* Explore APIs
* View request parameters
* View response structures
* Authorize using JWT
* Test protected endpoints
* Test ADMIN and USER authorization

For protected APIs:

1. Login using `/auth/login`
2. Copy the returned JWT
3. Click **Authorize**
4. Enter the JWT token
5. Test the protected APIs

---

# 🗄️ Database

The application uses MySQL.

Database:

```text
employee_management
```

Main tables:

```text
employee
user
```

The `employee` table stores employee information such as:

```text
id
first_name
last_name
email
department
salary
```

The `user` table stores authentication information and roles.

Example roles:

```text
ADMIN
USER
```

---

# ⚙️ Environment Variables

Sensitive information is **not stored directly in the GitHub repository**.

The application uses environment variables for sensitive configuration.

Required variables:

```text
DB_PASSWORD
SPRING_SECURITY_PASSWORD
JWT_SECRET
```

Example:

```text
DB_PASSWORD=your_database_password
SPRING_SECURITY_PASSWORD=your_security_password
JWT_SECRET=your_jwt_secret
```

Do **not** commit real passwords or secret keys to GitHub.

---

# 💻 Installation & Setup

## Prerequisites

Make sure the following are installed:

* Java
* Maven
* Node.js
* npm
* MySQL
* Git

---

# 1. Clone the Repository

```bash
git clone https://github.com/Suchitagupta17950/employee-management-system.git
```

Navigate into the project:

```bash
cd employee-management-system
```

---

# 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE employee_management;
```

Make sure MySQL is running on:

```text
localhost:3306
```

---

# 3. Configure Environment Variables

Set the required environment variables:

```text
DB_PASSWORD
SPRING_SECURITY_PASSWORD
JWT_SECRET
```

Use your own values.

Never use or commit the actual secrets from your local machine.

---

# 4. Run the Backend

From the project root:

```bash
mvnw.cmd spring-boot:run
```

The backend will start on:

```text
http://localhost:8080
```

---

# 5. Run the Frontend

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔄 Running the Complete Application

You need two terminals.

### Terminal 1 — Backend

```bash
mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Testing

The application was tested for the following scenarios:

### Authentication

* ADMIN login
* USER login
* Invalid login
* JWT authentication

### Authorization

* ADMIN access to employee creation
* USER attempting ADMIN-only operations
* Unauthorized API access
* Protected endpoints

### Employee Operations

* Create employee
* Get employee
* Update employee
* Delete employee
* Pagination
* Search
* Last-name search
* Email search
* Department filtering
* Combined search

### Error Handling

* Validation failure → `400 Bad Request`
* Employee not found → `404 Not Found`
* Duplicate email → `409 Conflict`
* Missing authentication → `401 Unauthorized`
* Insufficient role → `403 Forbidden`

---

# 🧠 Key Backend Concepts Demonstrated

This project demonstrates practical implementation of:

* RESTful API development
* Layered architecture
* DTO pattern
* Entity-DTO mapping
* Repository pattern through Spring Data JPA
* Dependency Injection
* Spring Security
* JWT authentication
* Role-based authorization
* BCrypt password hashing
* Global exception handling
* Bean validation
* Pagination
* Dynamic searching
* MySQL integration
* Hibernate ORM
* OpenAPI documentation
* CORS configuration

---

# 🎨 Frontend Concepts Demonstrated

The React frontend demonstrates:

* React functional components
* React Hooks
* `useState`
* `useEffect`
* Component-based architecture
* Conditional rendering
* Form handling
* API integration using Fetch
* JWT storage and usage
* Role-based UI rendering
* Search and filtering
* Pagination
* Dashboard statistics
* Reusable components

---

# 🔒 Security Considerations

The project follows several security practices:

* Passwords are BCrypt hashed
* JWT is used for stateless authentication
* Protected endpoints require authentication
* ADMIN operations require ADMIN role
* Database passwords are externalized
* JWT secret is externalized
* Sensitive credentials are excluded using `.gitignore`
* Backend authorization prevents unauthorized users from directly calling ADMIN APIs

---

# 📌 Future Improvements

Possible future enhancements include:

* Refresh token mechanism
* Forgot/reset password
* User registration
* Advanced employee sorting
* Employee profile pages
* Profile image upload
* Export employees to CSV/PDF
* Audit logging
* Advanced dashboard charts
* Docker deployment
* CI/CD using GitHub Actions
* Cloud deployment
* Automated integration tests
* Production database configuration

---

# 🎯 Learning Outcomes

Through this project, I practiced building a complete full-stack application from backend API design to frontend integration.

The project helped strengthen my understanding of:

```text
Java
    ↓
Spring Boot
    ↓
REST APIs
    ↓
Spring Security
    ↓
JWT
    ↓
Spring Data JPA
    ↓
MySQL
    ↓
React
    ↓
Git & GitHub
```

---

# 👩‍💻 Author

**Suchita Gupta**

Information Technology Graduate | Java Developer

Interested in:

* Java
* Data Structures & Algorithms
* Backend Development
* Spring Boot
* SQL
* System Design
* REST APIs

---

## ⭐ If you find this project useful

Feel free to explore the repository, review the implementation, and provide feedback.
