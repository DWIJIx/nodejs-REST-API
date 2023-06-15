const express = require("express");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/users-schemas");
const authController = require("../../controllers/auth-controller");
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authController.register
);

router.post("/login", validateBody(schemas.loginSchema), authController.login);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
