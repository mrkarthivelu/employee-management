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

import com.sukaas.model.Company;
import com.sukaas.repository.CompanyRepository;

@Controller
public class CompanyController {

	@Autowired
	CompanyRepository companyRepository;

	@RequestMapping(value = "/getCompany", method = RequestMethod.GET)
	public @ResponseBody String getCompany(HttpServletRequest request, HttpServletResponse response, Model model) {
		String result = "";
		Iterable<Company> companies = companyRepository.findAll();
		if (StreamSupport.stream(companies.spliterator(), false).count() > 1) {
			result = "<option value=\"\">Select Company</option>";
		}
		for (Company com : companies) {
			result += "<option value=" + com.getId() + ">" + com.getName() + "</option>";
		}
		return result;
	}

}
