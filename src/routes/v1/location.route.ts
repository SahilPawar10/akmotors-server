import express, { Router } from "express";
import { LocationController } from "../../controller/location.controller.js";
import validate from "../../middleware/validate.js";
import { addLocationSchema, getLocationByRegion } from "../../validator/location.validator.js";

const router: Router = express.Router();

router
  .route("/")
  .post(validate(addLocationSchema), LocationController.addLocation)
  .get(LocationController.getAllLocation);

router.post("/regionwise", validate(getLocationByRegion), LocationController.regionWiseLocation);
// router.get("/", LocationController.getAllLocation);

// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// router.post("/login", validate(login), AuthController.login);
// router.post("/logout", validate(logout), AuthController.logout);
// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// // router.post("/forgot-password", validate(forgotPassword), AuthController.forgotPassword);
// router.post("/reset-password", validate(resetPassword), AuthController.resetPassword);

export default router;
