package com.sukaas.model;

import org.springframework.stereotype.Component;

@Component
public class EmployeeAttendance {

	private Long id;
	private String name;
	private String mobileNo;
	private String attendanceStatus;

	public EmployeeAttendance() {
		super();
	}

	public EmployeeAttendance(Long id, String name, String mobileNo, String attendanceStatus) {
		super();
		this.id = id;
		this.name = name;
		this.mobileNo = mobileNo;
		this.attendanceStatus = attendanceStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getAttendanceStatus() {
		return attendanceStatus;
	}

	public void setAttendanceStatus(String attendanceStatus) {
		this.attendanceStatus = attendanceStatus;
	}

}
