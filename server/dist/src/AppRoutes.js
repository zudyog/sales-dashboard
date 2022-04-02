"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CustomerRoute_1 = __importDefault(require("./modules/customer/CustomerRoute"));
var AppRoutes = /** @class */ (function () {
    function AppRoutes() {
        this.routes = express_1.default.Router();
        this.routes.use("/", CustomerRoute_1.default);
    }
    ;
    return AppRoutes;
}());
exports.default = new AppRoutes().routes;
//# sourceMappingURL=AppRoutes.js.map