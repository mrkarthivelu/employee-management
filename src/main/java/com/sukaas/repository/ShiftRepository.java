package com.sukaas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sukaas.model.Shift;

public interface ShiftRepository extends CrudRepository<Shift, Long> {

	@Query("from Shift where status ='Y'")
	public List<Shift> findActiveShifts();
}
