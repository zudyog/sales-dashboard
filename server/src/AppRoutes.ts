import express, { Router } from 'express';
import customerRoute from './modules/customer/CustomerRoute';

class AppRoutes {
    public routes: Router = express.Router();
    constructor() {
        this.routes.use("/", customerRoute);
    };
}

export default new AppRoutes().routes;