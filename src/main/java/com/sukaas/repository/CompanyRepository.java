package com.sukaas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sukaas.model.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {

}
