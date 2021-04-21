$("#btnShowExamHistory").click(function (e) {
	e.preventDefault();
	$("#examHistoryContainer").empty();
	fetch(
		"/get-exam-history?newPatientFlag=" + $("#hdnNewPatientFlag").val()
	).then((res) => {
		res.json().then((data) => {
			console.log(data);
			data.examHistory.forEach((exam) => {
				genExamHistory(exam);
			});
		});
	});
});

function genExamHistory(data) {
	$("#examHistoryContainer").append(
		'<div class="container" style="border: 0.5px solid black; padding: 15px;"> ' +
			'	<div class="row"> ' +
			'		<h6 class="col">Exam Date:</h6> ' +
			'		<p class="col" > ' +
			data.examDate +
			"</p> " +
			'		<h6 class="col">Next Exam Date:</h6> ' +
			'		<p class="col"> ' +
			(data.nextExamDate ? data.nextExamDate : "No Next Exam Date") +
			" </p> " +
			"	</div> " +
			'	<div class="row" style="padding: 15px;"> ' +
			'		<label for="" class="col col-2">Weight (kg)</label> ' +
			'		<p class="col col-2"  style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;">' +
			data.weight +
			"</p> " +
			'		<label for="" class="col col-2">SPO2 (%)</label> ' +
			'		<p class="col col-2"  style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;"> ' +
			data.spo2 +
			"</p> " +
			'		<label for="" class="col col-2">Temperature (°C)</label> ' +
			'		<p class="col col-2" style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;"> ' +
			data.temperature +
			"</p> " +
			"	</div> " +
			'	<div class="row" style="padding: 15px;"> ' +
			'		<label for="" class="col col-2">Height (cm)</label> ' +
			'		<p class="col col-2"  style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;"> ' +
			data.height +
			"</p> " +
			'		<label for="" class="col col-2">Heart Pulse (bpm)</label> ' +
			'		<p class="col col-2"  style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;"> ' +
			data.hPulse +
			"</p> " +
			'		<label for="" class="col col-2">BMI (kg/m2)</label> ' +
			'		<p class="col col-2" style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: center;"> ' +
			data.bmi +
			"</p> " +
			"	</div> " +
			"	<p>Diagnose</p> " +
			'	<p style="border: 1px solid black; box-shadow: none; resize: none; background-color: white; text-align: left; padding: 5px;"> ' +
			(data.diagnosis ? data.diagnosis : "No Diagnosis") +
			"</p> " +
			(data.med[0].medName === undefined
				? ""
				: '	<div class="container med-table-container"> ' +
				  '		<table class="table table-striped table-dark med-table"> ' +
				  "			<thead> " +
				  "				<tr> " +
				  '					<th scope="col" style="width: 30%;">Name</th> ' +
				  '					<th scope="col" style="width: 10%;">Quantity</th> ' +
				  '					<th scope="col" style="width: 60%;">Description</th> ' +
				  "				</tr> " +
				  "			</thead> " +
				  "			<tbody> " +
				  genMedTable(data.med) +
				  "			</tbody> " +
				  "		</table> " +
				  "	</div> ") +
			"</div> " +
			"<br></br> "
	);
}

function genMedTable(medData) {
	var medElement = "";
	medData.forEach((med) => {
		medElement += "<tr>";
		medElement += "<td>" + med.medName + "</td>";
		medElement += "<td>" + med.medQuantity + "</td>";
		medElement += "<td>" + med.medDes + "</td>";
		medElement += "</tr>";
	});
	return medElement;
}
