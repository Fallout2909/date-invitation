const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = "responses.json";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));


// ✅ Submit route
app.post("/submit", (req, res) => {
    const { date, time, message } = req.body;

    const entry = {
        date,
        time,
        message,
        timestamp: new Date().toISOString()
    };

    let responses = [];

    if (fs.existsSync(FILE)) {
        const data = fs.readFileSync(FILE, "utf8");
        try {
            responses = JSON.parse(data);
        } catch {
            responses = [];
        }
    }

    if (!Array.isArray(responses)) {
        responses = [];
    }

    responses.push(entry);

    fs.writeFileSync(FILE, JSON.stringify(responses, null, 2));

    res.json({ success: true });
});


// ✅ Latest route (THIS is what you're missing)
app.get("/latest", (req, res) => {

    if (!fs.existsSync(FILE)) {
        return res.json({ message: "No responses yet." });
    }

    const data = fs.readFileSync(FILE, "utf8");

    let responses;
    try {
        responses = JSON.parse(data);
    } catch {
        return res.json({ message: "Corrupted JSON." });
    }

    if (!Array.isArray(responses) || responses.length === 0) {
        return res.json({ message: "No responses yet." });
    }

    responses.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json(responses[0]);
});

// ✅ Get All Responses
app.get("/all", (req, res) => {

    if (!fs.existsSync(FILE)) {
        return res.json([]);
    }

    const data = fs.readFileSync(FILE, "utf8");

    try {
        const responses = JSON.parse(data);
        return res.json(responses);
    } catch {
        return res.json([]);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});