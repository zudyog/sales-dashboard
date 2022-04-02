import express, { Router } from 'express';
import CustomerController from './CustomerController';

class CustomerRoute {
    private customerController: CustomerController = new CustomerController();
    public routes: Router = express.Router();
    constructor() {
        this.routes.post("/customers", this.customerController.add);
        this.routes.get('/customers', this.customerController.getAll);
        this.routes.get('/customers/:customerId', this.customerController.getById);
        this.routes.put('/customers/:customerId', this.customerController.update);
        this.routes.delete('/customers/:customerId', this.customerController.delete);
    }
}
export default new CustomerRoute().routes;
