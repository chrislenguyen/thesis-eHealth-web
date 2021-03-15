// $('#btnOpenAddMedModal').on('click', function () {
//     console.log('Add Med Click');

// });

$.ajax({
    type: "get",
    url: "/init-doctor-info",
    data: "data",
    dataType: "dataType",
    success: function (response) {
        
    }
});

$("#btnCancelMedModal").on("click", function () {
	$("#myModal").modal("hide");
});

$("#medModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
	console.log("HIDED");
});

$("#examFormSubmitBtn").on("click", function () {
	
});

function appendToTable(tableId, data) {
	$("#" + tableId + " tbody").append("<tr><th>" + data + "</th></tr>");
	console.log("<tr><th>" + data + "</th></tr>");
}

function initPage() {
    loadDoctorInfo();
}

function loadDoctorInfo() {

}

function loadPatientInfo() {

}

myString = "Hello World"
temp = [...myString]
array = []
temp.forEach(e => {
    if (e == e.toUpperCase()) {
        console.log(e);
    }
});