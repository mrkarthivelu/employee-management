<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta charset="utf-8">

<title>Home Page</title>

<link href="resources/bootstrap/bootstrap.min.css" rel="stylesheet"></link>
<link href="css/application.css" rel="stylesheet"></link>
<link href="resources/datatables/dataTables.bootstrap.min.css"
	rel="stylesheet"></link>
<link href="resources/datatables/select.dataTables.min.css"
	rel="stylesheet"></link>
<link href="resources/datatables/buttons.dataTables.min.css"
	rel="stylesheet"></link>
<link href="resources/bootstrap/bootstrap-datetimepicker.css"
	rel="stylesheet"></link>
</head>
<body>
	<div class="container-fluid">
		<div id="header" style="height:10%">
			<nav class="navbar navbar-expand-lg navbar-default bg-light">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse"
							data-target="#myNavbar">
							<span class="icon-bar"></span> <span class="icon-bar"></span> <span
								class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#">Employee Management</a>
					</div>
					<div class="collapse navbar-collapse" id="myNavbar">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="#"><span class="glyphicon glyphicon-user"></span>
									Karthikeyan Rathinavelu</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-log-in"></span>
									Logout</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="col-md-2" style="padding: 5px;">
			<nav class="d-none d-md-block bg-light sidebar" style="height:85%;border-radius: 10px;">
				<div class="sidebar-sticky">
					<ul class="nav flex-column">
						<li class="nav-item" style="border-radius: 10px;"><a class="nav-link active"
							href="#employeeManagement"> Employee </a></li>
						<li class="nav-item" style="border-radius: 10px;"><a class="nav-link"
							href="#attendanceManagement"> Attendance </a></li>
						<li class="nav-item" style="border-radius: 10px;"><a class="nav-link"
							href="#salaryManagement"> Salary </a></li>
						<li class="nav-item" style="border-radius: 10px;"><a class="nav-link"
							href="#employeeTypeManagement"> Work Type </a></li>
					</ul>

				</div>
			</nav>
		</div>
		<div class="col-md-10" style="padding: 5px;">

			<div class="container-fluid">
				<div style="position: fixed; width: 50%; right: 15px; z-index: 1;">
					<div id="successMsg" style="display: none"
						class="alert alert-success"></div>
					<div id="failureMsg" style="display: none"
						class="alert alert-danger"></div>
				</div>
				<div id="employeeManagement" style="">
					<h2>Employee Management</h2>
					<div class="" style="padding-bottom: 5px">
						<button type="button" id="addEmployeeMainBtn"
							class="btn btn-primary">Add Employee</button>
					</div>
					<table id="employeeTable"
						class="table table-striped table-bordered" style="width: 100%">
						<thead>
							<tr>
								<!-- <td></td> -->
								<td>Name</td>
								<td>Contact</td>
								<td>Address</td>
								<td>Aadhaar</td>
								<td>Joining Date</td>
								<td>Experience</td>
								<td>Status</td>
								<td>Options</td>
							</tr>
						</thead>
						<tbody></tbody>
					</table>


					<div id="addEmployeeModal" class="modal fade" role="dialog">
						<div class="modal-dialog">

							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title" id="employeeModalTitle">Add
										Employee</h4>
								</div>
								<div class="modal-body">
									<div id="addEmpFailureMsg" style="display: none"
										class="alert alert-danger"></div>
									<form class="form-horizontal" id="addEmployeeForm">
										<input type="hidden" id="employeeId" /> <input type="hidden"
											id="employeeJoiningDate" />
										<div class="form-group">
											<label class="control-label col-sm-4">Name :</label>
											<div class="col-sm-5">
												<input required class="form-control" type="text" id="name" />
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-4">Address :</label>
											<div class="col-sm-5">
												<input required class="form-control" type="text"
													id="address" />
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Aadhaar :</label>
											<div class="col-sm-5">
												<input required class="form-control" type="text"
													id="aadhaar" />
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Mobile No :</label>
											<div class="col-sm-5">
												<input required class="form-control" type="text"
													id="mobileNo" />
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Company :</label>
											<div class="col-sm-5">
												<select required class="form-control" id="companyId"></select>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Experience :</label>
											<div class="col-sm-5">
												<input required class="form-control" type="text"
													id="experience" />
											</div>
										</div>
										<div class="form-group" id="employeeStatus">
											<label class="control-label col-sm-4">Employee Status
												:</label>
											<div class="col-sm-5">
												<label class="radio-inline"><input
													name="employeeStatusCheck" type="radio"
													id="activeEmployeeStatus" value="Y" /> Active</label> <label
													class="radio-inline"><input
													name="employeeStatusCheck" type="radio"
													id="inactiveEmployeeStatus" value="N" />InActive</label>
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-4 col-sm-5">
												<button class="btn btn-primary" type="submit"
													id="addEmployeeBtn">Add</button>
											</div>
										</div>

									</form>
									<div id="disableEmployeeDiv" style="display: none">
										<p
											style="text-align: center; font-weight: bold; margin-bottom: 25px;">Are
											you sure you want to disable the employee?</p>
										<div class="modal-footer">
											<button type="button" id="disableEmployeeBtn"
												class="btn btn-danger">Disable</button>
											<button type="button" class="btn btn-secondary"
												data-dismiss="modal">Cancel</button>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>




				</div>
				<div id="attendanceManagement" style="display: none">
					<h2>Attendance Management</h2>

					<form class="form-horizontal" id="attendanceDateBtn">
						<div class="form-group">
							<label class="control-label col-sm-2">Pick Date :</label>
							<div class="col-sm-3">
								<input type='text' onkeypress="return false;"
									class="form-control" id='attendanceDatePicker' />
							</div>
						</div>
					</form>

					<table id="attendanceTable"
						class="table table-striped table-bordered" style="width: 100%">
						<thead>
							<tr>
								<td>Select</td>
								<td>Name</td>
								<td>Contact</td>
								<!-- <td>Attendance Date</td> -->
								<td>Attendance</td>
								<td>Options</td>
							</tr>
						</thead>
						<tbody></tbody>
					</table>


					<div id="markAttendanceModal" class="modal fade" role="dialog">
						<div class="modal-dialog">

							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title" id="employeeModalTitle">Mark
										Attendance</h4>
								</div>
								<div class="modal-body">
									<div style="position: fixed; right: 15px; z-index: 1">
										<div id="markAttendanceFailureMsg" style="display: none"
											class="alert alert-danger"></div>
									</div>
									<form class="form-horizontal" id="addAttendance">
										<div class="form-group">
											<label class="control-label col-sm-4">Selected Names
												:</label>
											<div class="col-sm-7 textWithRemoveDiv"
												id="markAttendanceModalBody"></div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Choose Shift :</label>
											<div id="shiftChooser"></div>
										</div>


									</form>

								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary"
										data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="salaryManagement" style="display: none">Salary</div>
				<div id="employeeTypeManagement" style="display: none">
					<h2>Work Management</h2>
					<div class="" style="padding-bottom: 5px">
						<button type="button" id="addWorkTypeBtn" class="btn btn-primary">Add
							Work</button>
					</div>
					<table id="workTypeTable"
						class="table table-striped table-bordered" style="width: 100%">
						<!-- class="cell-border compact stripe" -->
						<thead>
							<tr>
								<!-- <td></td> -->
								<td>Work Name</td>
								<td>Basic Salary</td>
								<td>Work Type</td>
								<td>Status</td>
								<td>Options</td>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<div id="addWorkModal" class="modal fade" role="dialog">
						<div class="modal-dialog">

							<!-- Modal content-->
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title" id="workModalTitle">Add Work</h4>
								</div>
								<div class="modal-body">
									<div style="position: fixed; right: 15px; z-index: 1">
										<div id="addWorkFailureMsg" style="display: none"
											class="alert alert-danger"></div>
									</div>
									<form class="form-horizontal" id="addWork">
										<input type="hidden" id="workTypeId" />
										<div class="form-group">
											<label class="control-label col-sm-4">Work Type :</label>
											<div class="col-sm-5">
												<input class="form-control" type="text" id="WorkTypeName"
													required />
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-4">Basic Salary :</label>
											<div class="col-sm-5">
												<input class="form-control" type="text" id="basicSalary"
													required />
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-4">Work Type :</label>
											<div class="col-sm-5">
												<label class="radio-inline"><input
													name="workTypeCheck" type="radio" id="shiftWorkType"
													value="Shift" required /> Shift</label> <label
													class="radio-inline"><input name="workTypeCheck"
													type="radio" id="pieceWorkType" value="Piece" />Piece</label>
											</div>
										</div>
										<div class="form-group" id="workStatus">
											<label class="control-label col-sm-4">Work Status :</label>
											<div class="col-sm-5">
												<label class="radio-inline"><input
													name="workStatusCheck" type="radio" id="activeWorkStatus"
													value="Active" /> Active</label> <label class="radio-inline"><input
													name="workStatusCheck" type="radio" id="inactiveWorkStatus"
													value="Inactive" />InActive</label>
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-4 col-sm-4">
												<button class="btn btn-primary" type="submit"
													id="addEmployeeTypeBtn">Add</button>
											</div>
										</div>

									</form>
									<div id="deleteWorkDiv">
										<p
											style="text-align: center; font-weight: bold; margin-bottom: 25px;">Are
											you sure you want to delete the work?</p>
										<div class="modal-footer">
											<button type="button" id="deleteWorkBtn"
												class="btn btn-warning">Disable</button>
											<button type="button" class="btn btn-secondary"
												data-dismiss="modal">Close</button>

										</div>
									</div>
								</div>
								<!-- <div class="modal-footer">
							<button type="button" class="btn btn-secondary"
							data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Save
							changes</button>
						</div> -->
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- CDN -->

		<script src="resources/jquery/jquery.min.js"></script>
		<script src="resources/bootstrap/bootstrap.min.js"></script>
		<script src="resources/datatables/jquery.dataTables.min.js"></script>
		<script src="resources/datatables/dataTables.bootstrap.min.js"></script>
		<script src="resources/datatables/dataTables.select.min.js"></script>
		<script src="resources/datatables/dataTables.buttons.min.js"></script>

		<script src="resources/bootstrap/moment.min.js"></script>
		<script src="resources/bootstrap/bootstrap-datetimepicker.min.js"></script>

		<!-- Custom JS -->
		<script src="js/home.js?ver=1"></script>
	</div>
</body>
</html>