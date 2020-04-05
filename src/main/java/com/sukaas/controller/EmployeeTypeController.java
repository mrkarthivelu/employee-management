package com.sukaas.controller;

import java.util.stream.StreamSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sukaas.model.EmployeeType;
import com.sukaas.repository.EmployeeTypeRepository;

@Controller
public class EmployeeTypeController {

	@Autowired
	EmployeeTypeRepository employeeTypeRepository;
	
	@RequestMapping(value = "/getEmployeeType", method = RequestMethod.GET)
	public @ResponseBody String getEmployee(HttpServletRequest request, HttpServletResponse response, Model model) {
		String result = "";
		Iterable<EmployeeType> employeeTypes = employeeTypeRepository.findAll();
		if (StreamSupport.stream(employeeTypes.spliterator(), false).count() > 1) {
			result = "<option value=\"\">Select Employee Type</option>";
		}
		for (EmployeeType com : employeeTypes) {
			result += "<option value=" + com.getId() + ">" + com.getTypename() + "</option>";
		}
		return result;
	}
}
