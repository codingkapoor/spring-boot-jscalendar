var months = []

var days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]

var holidays = [];

function fetchData(url) {
	jQuery.extend({
		getValues : function(url) {
			var result = null;
			$.ajax({
				url : url,
				type : 'get',
				dataType : 'json',
				async : false,
				success : function(data) {
					result = data;
				}
			});
			return result;
		}
	});

	var response = $.getValues(url)
	return response
}

function prepareMonthsDictionary(year) {
	months = {
		"January" : [ 1, 31 ],
		"February" : [],
		"March" : [ 3, 31 ],
		"April" : [ 4, 30 ],
		"May" : [ 5, 31 ],
		"June" : [ 6, 30 ],
		"July" : [ 7, 31 ],
		"August" : [ 8, 31 ],
		"September" : [ 9, 30 ],
		"October" : [ 10, 31 ],
		"November" : [ 11, 30 ],
		"December" : [ 12, 31 ]
	};

	function isLeapYear(year) {
		return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
	}

	if (isLeapYear(year)) {
		months["February"] = [ 2, 29 ]
	} else
		months["February"] = [ 2, 28 ]
}

function prepareHolidaysDictionary(url) {
	var response = fetchData(url)

	for ( var i in response._embedded.holidays) {
		holidays[response._embedded.holidays[i].date] = response._embedded.holidays[i].occasion;
	}
}

function buildCalendar(year) {
	var calendarHTML = ""
	
	var startDay = new Date("January 1, " + year).getDay() + 1

	function dayTitle(day_name) {
		calendarHTML += "<td align=center width=35 bgcolor='#FFA4A4'>" + day_name + "</td>"
	}

	function fillTable(month, monthLength) {
		day = 1

		calendarHTML += "<table border=1 bordercolor='#ccc' cellspacing=3>"
		calendarHTML += "<tr><td colspan=7 align=center bgcolor='#CAE02A'><b>" + month + "   " + year + "</b></tr>"

		calendarHTML += "<tr>"

		for ( var i in days) {
			dayTitle(days[i])
		}

		calendarHTML += "</tr><tr>"

		for (var i = 1; i < startDay; i++) {
			calendarHTML += "<td>"
		}

		for (var i = startDay; i < 8; i++) {

			var holiday = getHoliday(year + "-" + pad(months[month][0]) + "-"
					+ pad(day))
			if (holiday == undefined) {
				calendarHTML += "<td align=center>" + day + "</td>"
			} else {
				calendarHTML += "<td align=center bgcolor='#F1F1F1'><div class='tooltip'>" + day + "<span class='tooltiptext'>" + holiday + "</span></div></td>"
			}

			day++
		}

		calendarHTML += "<tr>"

		while (day <= monthLength) {
			for (var i = 1; i <= 7 && day <= monthLength; i++) {

				var holiday = getHoliday(year + "-" + pad(months[month][0])
						+ "-" + pad(day))
				if (holiday == undefined) {
					calendarHTML += "<td align=center>" + day + "</td>"
				} else {
					calendarHTML += "<td align=center bgcolor='#F1F1F1'><div class='tooltip'>" + day + "<span class='tooltiptext'>" + holiday + "</span></div></td>"
				}

				day++
			}
			calendarHTML += "</tr>"
			startDay = i
		}

		calendarHTML += "</table>"

		calendarHTML += "<br>"
	}

	function getHoliday(date) {
		return holidays[date]
	}

	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}

	for ( var key in months) {
		var value = months[key];
		fillTable(key, value[1])
	}
	
	return calendarHTML
}

function displayCalendar() {
	var element = document.getElementById("selectYear");
	
	var optionIndex = element.selectedIndex
	var option = element[optionIndex].value
	
	if(optionIndex > 0) {
		prepareMonthsDictionary(option)
		prepareHolidaysDictionary("http://localhost:8080/years/" + option + "/holidays")
		
		var calendar = buildCalendar(option)
		document.getElementById("calendar").innerHTML = calendar
	}
}

function populateSelect() {
	var response = fetchData("http://localhost:8080/years")

	var years = response._embedded.years
	var arr = []
	for ( var i in years) {
		arr.push(years[i].year)
	}
	
	$.each(arr, function(key, value) {   
	     $('#selectYear')
	          .append($('<option>', { value : value })
	          .text(value)); 
	}); 
}
