const Hotel = require("../models/hotel");
const Order = require("models/order")
const fs = require("fs");
const {remove} = require("./hotel");

exports.create = async (req, res) => {
    //   console.log("request fields", req.fields);
    try {
        let fields = req.fields;
        let files = req.files;

        console.log(fields);
        console.log(files);

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        // handle image - read the entire file before saving to the db (asynchronously)
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        hotel.save((err, result) => {
            if (err) {
                console.log("Saving Hotel Error", err);
                res.status(400).send("Error saving hotel data in the database.");
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

exports.read = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId)
        .populate("postedBy", '_id name')
        .select("-image.data")
        .exec();
    console.log("Single Hotel Information Page", hotel);
    res.json(hotel);
};

exports.hotels = async (req, res) => {
    let all = await Hotel.find({from: {$gte: new Date()}})
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
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    res.send(all);
};

exports.remove = async (req, res) => {
    let deleted = await Hotel.findByIdAndDelete(req.params.hotelId)
        .select("-image.data")
        .exec();
    res.json(deleted);
};

exports.update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        let data = {...fields};

        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            data.image = image;
            console.log(image);
        }

        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
            new: true,
        }).select("-image.data");

        console.log(updated);
        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(400).send("Hotel update failed. try again.");
    }
}

exports.userHotelBookings = async (req, res) => {
    const allBookings = await Order.find({orderedBy: req.user._id})
        .select('session')
        .populate('hotel', '-image.data')
        .populate('orderedBy', '_id name')
        .exec()
    res.json(allBookings)
}

exports.isAlreadyBooked = async (req, res) => {
    const {hotelId} = req.params;
    // find orders of the currently logged in user
    const userOrders = await Order.find({orderedBy: req.user._id})
        .select('hotel')
        .exec();
    // check if hotel id is found in userOrders array
    let ids = []
    for (let i = 0; i < userOrders.length; i++) {
        ids.push(userOrders[i].toString())
    }
    res.json({
        ok: ids.includes(hotelId)
    })

}
