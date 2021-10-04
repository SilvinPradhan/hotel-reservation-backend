const express = require("express");
const router = express.Router();
const {createConnectAccount} = require("../controller/stripe");
const {requireSignin} = require("../middlewares");

router.post("/create-connect-account", requireSignin, createConnectAccount);

module.exports = router;
