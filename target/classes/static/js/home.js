/**
 * 
 */

$(document).ready(function() {

	$.ajax({
		url : "getCompany",
		success : function(result) {
			$("#companyId").html(result);
		}
	});

	$("#addEmployee").submit(function() {

		$.ajax({
			type : 'POST',
			url : 'addEmployee',
			contentType : 'application/json',
			data : JSON.stringify({
				"name" : $("#name").val(),
				"address" : $("#address").val(),
				"aadhaar" : $("#aadhaar").val(),
				"mobileNo" : $("#mobileNo").val(),
				"companyId" : $("#companyId").val(),
				"experience" : $("#experience").val()
			}),
			success : function(data, success, xhr) {
				var ct = xhr.getResponseHeader("content-type") || "";
				if (ct.indexOf('application/json') > -1) {
					alert(JSON.stringify(data));
				}
			}

		});
		return false;
	});

	var employeeTable = $('#employeeTable').DataTable({
		ajax : 'getEmployee',
		columns : [ {
			data : null
		}, {
			data : 'name'
		}, {
			data : 'aadhaar'
		}, {
			data : 'mobileNo'
		} ],
	});

	employeeTable.on('order.dt search.dt', function() {
		employeeTable.column(0, {
			search : 'applied',
			order : 'applied'
		}).nodes().each(function(cell, i) {
			cell.innerHTML = i + 1;
		});
	}).draw();
});
