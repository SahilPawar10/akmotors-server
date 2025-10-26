import express, { Router } from "express";
import authRoute from "./auth.route";
import locationRoute from "./location.route";
import vehicleRoute from "./vehicle.route";
import serviceRoute from "./service.route";
import stockRoute from "./stocks.route";
import stockEntryRoute from "./stockEntry.route";

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
