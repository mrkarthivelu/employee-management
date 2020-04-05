package com.sukaas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sukaas.model.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee,Long>{

	
}
