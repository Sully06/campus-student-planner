
// show today's date
const currentDate = document.getElementById("current-date");

if (currentDate) {
    currentDate.textContent = new Date().toLocaleDateString();
}

// get the assignment elements
const assignmentForm = document.getElementById("assignment-form");
const assignmentList = document.getElementById("assignment-list");
const search = document.getElementById("search");

// search for assignments
if (search) {
    search.addEventListener("input", function () {
        const text = search.value.toLowerCase();
        const assignments = document.querySelectorAll(".assignment-item");

        assignments.forEach(function (item) {
            const match = item.textContent.toLowerCase().includes(text);
            item.classList.toggle("d-none", !match);
        });
    });
}

// add new homework
if (assignmentForm) {
    assignmentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("assignment-name").value;
        const course = document.getElementById("course-name").value;
        const due = document.getElementById("due-date").value;

        const item = assignmentList.firstElementChild.cloneNode(true);

        item.querySelector("h4").textContent = name;
        item.querySelectorAll("p")[0].textContent = "Course: " + course;
        item.querySelectorAll("p")[1].textContent = "Due: " + due;
        item.querySelector("input").checked = false;
        item.classList.remove("completed", "d-none");

        assignmentList.appendChild(item);
        assignmentForm.reset();
        search.value = "";
        search.dispatchEvent(new Event("input"));
    });
}

// cross out finished homework
if (assignmentList) {
    assignmentList.addEventListener("change", function (event) {
        if (event.target.classList.contains("complete-checkbox")) {
            const item = event.target.closest(".assignment-item");
            item.classList.toggle("completed", event.target.checked);
        }
    });
}

// show the current week
const currentWeek = document.getElementById("current-week");
let week = new Date();

week.setDate(week.getDate() - (week.getDay() + 6) % 7);

function showWeek() {
    const friday = new Date(week);
    friday.setDate(friday.getDate() + 4);

    currentWeek.textContent = week.toLocaleDateString()
        + " - " + friday.toLocaleDateString();
}

// switch between weeks
if (currentWeek) {
    showWeek();

    document.getElementById("previous-week").addEventListener("click", function () {
        week.setDate(week.getDate() - 7);
        showWeek();
    });

    document.getElementById("next-week").addEventListener("click", function () {
        week.setDate(week.getDate() + 7);
        showWeek();
    });
}


// get weather for Des Moines
const weatherInfo = document.getElementById("weather-info");

if (weatherInfo) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.59&longitude=-93.62&current=temperature_2m&temperature_unit=fahrenheit")
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather request failed");
            }
            return response.json();
        })
        .then(data => {
            weatherInfo.textContent = "Des Moines: " 
                + data.current.temperature_2m + "°F";
        })
        .catch(error => {
            weatherInfo.textContent = "Weather unavailable.";
        });
}
