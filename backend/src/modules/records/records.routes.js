const express = require("express");
const recordsController = require("./records.controller");
const verifyToken = require("../../middleware/verify-token");
const authorizeRoles = require("../../middleware/authorize-roles");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  recordsController.createRecord
);
router.get(
  "/",
  verifyToken,
  authorizeRoles("analyst", "admin"),
  recordsController.getRecords
);
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  recordsController.updateRecord
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  recordsController.deleteRecord
);

module.exports = router;
