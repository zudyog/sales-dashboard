"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var AppRoutes_1 = __importDefault(require("./AppRoutes"));
var mongoose_1 = __importDefault(require("mongoose"));
var ErrorHandler_1 = require("./utils/ErrorHandler");
var App = /** @class */ (function () {
    function App() {
        this.contentTypeValidation = function (req, res, next) {
            var contentType = req.headers['content-type'];
            if (!contentType || contentType.indexOf('application/json') !== 0)
                return res.sendStatus(415);
            next();
        };
        this.acceptHeaderValidation = function (req, res, next) {
            var contentType = req.headers['accept'];
            if (!contentType || contentType.indexOf('application/json') !== 0)
                return res.sendStatus(406);
            next();
        };
        this.dbConnection = function () {
            mongoose_1.default.connect('mongodb://127.0.0.1:27017/salesdb', function (error) {
                if (error) {
                    console.log(error);
                }
            });
        };
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        // this.app.use(this.contentTypeValidation);
        // this.app.use(this.acceptHeaderValidation);
        this.app.use('/api', AppRoutes_1.default);
        this.dbConnection();
        this.app.use(ErrorHandler_1.logging);
        this.app.use(ErrorHandler_1.clientErrorHandler);
        this.app.use(ErrorHandler_1.errorHandler);
    }
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=App.js.map