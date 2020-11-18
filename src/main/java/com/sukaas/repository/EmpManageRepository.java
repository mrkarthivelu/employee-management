package com.sukaas.repository;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EmpManageRepository {

	@Autowired
	private DataSource datasource;

	public void fecth() {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(datasource);
		System.out.println(jdbcTemplate.queryForObject("select count(*) from employee", Integer.class));
	}

}
