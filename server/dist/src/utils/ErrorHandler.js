"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.clientErrorHandler = exports.logging = void 0;
var logging = function (error, _req, _res, next) {
    console.log("logging", error);
    next(error);
};
exports.logging = logging;
var clientErrorHandler = function (error, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: "Unable to process request, please try after some time" });
    }
    else {
        next(error);
    }
};
exports.clientErrorHandler = clientErrorHandler;
var errorHandler = function (error, _req, res, next) {
    res.status((error === null || error === void 0 ? void 0 : error.StatusCode) || 500).send(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map