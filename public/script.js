const herName = "Missyelin";
let thinkClicks = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#step1 h1").innerText = `${herName}…`;
});

function goToStep2() {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
}

function playfulNo() {
    const btn = document.getElementById("thinkBtn");
    thinkClicks++;

    if (thinkClicks === 1) {
        btn.innerText = "Are you sure? 👉👈";
    } else if (thinkClicks === 2) {
        btn.innerText = "Please? 😢";
    } else {
        fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "rejected" })
        });

        document.querySelector(".card").innerHTML = `
            <h1>Alright… I’ll get it 🥲</h1>
            <p style="margin-top:20px;">
                Maybe I’ll try again another time.
            </p>
        `;
    }
}

function handleAvailabilityChange() {
    const value = document.getElementById("availability").value;
    const timeRange = document.getElementById("timeRange");
    const lunch = document.getElementById("lunchOption");
    const dinner = document.getElementById("dinnerOption");

    if (value === "custom") {
        timeRange.style.display = "block";
    } else {
        timeRange.style.display = "none";
    }

    if (value === "day" || value === "whole") {
        lunch.checked = true;
        dinner.checked = false;
    }

    if (value === "night") {
        dinner.checked = true;
        lunch.checked = false;
    }
}

function submitForm() {
    const date = document.getElementById("date").value;
    const availability = document.getElementById("availability").value;
    const startTime = document.getElementById("startTime")?.value;
    const endTime = document.getElementById("endTime")?.value;
    const message = document.getElementById("message").value;
    const foodSuggestion = document.getElementById("foodSuggestion").value;

    const activities = Array.from(
        document.querySelectorAll(".activity:checked")
    ).map(el => el.value);

    if (!date || !availability) {
        alert("Pick a date and availability first 😌");
        return;
    }

    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date,
            availability,
            startTime,
            endTime,
            activities,
            foodSuggestion,
            message,
            status: "accepted"
        })
    })
    .then(res => res.json())
    .then(() => {
        document.querySelector(".card").innerHTML = `
            <h1>It's a date, ${herName} 💞</h1>
            <p style="margin-top:15px;">${date}</p>
            <p>Let's hope all goes as planned haha. </p>
        `;
    });
}

document.addEventListener("change", function(e) {
    if (e.target.classList.contains("activity")) {
        const card = e.target.closest(".activity-card");
        card.classList.toggle("selected", e.target.checked);
    }
});