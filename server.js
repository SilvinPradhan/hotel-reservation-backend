console.log("------- Hotel Reservation ------");
console.log("User: ", process.env.USER);

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const {readdirSync} = require("fs");
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Database connection

mongoose.connect(
    `${process.env.DATABASE2}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            return console.log(err);
        }
        console.log(`MongoDB Connected`);
    }
);

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
