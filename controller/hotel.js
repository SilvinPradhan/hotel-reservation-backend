const Hotel = require("../models/hotel");
const fs = require("fs");

exports.create = async (req, res) => {
  //   console.log("request fields", req.fields);
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    // handle image - read the entire file before saving to the db (asynchronously)
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel err", err);
        res.status(400).send("Error saving hotel in the db");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};
