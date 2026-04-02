const express = require("express");
const recordsController = require("./records.controller");
const verifyToken = require("../../middleware/verify-token");

const router = express.Router();

router.post("/", verifyToken, recordsController.createRecord);
router.get("/", verifyToken, recordsController.getRecords);
router.patch("/:id", verifyToken, recordsController.updateRecord);
router.delete("/:id", verifyToken, recordsController.deleteRecord);

module.exports = router;
