document.addEventListener("DOMContentLoaded", function() {
    updateCalendar();
});

function updateCalendar() {
    const calendarGrid = document.querySelector(".calendar-grid");
    calendarGrid.innerHTML = "";

    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.innerText = i;
        calendarGrid.appendChild(dayDiv);
    }
}
