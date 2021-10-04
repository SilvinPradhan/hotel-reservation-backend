const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const {
    create,
    read,
    hotels,
    image,
    update,
    sellerHotels,
    remove,
    userHotelBookings, isAlreadyBooked
} = require("../controller/hotel");
const {requireSignin, hotelOwner} = require("../middlewares/index");

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", read);
router.put(
    "/update-hotel/:hotelId",
    requireSignin,
    hotelOwner,
    formidable(),
    update
)
router.get("/seller-hotels/", requireSignin, sellerHotels);
// orders
router.get('/user-hotel-bookings', requireSignin, userHotelBookings)
router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked)

module.exports = router;
