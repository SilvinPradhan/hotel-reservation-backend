const express = require("express");
const router = express.Router();
const { showMessage, register } = require("../controller/auth");

router.get("/:message", showMessage);
router.post("/register", register);

module.exports = router;
