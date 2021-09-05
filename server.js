console.log("------- Hotel Reservation ------");
console.log("User: ", process.env.USERNAME);

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");

if (process.env.NODE_ENV === "development") require("dotenv").config();

const app = express();

// Middleware
app.use("/api", authRouter);
// Routes
// app.get("/api/:message", (req, res) => {
//   res.status(200).send(req.params.message);
// });

// Execute
const port = process.env.PORT || 8000;
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server listening at http://localhost:${port}`);
});
