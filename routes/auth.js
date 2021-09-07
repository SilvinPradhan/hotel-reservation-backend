import express from "express";

const router = express.Router();
const { showMessage } = require("../controller/showMessage");

router.get("/:message", showMessage);

module.exports = router;
