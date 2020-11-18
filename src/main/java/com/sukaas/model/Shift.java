package com.sukaas.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SHIFT")
public class Shift {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String shiftName;
	private int shiftHours;
	private char status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getShiftName() {
		return shiftName;
	}

	public void setShiftName(String shiftName) {
		this.shiftName = shiftName;
	}

	public int getShiftHours() {
		return shiftHours;
	}

	public void setShiftHours(int shiftHours) {
		this.shiftHours = shiftHours;
	}

	public char getStatus() {
		return status;
	}

	public void setStatus(char status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Shift [id=" + id + ", shiftName=" + shiftName + ", shiftHours=" + shiftHours + ", status=" + status
				+ "]";
	}

}
