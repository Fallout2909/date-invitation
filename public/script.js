// 🌸 Change this to her name
const herName = "Missyelin"; // <-- PUT HER NAME HERE

// Set title dynamically when page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mainTitle").innerText =
        `Sunset attempt #2, ${herName}?`;

    // Add fade-in effect
    document.querySelector(".card").classList.add("fade-in");
});


// Submit form
function submitForm() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value;

    if (!date || !time) {
        alert("Please choose a date and time 🌸");
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
                <h1>Thank you, Missyelin 💞</h1>
                <p style="margin-top:15px;">${date} at ${time}</p>
                <p style="margin-top:20px;">Let's try to finally catch that sunset 🌅</p>
                <p style="font-style: italic; opacity: 0.8;">But honestly… I enjoyed the company more anyway.</p>
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