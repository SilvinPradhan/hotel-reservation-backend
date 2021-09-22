const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const {create, hotels, image, sellerHotels} = require("../controller/hotel");
const {requireSignin} = require("../middlewares/index");

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image)

router.get("/seller-hotels/", requireSignin, sellerHotels);

module.exports = router;
