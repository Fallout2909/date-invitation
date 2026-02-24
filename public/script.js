// 🌸 Put her name here
const herName = "Missyelin";

// Track playful "Let me think" clicks
let thinkClicks = 0;


// 🌅 When page loads
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#step1 h1");
    if (title) {
        title.innerText = `${herName}…`;
    }

    document.querySelector(".card").classList.add("fade-in");
});


// 😌 When she clicks YES
function goToStep2() {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");

    step1.style.display = "none";
    step2.style.display = "block";

    step2.classList.add("fade-in");
}


// 😏 Playful "Let me think" escalation
function playfulNo() {
    const btn = document.getElementById("thinkBtn");
    thinkClicks++;

    if (thinkClicks === 1) {
        btn.innerText = "Are you sure? 👉👈";
    }
    else if (thinkClicks === 2) {
        btn.innerText = "Hmm… still thinking? 🥲";
    }
    else if (thinkClicks === 3) {

        const card = document.querySelector(".card");

        card.innerHTML = `
            <h1>Alright… I'll get it 🥲</h1>
            <p style="margin-top:20px;">
                Maybe I'll try again another time.
            </p>
        `;

        card.classList.add("fade-in");

        // After 3 seconds, fade out
        setTimeout(() => {
            document.body.style.transition = "opacity 1s ease";
            document.body.style.opacity = "0";

            setTimeout(() => {
                window.location.href = "about:blank";
            }, 1000);

        }, 3000);
    }
}


// 💌 Submit form
function submitForm() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value;

    if (!date || !time) {
        alert("Pick a date and time first 😌");
        return;
    }

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date, time, message })
    })
        .then(response => response.json())
        .then(data => {

            const card = document.querySelector(".card");

            // Fade out
            card.classList.remove("fade-in");
            card.classList.add("fade-out");

            setTimeout(() => {

                card.innerHTML = `
                <h1>It’s a date, ${herName} 💞</h1>

                <p style="margin-top:15px;">
                    ${date} at ${time}
                </p>

                <p style="margin-top:20px;">
                    Let's make it a day to remember! 🥰 
                </p>

                <p style="font-style: italic; opacity: 0.8;">
                    But honestly… I’m already looking forward to the company more.
                </p>
            `;

                card.classList.remove("fade-out");
                card.classList.add("fade-in");
                card.classList.add("pop-in");

            }, 400);

        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong 😢");
        });
}