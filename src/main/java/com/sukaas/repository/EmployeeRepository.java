package com.sukaas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sukaas.model.Employee;
import com.sukaas.model.EmployeeAttendance;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

	public Employee findByMobileNo(String mobile);

	public Employee findByAadhaar(long aadhaar);

	public Employee findByAadhaarAndIdNot(long aadhaar, long id);

	public Employee findByMobileNoAndIdNot(String mobile, long id);

	@Query("select new com.sukaas.model.EmployeeAttendance(a.id,a.name,a.mobileNo,b.attendanceStatus) from Employee a left join Attendance b on a.id = b.employeeId "
			+ "and trunc(attendance_Date)=to_date(:date,'YYYY-MM-dd')")
	public List<EmployeeAttendance> findAttendanceInformation(@Param("date") String date);
}
