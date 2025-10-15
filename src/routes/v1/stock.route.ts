import express, { Router } from "express";
import { StocksController } from "../../controller/stocks.controller.js";

const router: Router = express.Router();

router.route("/").post(StocksController.addNewStock).get(StocksController.getAllStocks);

// router.post("/regionwise", validate(getLocationByRegion), StocksEntryController.regionWiseLocation);
// router.get("/", LocationController.getAllLocation);

// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// router.post("/login", validate(login), AuthController.login);
// router.post("/logout", validate(logout), AuthController.logout);
// router.post("/refresh-tokens", validate(refreshTokens), AuthController.refreshTokens);
// // router.post("/forgot-password", validate(forgotPassword), AuthController.forgotPassword);
// router.post("/reset-password", validate(resetPassword), AuthController.resetPassword);

export default router;
