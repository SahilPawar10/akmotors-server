import express, { Router } from "express";
import validate from "../../middleware/validate.js";
import {
  forgotPassword,
  login,
  logout,
  refreshTokens,
  register,
  resetPassword,
} from "../../validator/auth.validator.js";
import { AuthController } from "../../controller/auth.controller.js";

const router: Router = express.Router();

router.post("/register", validate(register), AuthController.register);
router.post("/login", validate(login), AuthController.login);
router.post("/logout", validate(logout), AuthController.logout);
router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
router.post("/forgot-password", validate(forgotPassword), AuthController.forgotPassword);
router.post("/reset-password", validate(resetPassword), AuthController.resetPassword);

export default router;
