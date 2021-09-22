const Hotel = require("../models/hotel")
const expressJWT = require("express-jwt");

//req.user
exports.requireSignin = expressJWT({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: ["HS256"],
});

exports.hotelOwner = async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    let owner = hotel.postedBy._id.toString() === req.user._id.toString();
    if (!owner) {
        return res.status(403).send("Unauthorized")
    }
    next()
}
