const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const { create } = require("../controller/hotel");
const { requireSignin } = require("../middlewares/index");

router.post("/create-hotel", requireSignin, formidable(), create);

module.exports = router;
