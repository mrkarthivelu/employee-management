<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Home Page</title>
<link href="resources/bootstrap/bootstrap.min.css" rel="stylesheet"></link>
<link href="resources/datatables/jquery.dataTables.min.css"
	rel="stylesheet"></link>
</head>
<body>
	<div class="container">
		<h2>Add New Employee</h2>
		<form class="form-horizontal" id="addEmployee">

			<div class="form-group">
				<label class="control-label col-sm-2">Name :</label>
				<div class="col-sm-4">
					<input class="form-control" type="text" id="name" />
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-sm-2">Address :</label>
				<div class="col-sm-4">
					<input class="form-control" type="text" id="address" />
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2">Aadhaar :</label>
				<div class="col-sm-4">
					<input class="form-control" type="text" id="aadhaar" />
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2">Mobile No :</label>
				<div class="col-sm-4">
					<input class="form-control" type="text" id="mobileNo" />
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2">Company :</label>
				<div class="col-sm-4">
					<select class="form-control" id="companyId" ></select>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2">Experience :</label>
				<div class="col-sm-4">
					<input class="form-control" type="text" id="experience" />
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-primary" type="submit" id="addEmployeeBtn">Add</button>
				</div>
			</div>

		</form>

		<table id="employeeTable" class="cell-border compact stripe">
			<thead>
				<tr>
					<td></td>
					<td>Name</td>
					<td>Salary</td>
					<td>Contact</td>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<script src="resources/jquery/jquery.min.js"></script>
	<script src="resources/bootstrap/bootstrap.min.js"></script>
	<script src="resources/datatables/jquery.dataTables.min.js"></script>
	<script src="js/home.js?ver=71"></script>
</body>
</html>