package com.sukaas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.sukaas.model.WorkType;

public interface WorkTypeRepository extends CrudRepository<WorkType,Long>{
	
	public WorkType findByTypeNameIgnoreCase(String typename);
	
	public WorkType findByTypeNameIgnoreCaseAndIdNot(String typeName,long id);
	
	public List<WorkType> findByStatus(String status);

}
