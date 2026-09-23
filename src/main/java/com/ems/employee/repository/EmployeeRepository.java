package com.ems.employee.repository;

import com.ems.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    List<Employee> findByDepartment(String department);

    List<Employee> findByFirstNameContainingIgnoreCase(String firstName);

    List<Employee> findByLastNameContainingIgnoreCase(String lastName);

List<Employee> findByLastNameContainingIgnoreCaseAndDepartment(
        String lastName,
        String department
);

    List<Employee> findByEmailContainingIgnoreCase(String email);

    List<Employee> findByFirstNameContainingIgnoreCaseAndDepartment(
        String firstName,
        String department
);
    List<Employee> findByEmailContainingIgnoreCaseAndDepartment(
        String email,
        String department
);
}
