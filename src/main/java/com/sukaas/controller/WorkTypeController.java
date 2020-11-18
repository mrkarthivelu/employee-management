package com.sukaas.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.StreamSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sukaas.model.WorkType;
import com.sukaas.repository.WorkTypeRepository;

@Controller
public class WorkTypeController {

	@Autowired
	WorkTypeRepository workTypeRepository;

	@RequestMapping(value = "/getWorkTypeDrop", method = RequestMethod.GET)
	public @ResponseBody String getEmployee(HttpServletRequest request, HttpServletResponse response, Model model) {
		String result = "";
		Iterable<WorkType> employeeTypes = workTypeRepository.findByStatus("Active");
		if (StreamSupport.stream(employeeTypes.spliterator(), false).count() > 1) {
			result = "<option value=\"\">Select Employee Type</option>";
		}
		for (WorkType com : employeeTypes) {
			result += "<option value=" + com.getId() + ">" + com.getTypeName() + "</option>";
		}
		return result;
	}

	@RequestMapping(value = "/getWorkType", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getWorkType(HttpServletRequest request, HttpServletResponse response,
			Model model) {
		Map<String, Object> result = new HashMap<>();
		
		result.put("data", workTypeRepository.findAll());
		return result;
	}

	@RequestMapping(value = "/addWork", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addWork(HttpServletRequest request, HttpServletResponse response,
			@RequestBody WorkType workType) {
		Map<String, Object> result = new HashMap<>();
		if (workType.getId() == null) {
			if (workTypeRepository.findByTypeNameIgnoreCase(workType.getTypeName().trim().toUpperCase()) == null) {
				workType.setStatus("Active");
				workTypeRepository.save(workType);
				result.put("flag", true);
				result.put("message", "Work Added Successfully");
			} else {
				result.put("flag", false);
				result.put("message", "Type name is already available");
			}
		} else {
			if (workTypeRepository.findByTypeNameIgnoreCaseAndIdNot(workType.getTypeName().trim(),
					workType.getId()) == null) {
				workTypeRepository.save(workType);
				result.put("flag", true);
				result.put("message", "Work modified Successfully");
			} else {
				result.put("flag", true);
				result.put("message", "Type name is already available");
			}

		}
		return result;
	}

	@RequestMapping(value = "/disableWork", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> disableWork(HttpServletRequest request, HttpServletResponse response,
			@RequestBody WorkType workType) {
		Map<String, Object> result = new HashMap<>();
		workType.setStatus("Inactive");
		workTypeRepository.save(workType);
		result.put("flag", true);
		result.put("message", "Work disabled Successfully");
		return result;
	}
}
