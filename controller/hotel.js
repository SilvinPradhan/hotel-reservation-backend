const Hotel = require("../models/hotel");
const fs = require("fs");
const {remove} = require("./hotel");

exports.create = async (req, res) => {
    //   console.log("request fields", req.fields);
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
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

exports.hotels = async (req, res) => {
    let all = await Hotel.find({})
        .limit(12)
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    console.log(all);
    res.json(all);
};

exports.image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set("Content-Type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
};

exports.sellerHotels = async (req, res) => {
    let all = await Hotel.find({postedBy: req.user._id})
        .select('-image.data')
        .populate('postedBy', '_id name')
        .exec()
    res.send(all)
}

exports.remove = async (req, res) => {
    let deleted = await Hotel.findByIdAndDelete(req.params.hotelId)
        .select("-image.data")
        .exec()
    res.json(deleted)
}
