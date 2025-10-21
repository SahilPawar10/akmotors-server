import express, { Router } from "express";
import authRoute from "./auth.route.js";
import locationRoute from "./location.route.js";
import vehicleRoute from "./vehicle.route.js";
import serviceRoute from "./service.route.js";
import stockRoute from "./stocks.route.js";
import stockEntryRoute from "./stockEntry.route.js";

const router: Router = express.Router();

interface RouteConfig {
  path: string;
  route: Router;
}

const defaultRoutes: RouteConfig[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/location",
    route: locationRoute,
  },
  {
    path: "/vehicle",
    route: vehicleRoute,
  },
  {
    path: "/service",
    route: serviceRoute,
  },
  {
    path: "/stocks",
    route: stockRoute,
  },
  {
    path: "/stock-entry",
    route: stockEntryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
