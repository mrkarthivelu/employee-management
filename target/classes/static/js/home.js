/**
 * 
 */

var workTypeTable;
var employeeTable;
var attendanceTable;
var attendanceList = [];

$.fn.DataTable.Buttons.defaults.dom.button.className = 'btn';

$(document).ready(function() {
	
	loadEmployeeTable()
	$.ajax({
		url : "getCompany",
		success : function(result) {
			$("#companyId").html(result);
		}
	});

	$("#addEmployeeForm").submit(function() {
		$.ajax({
			type : 'POST',
			url : 'addEmployee',
			contentType : 'application/json',
			data : JSON.stringify({
				"id" : $("#employeeId").val(),
				"name" : $("#name").val(),
				"address" : $("#address").val(),
				"aadhaar" : $("#aadhaar").val(),
				"mobileNo" : $("#mobileNo").val(),
				"companyId" : $("#companyId").val(),
				"experience" : $("#experience").val(),
				"status" : $("input[name='employeeStatusCheck']:checked").val(),
				"joiningDate" : $("#employeeJoiningDate").val()
			}),
			success : function(data,success, xhr) {
				var ct = xhr.getResponseHeader("content-type")|| "";
				if (ct.indexOf('application/json') > -1) {
					if(data.flag == true){
						$("#successMsg").html(data.message);
						$("#successMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
						loadEmployeeTable();
						$("#addEmployeeModal").modal('hide');
					}else{
						$("#addEmpFailureMsg").html(data.message);
						$("#addEmpFailureMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
					}
				}
			}
		});
		return false;
	});
	
	$("#disableEmployeeBtn").click(function(){
		$.ajax({
			type : 'POST',
			url : 'disableEmployee',
			contentType : 'application/json',
			data : JSON.stringify({
				"id" : $("#employeeId").val(),
			}),
			success : function(data,success, xhr) {
				var ct = xhr.getResponseHeader("content-type")|| "";
				if (ct.indexOf('application/json') > -1) {
					if(data.flag == true){
						$("#successMsg").html(data.message);
						$("#successMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
						loadEmployeeTable();
						$("#addEmployeeModal").modal('hide');
					}else{
						$("#addEmpFailureMsg").html(data.message);
						$("#addEmpFailureMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
					}
				}
			}
		})
	});

	$("#addWork").submit(function() {
		$.ajax({
			type : 'POST',
			url : 'addWork',
			contentType : 'application/json',
			data : JSON.stringify({
					"id":$("#workTypeId").val(),
					"typeName" : $("#WorkTypeName").val(),
					"basicSalary" : $("#basicSalary").val(),
					"workType" : $("input[name='workTypeCheck']:checked").val(),
					"status" : $("input[name='workStatusCheck']:checked").val()
			}),
			success : function(data,success, xhr) {
				var ct = xhr.getResponseHeader("content-type")|| "";
				if (ct.indexOf('application/json') > -1) {
					if(data.flag == true){
						$("#successMsg").html(data.message);
						$("#successMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
						loadWorkTypeTable();
						$("#addWorkModal").modal('hide');
					}else{
						$("#addWorkFailureMsg").html(data.message);
						$("#addWorkFailureMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
					}
				}
			}
		});
		return false;
	});
	
	$("#deleteWorkBtn").click(function() {
		$.ajax({
			type : 'POST',
			url : 'disableWork',
			contentType : 'application/json',
			data : JSON.stringify({
				"id":$("#workTypeId").val(),
				"typeName" : $("#WorkTypeName").val(),
				"basicSalary" : $("#basicSalary").val(),
				"workType" : $("input[name='workTypeCheck']:checked").val(),
			}),
			success : function(data,success, xhr) {
				var ct = xhr.getResponseHeader("content-type")|| "";
				if (ct.indexOf('application/json') > -1) {
					if(data.flag == true){
						$("#successMsg").html(data.message);
						$("#successMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
						loadWorkTypeTable();
						$("#addWorkModal").modal('hide');
					}else{
						$("#addWorkFailureMsg").html(data.message);
						$("#addWorkFailureMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
					}
				}
			}
				});
		return false;
	});

	$(".nav a").on("click", function(event) {
		event.preventDefault();
		$($(".nav").find(".active")[0].hash).hide();
		$(".nav").find(".active").removeClass("active");
		$(this).addClass("active");
		var leftSideMenu = $(this)[0].hash
		$(leftSideMenu).show();
		if(leftSideMenu == '#employeeTypeManagement'){
			loadWorkType();
		}else if(leftSideMenu == '#employeeManagement'){
			loadEmployeeTable();
		}else if(leftSideMenu == "#attendanceManagement"){
			$("#attendanceDatePicker").val(moment().format('ddd, DD MMM YYYY'));
			loadAttendanceTable();
		}
		
	});
				
	$("#addWorkTypeBtn").click(function(){
		$("#workModalTitle").html("Add Work");
		$("#addEmployeeTypeBtn").html("Add");
		$("#addWork :input").prop("disabled", false);
		$("#addEmployeeTypeBtn").show();
		$("#deleteWorkDiv").hide();
		$("#workStatus").hide();
		$("#pieceWorkType").prop("checked",false);
		$("#shiftWorkType").prop("checked",false);
		$("input[name='workStatusCheck']").prop("required",false);
		document.getElementById("addWork").reset();
		$("#addWorkModal").modal();
	});
	
	
	$("#addEmployeeMainBtn").click(function(){
		$("#employeeModalTitle").html("Add Employee");
		$("#addEmployeeBtn").html("Add Employee");
		$("#addEmployeeBtn").show();
		$("#disableEmployeeDiv").hide();
		$("#employeeStatus").hide();
		$("#activeEmployeeStatus").prop("checked",false);
		$("#inactiveEmployeeStatus").prop("checked",false);
		//$("#addEmployeeForm").trigger("reset");
		$("#addEmployeeForm :input").prop("disabled", false);
		document.getElementById("addEmployeeForm").reset();
		$("#addEmployeeModal").modal();
	});
	
	$('#attendanceDatePicker').datetimepicker({
		format : 'ddd, DD MMM YYYY',
		maxDate : new Date(),
	}).on('dp.change' , function(){
		console.log('Hii')
		loadAttendanceTable();
	});
	
});

function loadShiftDetails(divElementId){
	
	$.ajax({
		type : 'GET',
		url : 'getShifts',
		success : function(data,success, xhr) {
			var ct = xhr.getResponseHeader("content-type")|| "";
			if (ct.indexOf('application/json') > -1) {
				if(data.flag == true){
					var checkboxes = "";
					data.shifts.forEach(function(shift,index){
						if(index % 3 == 0 ){
							if(checkboxes != ""){
								checkboxes+="</div><div class='col-sm-offset-4 col-sm-7'>"
							}else{
								checkboxes+="<div class='col-sm-7'>";
							}
							checkboxes+='<label class="radio-inline"><input'+
							' name="attendanceShiftCheck" type="radio" id="attendanceShift'+shift.id+'"'+
							' value="'+shift.id+'" /> '+shift.shiftName+'</label>';
						}else{
							checkboxes+='<label class="radio-inline"><input'+
							' name="attendanceShiftCheck" type="radio" id="attendanceShift'+shift.id+'"'+
							' value="'+shift.id+'" /> '+shift.shiftName+'</label>';
						}
					});
					checkboxes+="</div>"
					
					$(divElementId).html(checkboxes);
				}else{
					$("#markAttendanceFailureMsg").html(data.message);
					$("#markAttendanceFailureMsg").delay(1000).addClass("in").toggle(true).fadeOut(4000);
				}
			}
		}
	})
	
}

function loadEmployeeTable(){
	if(employeeTable !=null){
		employeeTable.destroy();
	}
	employeeTable = $('#employeeTable').DataTable({
		scrollX:true,
		responsive: true,
		ajax : 'getEmployee',
		columns : [ /*{
			data : null
		}, */{
			data : 'name'
		}, {
			data : 'mobileNo'
		},{
			data : 'address'
		}, {
			data : 'aadhaar'
		}, {
			data : 'joiningDate'
		},{
			data : 'experience'
		},{
			data : 'status'
		},{
			data : null,
			render : function(data,type, row) {
				return '<button type="button" class="btn btn-xs btn-primary" id="editEmployee">Edit</button> &nbsp;'
				+ '<button type="button" class="btn btn-xs btn-warning" id="disableEmployee">Disable</button>';
			}
		} ],
	}).draw();

	$('#employeeTable tbody').unbind().on('click','#editEmployee',function() {
		var data = employeeTable.row($(this).parents('tr')).data();
		$("#employeeModalTitle").html("Edit Employee");
		$("#addEmployeeBtn").html("Save Changes");
		$("#addEmployeeBtn").show();
		$("#disableEmployeeDiv").hide();
		$("#employeeId").val(data.id)
		$("#name").val(data.name);
		$("#address").val(data.address);
		$("#aadhaar").val(data.aadhaar);
		$("#mobileNo").val(data.mobileNo);
		$("#companyId").val(data.companyId);
		$("#experience").val(data.experience);
		$("#employeeJoiningDate").val(data.joiningDate);
		$("#employeeStatus").show();
		if(data.status == "Y"){
			$("#activeEmployeeStatus").prop("checked",true);
		}else if(data.status == "N"){
			$("#inactiveEmployeeStatus").prop("checked",true);
		}else{
			$("#activeEmployeeStatus").prop("checked",false);
			$("#inactiveEmployeeStatus").prop("checked",false);
		}
		$("#addEmployeeForm :input").prop("disabled", false);
		$("#addEmployeeModal").modal();
	}).on('click','#disableEmployee',function() {
		var data = employeeTable.row($(this).parents('tr')).data();
		$("#employeeModalTitle").html("Disable Employee");
		$("#addEmployeeBtn").hide();
		$("#disableEmployeeDiv").show();
		$("#employeeId").val(data.id)
		$("#name").val(data.name);
		$("#address").val(data.address);
		$("#aadhaar").val(data.aadhaar);
		$("#mobileNo").val(data.mobileNo);
		$("#companyId").val(data.companyId);
		$("#experience").val(data.experience);
		$("#employeeStatus").show();
		if(data.status == "Y"){
			$("#activeEmployeeStatus").prop("checked",true);
		}else if(data.status == "N"){
			$("#inactiveEmployeeStatus").prop("checked",true);
		}else{
			$("#activeEmployeeStatus").prop("checked",false);
			$("#inactiveEmployeeStatus").prop("checked",false);
		}
		$("#addEmployeeForm :input").prop("disabled", true);
		$("#addEmployeeModal").modal();
	});
}
function loadWorkTypeTable(){
	if(workTypeTable !=null){
		workTypeTable.destroy();
	}
	workTypeTable = $('#workTypeTable').DataTable({
		responsive: true,
		ajax : 'getWorkType',
		columns : [
				{
					data : 'typeName'
				},
				{
					data : 'basicSalary'
				},
				{
					data : 'workType'
				},
				{
					data : 'status'
				},
				{
					data : null,
					"render" : function(data,type, row) {
						return '<button type="button" class="btn btn-xs btn-primary" id="editWorkType">Edit</button> &nbsp;'
								+ '<button type="button" class="btn btn-xs btn-warning" id="deleteWorkType">Disable</button>';
					}
				} ],
		}).draw();
	
	
}

function loadWorkType(){
	loadWorkTypeTable();
	
	$('#workTypeTable tbody').unbind().on('click','#editWorkType',function() {
			var data = workTypeTable.row($(this).parents('tr')).data();
			$("#workModalTitle").html("Edit Work");
			$("#addEmployeeTypeBtn").html("Save Changes");
			$("#deleteWorkDiv").hide();
			$("#addEmployeeTypeBtn").show();
			$("#addWork :input").prop("disabled", false);
			$("#workTypeId").val(data.id);
			$("#WorkTypeName").val(data.typeName);
			$("#basicSalary").val(data.basicSalary);
			if(data.workType == "Piece"){
				$("#pieceWorkType").prop("checked",true);
			}else if(data.workType == "Shift"){
				$("#shiftWorkType").prop("checked",true);
			}else{
				$("#pieceWorkType").prop("checked",false);
				$("#shiftWorkType").prop("checked",false);
			}
			$("#workTypeId").val(data.id);
			$("#workStatus").show();
			$("input[name='workStatusCheck']").prop("required",true);
			if(data.status == "Active"){
				$("#activeWorkStatus").prop("checked",true);
			}else if(data.status == "Inactive"){
				$("#inactiveWorkStatus").prop("checked",true);
			}else{
				$("#activeWorkStatus").prop("checked",false);
				$("#inactiveWorkStatus").prop("checked",false);
			}
			$("#addWorkModal").modal();
		}).on('click','#deleteWorkType',function() {
			var data = workTypeTable.row($(this).parents('tr')).data();
			$("#workModalTitle").html("Disable Work");
			$("#deleteWorkDiv").show();
			$("#addWork :input").prop("disabled", true);
			$("#addEmployeeTypeBtn").hide();
			$("#workTypeId").val(data.id);
			$("#WorkTypeName").val(data.typeName);
			$("#basicSalary").val(data.basicSalary);
			if(data.workType == "Piece"){
				$("#pieceWorkType").prop("checked",true);
			}else if(data.workType == "Shift"){
				$("#shiftWorkType").prop("checked",true);
			}else{
				$("#pieceWorkType").prop("checked",false);
				$("#shiftWorkType").prop("checked",false);
			}
			$("#workStatus").show();
			$("input[name='workStatusCheck']").prop("required",true);
			if(data.status == "Active"){
				$("#activeWorkStatus").prop("checked",true);
			}else if(data.status == "Inactive"){
				$("#inactiveWorkStatus").prop("checked",true);
			}else{
				$("#activeWorkStatus").prop("checked",false);
				$("#inactiveWorkStatus").prop("checked",false);
			}
			$("#addWorkModal").modal();
		});
}

function loadAttendanceTable(){
	if(attendanceTable !=null){
		attendanceTable.destroy();
	}
	attendanceTable = $('#attendanceTable').DataTable({
		scrollX:true,
		responsive: true,
		ajax : {
			url : 'getEmployeeAttendance',
			type : "POST",
			contentType : 'application/json',
			data : function(){
				return JSON.stringify({
				"attendanceDate" : new Date($("#attendanceDatePicker").val())
			})
			}
		},
		
		columns : [ {
			data : null,
			render : function(data,type,row){
				return ''
			}
		}, {
			data : 'name'
		}, {
			data : 'mobileNo'
		}, {
			data : 'attendanceStatus'
		}, {
			data : null,
			render : function(data,type, row) {
				if(new Date($("#attendanceDatePicker").val()) >= new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())){
					return '<button type="button" class="btn btn-xs btn-primary" id="editEmployee">Mark</button> &nbsp;'
						+ '<button type="button" class="btn btn-xs btn-warning" id="disableEmployee">Un Mark</button>';
				}else{
					return ''
				}
			}
		} ],
		columnDefs: [ {
			orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: selectDecider(),
        order: [[ 1, 'asc' ]],
        dom: 'Bfrtip',
        buttons: [
        	{
        		extend : 'selected',
        		text : 'Mark Attendance',
        		className:'btn btn-primary',
        		/*init: function(api, node, config) {
        		       $(node).removeClass('dt-button')
        		},*/
        		action: function ( e, dt, node, config ) {
        			var var1= "";
        			attendanceList=[];
        			$.map(attendanceTable.rows('.selected').data(), function (item) {
        		        attendanceList.push({id:item.id,name:item.name});
        		    });
        			
        			$("#markAttendanceModalBody").html(generateNameList(attendanceList));
        			loadShiftDetails("#shiftChooser");
        			$("#markAttendanceModal").modal();
                }
        	},
            {
        		extend: 'selectAll',
        		text : 'Select All Rows',
        		action: function ( e, dt, node, config ) {
        			attendanceTable.rows( { search: 'applied' } ).select();
        		}
            },
            'selectNone',
           
        ]
	}).draw();
}

function selectDecider(){
	if(new Date($("#attendanceDatePicker").val()) >= new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())){
		return {
	        style:    'multi',
	        selector: 'td:not(:last-child)'
	    }
	}else{
		return false
	}
}

function generateNameList(attendanceList){
	var html="";
	attendanceList.forEach(function(attendee,index){
		html+="<a class='textWithRemove'>"+attendee.name+"<i "+
		"class='icon glyphicon glyphicon-trash' onClick='removeAttendanceList("+index+")'></i></a>";
	});
	return html;
}

function removeAttendanceList(index){
	attendanceList.splice(index,1);
	
	$("#markAttendanceModalBody").html(generateNameList(attendanceList));
}

$("#markAttendanceModal").on("hidden.bs.modal", function () {
    // put your default event here
	attendanceTable.rows().deselect();
});