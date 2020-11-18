package com.sukaas.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sukaas.model.Attendance;
import com.sukaas.model.Employee;
import com.sukaas.repository.EmployeeRepository;

@Controller
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;

	@RequestMapping(value = "/addEmployee", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addEmployee(HttpServletRequest request, HttpServletResponse response,
			@RequestBody Employee employee) {
		Map<String, Object> result = new HashMap<>();

		System.out.println(employee);

		if (employee.getId() == null) {
			if (employeeRepository.findByMobileNo(employee.getMobileNo()) == null) {
				if (employeeRepository.findByAadhaar(employee.getAadhaar()) == null) {
					employee.setStatus("Y");
					employee.setJoiningDate(new Date());
					employeeRepository.save(employee);
					result.put("flag", true);
					result.put("message", "Employee has been added Successfully");
				} else {
					result.put("flag", false);
					result.put("message", "Aadhaar Number already available");
				}
			} else {
				result.put("flag", false);
				result.put("message", "Mobile Number already available");
			}
		} else {
			if (employeeRepository.findByMobileNoAndIdNot(employee.getMobileNo(), employee.getId()) == null) {
				if (employeeRepository.findByAadhaarAndIdNot(employee.getAadhaar(), employee.getId()) == null) {
					employeeRepository.save(employee);
					result.put("flag", true);
					result.put("message", "Employee has been modified Successfully");
				} else {
					result.put("flag", false);
					result.put("message", "Aadhaar Number already available");
				}
			} else {
				result.put("flag", false);
				result.put("message", "Mobile Number already available");
			}
		}
		return result;
	}

	@RequestMapping(value = "/disableEmployee", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> disableEmployee(HttpServletRequest request, HttpServletResponse response,
			@RequestBody Employee employee) {
		Map<String, Object> result = new HashMap<>();

		System.out.println(employee);
		Optional<Employee> emp = employeeRepository.findById(employee.getId());
		if (!emp.isEmpty()) {
			employee = emp.get();
			employee.setStatus("N");
			employeeRepository.save(employee);
			result.put("flag", true);
			result.put("message", "Employee has been disabled Successfully");
		} else {
			result.put("flag", false);
			result.put("message", "Employee details not available");
		}
		return result;
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
		model.addAttribute("date", new Date());
		return "login";
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(HttpServletRequest request, HttpServletResponse response, Model model) {
		model.addAttribute("date", new Date());
		return "home";
	}

	@RequestMapping(value = "/getEmployee", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getEmployee(HttpServletRequest request, HttpServletResponse response,
			Model model) {
		Map<String, Object> result = new HashMap<>();
		result.put("data", employeeRepository.findAll());
		return result;
	}

	@RequestMapping(value = "/getEmployeeAttendance", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getEmployeeAttendance(HttpServletRequest request,
			HttpServletResponse response, Model model,@RequestBody Attendance attendance) {
		Map<String, Object> result = new HashMap<>();
		System.out.println(attendance);
		result.put("data", employeeRepository.findAttendanceInformation(new SimpleDateFormat("YYYY-MM-dd").format(attendance.getAttendanceDate())));

		return result;
	}
}
