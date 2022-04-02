"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./src/App"));
var AppConstants_1 = __importDefault(require("./src/utils/AppConstants"));
App_1.default.get("/", function (_req, res) {
    res.send("App is running");
});
App_1.default.listen(AppConstants_1.default.PORT, function () {
    console.log("App is running on http://localhost:".concat(AppConstants_1.default.PORT));
});
//# sourceMappingURL=Server.js.map