const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const PasswordResetController = require("../controllers/PasswordResetController");
const { rateLimit } = require("express-rate-limit");

const MemoryStore = rateLimit.MemoryStore;

const store = new MemoryStore();

const loginLimiter = rateLimit({
  store: store,
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: "Too many failed login attempts, please try again after 15 minutes.",
});

router.post("/login", loginLimiter, AuthController.login);
router.post("/login-session", loginLimiter, AuthController.loginWihSession);

router.post("/register", AuthController.register);
router.post("/refreshToken", AuthController.refreshTokenHandler);

router.post("/logout-session", AuthController.logoutWithSession);

router.post(
  "/request-password-reset",
  PasswordResetController.requestPasswordReset
);

router.post(
  "/reset-password/:resetToken",
  PasswordResetController.resetPassword
);

module.exports = router;
