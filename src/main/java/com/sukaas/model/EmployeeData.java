package com.sukaas.model;

public class EmployeeData {

	private String name;
	private double salary;
	private String contact;
	private double todayAttendance;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public double getTodayAttendance() {
		return todayAttendance;
	}

	public void setTodayAttendance(double todayAttendance) {
		this.todayAttendance = todayAttendance;
	}

	@Override
	public String toString() {
		return "EmployeeData [name=" + name + ", salary=" + salary + ", contact=" + contact + ", todayAttendance="
				+ todayAttendance + "]";
	}

}
