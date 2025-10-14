import express, { Router } from "express";
import validate from "../../middleware/validate.js";
import { addVehicleSchema, getVehicalByLocation } from "../../validator/vehical.validation.js";
import { VehicleController } from "../../controller/vehicle.controller.js";

const router: Router = express.Router();

router
  .route("/")
  .post(validate(addVehicleSchema), VehicleController.addVehicle)
  .get(VehicleController.getAllVehicle);

router.post("/regionwise", validate(getVehicalByLocation), VehicleController.locationWiseVehicle);
// router.get("/", LocationController.getAllLocation);

// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// router.post("/login", validate(login), AuthController.login);
// router.post("/logout", validate(logout), AuthController.logout);
// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// // router.post("/forgot-password", validate(forgotPassword), AuthController.forgotPassword);
// router.post("/reset-password", validate(resetPassword), AuthController.resetPassword);

export default router;
