console.log("------- Hotel Reservation ------");
console.log("User: ", process.env.USERNAME);

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");

if (process.env.NODE_ENV === "development") require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes middleware
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

// Execute
const port = process.env.PORT || 8000;
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server listening at http://localhost:${port}`);
});
