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

app.post("/submit", (req, res) => {

    const entry = {
        date: req.body.date || null,
        availability: req.body.availability || null,
        startTime: req.body.startTime || null,
        endTime: req.body.endTime || null,
        activities: req.body.activities || [],
        foodSuggestion: req.body.foodSuggestion || null,
        message: req.body.message || null,
        status: req.body.status || "accepted",
        timestamp: new Date().toISOString()
    };

    let responses = [];

    if (fs.existsSync(FILE)) {
        responses = JSON.parse(fs.readFileSync(FILE, "utf8"));
    }

    responses.push(entry);
    fs.writeFileSync(FILE, JSON.stringify(responses, null, 2));

    res.json({ success: true });
});

app.get("/all", (req, res) => {
    if (!fs.existsSync(FILE)) return res.json([]);
    res.json(JSON.parse(fs.readFileSync(FILE, "utf8")));
});

app.get("/latest", (req, res) => {
    if (!fs.existsSync(FILE)) return res.json({});
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    if (!data.length) return res.json({});
    res.json(data[data.length - 1]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});