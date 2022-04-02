"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CustomerController_1 = __importDefault(require("./CustomerController"));
var CustomerRoute = /** @class */ (function () {
    function CustomerRoute() {
        this.customerController = new CustomerController_1.default();
        this.routes = express_1.default.Router();
        this.routes.post("/customers", this.customerController.add);
        this.routes.get('/customers', this.customerController.getAll);
        this.routes.get('/customers/:customerId', this.customerController.getById);
        this.routes.put('/customers/:customerId', this.customerController.update);
        this.routes.delete('/customers/:customerId', this.customerController.delete);
    }
    return CustomerRoute;
}());
exports.default = new CustomerRoute().routes;
//# sourceMappingURL=CustomerRoute.js.map