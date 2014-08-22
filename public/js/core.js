var USERNAME = 'keithj';

$(document).ready(function() {
	$(".report").on("click", function(e) {
		console.log("Removing kill");
		// Send data to server
		var data = {
			killID: $(this).closest("div.killSummary").attr("data-id"),
			username: USERNAME
		};
		$(this).closest(".killSummary").addClass("dead");
		$.ajax({
			url: "/votes/report",
			type: "POST",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(data),
			complete: function (data) {
				console.log('got here');
			}
		});
	});

	$(".recommend").on("click", function(e) {
		console.log("Recommending kill");
		// Send data to server
		var data = {
			killID: $(this).closest("div.killSummary").attr("data-id"),
			username: USERNAME
		};
		$(this).prop('disabled', true);
		$.ajax({
			url: "/votes/recommend",
			type: "POST",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(data),
			complete: function (data) {
				console.log('got here');
			}
		});
	});

	$(".share").on("click", function(e) {
		console.log("Sharing kill");
	});
});