const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const surveys = [
  { id: uuidv4(), details: "survey1" },
  { id: uuidv4(), details: "survey2" },
  { id: uuidv4(), details: "survey3" },
  { id: uuidv4(), details: "survey4" },
  { id: uuidv4(), details: "survey5" },
  { id: uuidv4(), details: "survey6" },
  { id: uuidv4(), details: "survey7" },
  { id: uuidv4(), details: "survey8" },
  { id: uuidv4(), details: "survey9" },
];
const employees = [
  { id: uuidv4(), name: "Aashish" },
  { id: uuidv4(), name: "Harish" },
  { id: uuidv4(), name: "Komalika" },
  { id: uuidv4(), name: "Puneet" },
  { id: uuidv4(), name: "Diksha" },
  { id: uuidv4(), name: "Radha" },
  { id: uuidv4(), name: "Yogesh" },
  { id: uuidv4(), name: "BABA" },
  { id: uuidv4(), name: "Laxman" },
];

let employeesSurveyMap = {};

app.get("/allEmployessAndSurvey", (req, res) => {
  res.json({ surveys, employees, employeesSurveyMap });
});
app.post("/surveyData", (req, res) => {
  employeesSurveyMap = req.body; // for simplicity
  console.log("output", employeesSurveyMap);
  res.json({ status: true });
});

app.listen(5000, function (err) {
  if (!err) {
    console.log("Server running at port 5000");
  }
});
