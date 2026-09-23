package com.ems.employee.service;

import com.ems.employee.dto.EmployeeRequestDTO;
import com.ems.employee.dto.EmployeeResponseDTO;
import com.ems.employee.entity.Employee;
import com.ems.employee.exception.EmployeeAlreadyExistsException;
import com.ems.employee.exception.EmployeeNotFoundException;
import com.ems.employee.mapper.EmployeeMapper;
import com.ems.employee.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

private static final Logger logger =
        LoggerFactory.getLogger(EmployeeServiceImpl.class);

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeResponseDTO saveEmployee(EmployeeRequestDTO requestDTO) {
logger.info("Creating employee with email: {}", requestDTO.getEmail());
        if (employeeRepository.existsByEmail(requestDTO.getEmail())) {
            throw new EmployeeAlreadyExistsException(requestDTO.getEmail());
        }

        Employee employee = EmployeeMapper.toEntity(requestDTO);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.toResponseDTO(savedEmployee);
    }

    @Override
    public List<EmployeeResponseDTO> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public Page<EmployeeResponseDTO> getAllEmployees(Pageable pageable) {

        return employeeRepository.findAll(pageable)
                .map(EmployeeMapper::toResponseDTO);
    }

    @Override
    public List<EmployeeResponseDTO> getEmployeesByDepartment(
            String department) {

        List<Employee> employees =
                employeeRepository.findByDepartment(department);

        if (employees.isEmpty()) {
            throw new EmployeeNotFoundException(
                    "No employees found in department: " + department
            );
        }

        return employees.stream()
                .map(EmployeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<EmployeeResponseDTO> getEmployeesByName(String name) {

        List<Employee> employees =
                employeeRepository.findByFirstNameContainingIgnoreCase(name);

        if (employees.isEmpty()) {
            throw new EmployeeNotFoundException(
                    "No employees found with name: " + name
            );
        }

        return employees.stream()
                .map(EmployeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<EmployeeResponseDTO> getEmployeesByEmail(String email) {

        List<Employee> employees =
                employeeRepository.findByEmailContainingIgnoreCase(email);

        if (employees.isEmpty()) {
            throw new EmployeeNotFoundException(
                    "No employees found with email: " + email
            );
        }

        return employees.stream()
                .map(EmployeeMapper::toResponseDTO)
                .toList();
    }
    
@Override
public List<EmployeeResponseDTO> searchEmployees(
        String keyword,
        String department) {

    boolean hasKeyword =
            keyword != null && !keyword.isBlank();

    boolean hasDepartment =
            department != null && !department.isBlank();

    List<Employee> employees;

    // Case 1: No search + No department
    // Return all employees
    if (!hasKeyword && !hasDepartment) {

        employees = employeeRepository.findAll();
    }

    // Case 2: No search + Department selected
    // Return employees from selected department
    else if (!hasKeyword) {

        employees =
                employeeRepository.findByDepartment(department);
    }

    // Case 3: Search present + No department
    // Search by first name OR last name OR email
    else if (!hasDepartment) {

        List<Employee> firstNameResults =
                employeeRepository
                        .findByFirstNameContainingIgnoreCase(keyword);

        List<Employee> lastNameResults =
                employeeRepository
                        .findByLastNameContainingIgnoreCase(keyword);

        List<Employee> emailResults =
                employeeRepository
                        .findByEmailContainingIgnoreCase(keyword);

        employees = new java.util.ArrayList<>(firstNameResults);

        lastNameResults.forEach(employee -> {
            if (employees.stream()
                    .noneMatch(e -> e.getId().equals(employee.getId()))) {

                employees.add(employee);
            }
        });

        emailResults.forEach(employee -> {
            if (employees.stream()
                    .noneMatch(e -> e.getId().equals(employee.getId()))) {

                employees.add(employee);
            }
        });
    }

    // Case 4: Search present + Department selected
    // Search by first name OR last name OR email
    // AND department
    else {

        List<Employee> firstNameResults =
                employeeRepository
                        .findByFirstNameContainingIgnoreCaseAndDepartment(
                                keyword,
                                department
                        );

        List<Employee> lastNameResults =
                employeeRepository
                        .findByLastNameContainingIgnoreCaseAndDepartment(
                                keyword,
                                department
                        );

        List<Employee> emailResults =
                employeeRepository
                        .findByEmailContainingIgnoreCaseAndDepartment(
                                keyword,
                                department
                        );

        employees = new java.util.ArrayList<>(firstNameResults);

        lastNameResults.forEach(employee -> {
            if (employees.stream()
                    .noneMatch(e -> e.getId().equals(employee.getId()))) {

                employees.add(employee);
            }
        });

        emailResults.forEach(employee -> {
            if (employees.stream()
                    .noneMatch(e -> e.getId().equals(employee.getId()))) {

                employees.add(employee);
            }
        });
    }

    return employees.stream()
            .map(EmployeeMapper::toResponseDTO)
            .toList();
}


    @Override
    public EmployeeResponseDTO getEmployeeById(Long id) {
logger.info("Fetching employee with id: {}", id);

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        return EmployeeMapper.toResponseDTO(employee);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO requestDTO) {
logger.info("Updating employee with id: {}", id);

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        existingEmployee.setFirstName(requestDTO.getFirstName());
        existingEmployee.setLastName(requestDTO.getLastName());
        existingEmployee.setEmail(requestDTO.getEmail());
        existingEmployee.setDepartment(requestDTO.getDepartment());
        existingEmployee.setSalary(requestDTO.getSalary());

        Employee updatedEmployee =
                employeeRepository.save(existingEmployee);

        return EmployeeMapper.toResponseDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
logger.info("Deleting employee with id: {}", id);

        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }

        employeeRepository.deleteById(id);
    }
}