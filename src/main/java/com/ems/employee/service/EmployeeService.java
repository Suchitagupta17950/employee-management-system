package com.ems.employee.service;

import com.ems.employee.dto.EmployeeRequestDTO;
import com.ems.employee.dto.EmployeeResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    EmployeeResponseDTO saveEmployee(EmployeeRequestDTO requestDTO);

    List<EmployeeResponseDTO> getAllEmployees();

    Page<EmployeeResponseDTO> getAllEmployees(Pageable pageable);

    List<EmployeeResponseDTO> getEmployeesByDepartment(String department);

    List<EmployeeResponseDTO> getEmployeesByName(String name);

    List<EmployeeResponseDTO> getEmployeesByEmail(String email);
    List<EmployeeResponseDTO> searchEmployees(
        String keyword,
        String department
);

    EmployeeResponseDTO getEmployeeById(Long id);

    EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO requestDTO);

    void deleteEmployee(Long id);
}