
package com.ems.employee.controller;

import com.ems.employee.dto.EmployeeRequestDTO;
import com.ems.employee.dto.EmployeeResponseDTO;
import com.ems.employee.response.ApiResponse;
import com.ems.employee.service.EmployeeService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@SecurityRequirement(name = "Bearer Authentication")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ApiResponse<EmployeeResponseDTO> createEmployee(
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO savedEmployee =
                employeeService.saveEmployee(requestDTO);

        return new ApiResponse<>(
                true,
                "Employee created successfully",
                savedEmployee
        );
    }

    @GetMapping
    public ApiResponse<Page<EmployeeResponseDTO>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sort)
        );

        Page<EmployeeResponseDTO> employees =
                employeeService.getAllEmployees(pageable);

        return new ApiResponse<>(
                true,
                "Employees fetched successfully",
                employees
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getEmployeesByDepartment(
            @RequestParam String department) {

        List<EmployeeResponseDTO> employees =
                employeeService.getEmployeesByDepartment(department);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/search/name")
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getEmployeesByName(
            @RequestParam String name) {

        List<EmployeeResponseDTO> employees =
                employeeService.getEmployeesByName(name);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/search/email")
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getEmployeesByEmail(
            @RequestParam String email) {

        List<EmployeeResponseDTO> employees =
                employeeService.getEmployeesByEmail(email);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/search/filter")
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> searchEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String department) {

        List<EmployeeResponseDTO> employees =
                employeeService.searchEmployees(keyword, department);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getAllEmployeesWithoutPagination() {

        List<EmployeeResponseDTO> employees =
                employeeService.getAllEmployees();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "All employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> getEmployeeById(
            @PathVariable Long id) {

        EmployeeResponseDTO employee =
                employeeService.getEmployeeById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee fetched successfully",
                        employee
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO updatedEmployee =
                employeeService.updateEmployee(id, requestDTO);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee updated successfully",
                        updatedEmployee
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee deleted successfully",
                        null
                )
        );
    }
}

