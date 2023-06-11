const express = require("express");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/users-schemas");
const userController = require("../../controllers/auth-controller");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  userController.register
);

router.post("/login", validateBody(schemas.loginSchema), userController.login);

module.exports = router;
