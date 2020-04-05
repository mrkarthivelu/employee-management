package com.sukaas.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
		employee.setStatus("Y");
		employeeRepository.save(employee);
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
}
