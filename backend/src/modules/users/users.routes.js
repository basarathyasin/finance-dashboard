const express = require("express");
const usersController = require("./users.controller");
const verifyToken = require("../../middleware/verify-token");
const authorizeRoles = require("../../middleware/authorize-roles");

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("admin"), usersController.createUser);
router.get("/", verifyToken, authorizeRoles("admin"), usersController.getUsers);
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  usersController.updateUser
);

module.exports = router;
