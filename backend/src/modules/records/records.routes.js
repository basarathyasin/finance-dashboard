const express = require("express");
const recordsController = require("./records.controller");

const router = express.Router();

router.get("/status", recordsController.getRecordsStatus);

module.exports = router;
