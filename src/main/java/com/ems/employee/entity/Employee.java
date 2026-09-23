package com.ems.employee.entity;
import java.math.BigDecimal;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name cannot be blank")
@Column(nullable = false)
private String firstName;

@NotBlank(message = "Last name cannot be blank")
@Column(nullable = false)
private String lastName;

@NotBlank(message = "Email cannot be blank")
@Email(message = "Email must be valid")
@Column(unique = true, nullable = false)
private String email;

@NotBlank(message = "Department cannot be blank")
@Column(nullable = false)
private String department;

@Positive(message = "Salary must be greater than 0")
@Column(precision = 12, scale = 2, nullable = false)
private BigDecimal salary;
    public Employee() {
    }

   public Employee(Long id, String firstName, String lastName,
                String email, String department, BigDecimal salary) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.salary = salary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSalary() {
    return salary;
}
    public void setSalary(BigDecimal salary) {
    this.salary = salary;
}
}