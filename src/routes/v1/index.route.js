import express from "express";
import authRoute from "./auth.route.js";
import gameRoute from "./game.route.js";

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/game',
        route: gameRoute,
    },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router