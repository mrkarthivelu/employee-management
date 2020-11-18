package com.sukaas.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sukaas.repository.ShiftRepository;

@Controller
public class ShiftController {
	
	@Autowired
	ShiftRepository shiftRepository;
	
	@RequestMapping(value = "/getShifts", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getEmployee(HttpServletRequest request, HttpServletResponse response,
			Model model) {
		Map<String, Object> result = new HashMap<>();
		result.put("flag", true);
		result.put("shifts", shiftRepository.findActiveShifts());
		return result;
	}

}
