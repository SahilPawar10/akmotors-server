import express, { Router } from "express";
import authRoute from "./auth.route.js";

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
  //   {
  //     path: "/users",
  //     route: userRoute,
  //   },
  //   {
  //     path: "/visitor",
  //     route: visitorRoute,
  //   },
  //   {
  //     path: "/chat",
  //     route: messageRoute,
  //   },
  //   {
  //     path: "/loan",
  //     route: loanRoutes,
  //   },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
