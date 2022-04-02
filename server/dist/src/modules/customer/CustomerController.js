"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../../utils/Constants");
var CustomerModel_1 = require("./CustomerModel");
var mongoose_1 = __importDefault(require("mongoose"));
var CustomerController = /** @class */ (function () {
    function CustomerController() {
        var _this = this;
        this.add = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var newTask, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTask = new CustomerModel_1.CustomerModel(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, newTask.save()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(201).send({
                                data: result.toJSON(),
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, next({
                                success: false,
                                message: error_1.message,
                                StatusCode: 400
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, page, perPage, sortOrder, pageSize, pageNumber, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, page = _a.page, perPage = _a.perPage, sortOrder = _a.sortOrder;
                        pageSize = parseInt(perPage) || 5;
                        pageNumber = parseInt(page) || 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, CustomerModel_1.CustomerModel.find().limit(pageSize || 5).skip(pageSize * pageNumber).sort({ firstName: sortOrder })];
                    case 2:
                        result = _b.sent();
                        if (result.length === 0) {
                            return [2 /*return*/, res.sendStatus(404)];
                        }
                        return [2 /*return*/, res.status(200).send({
                                data: result
                            })];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, next({
                                success: false,
                                message: error_2.message,
                                StatusCode: 400
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customerId = req.params.customerId;
                        if (!mongoose_1.default.isValidObjectId(customerId)) {
                            return [2 /*return*/, next({
                                    success: false,
                                    message: "Please Send Validate Customer ID",
                                    StatusCode: 400
                                })];
                        }
                        return [4 /*yield*/, CustomerModel_1.CustomerModel.find({ _id: customerId })];
                    case 1:
                        result = _a.sent();
                        if (typeof result !== 'undefined' && result.length === 0) {
                            res.sendStatus(404);
                        }
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: Constants_1.CustomerConstants.FETCH_CUSTOMER_SUCCESS,
                                data: result
                            })];
                }
            });
        }); };
        this.update = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customerId = req.params.customerId;
                        if (!mongoose_1.default.isValidObjectId(customerId)) {
                            return [2 /*return*/, next({
                                    success: false,
                                    message: "Please Send Validate Customer ID",
                                    StatusCode: 400
                                })];
                        }
                        return [4 /*yield*/, CustomerModel_1.CustomerModel.findOneAndUpdate({
                                _id: customerId
                            }, req.body, { new: true })];
                    case 1:
                        result = _a.sent();
                        if (result === null) {
                            return [2 /*return*/, next({
                                    success: false,
                                    message: "Customer Not exists with ID: ".concat(customerId),
                                    StatusCode: 400
                                })];
                        }
                        return [2 /*return*/, res.status(200).send({
                                success: true,
                                message: Constants_1.CustomerConstants.UPDATE_CUSTOMER_SUCCESS,
                                data: result,
                                StatusCode: 200
                            })];
                }
            });
        }); };
        this.delete = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var customerId, customer, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        customerId = req.params.customerId;
                        if (!mongoose_1.default.isValidObjectId(customerId)) {
                            return [2 /*return*/, next({
                                    success: false,
                                    message: "Not A Valid Customer Id: ".concat(customerId),
                                    StatusCode: 400
                                })];
                        }
                        return [4 /*yield*/, CustomerModel_1.CustomerModel.findById({ _id: customerId })];
                    case 1:
                        customer = _a.sent();
                        if (customer === null) {
                            return [2 /*return*/, res.sendStatus(404)];
                        }
                        return [4 /*yield*/, CustomerModel_1.CustomerModel.deleteOne({ _id: customerId })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(204)];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, next(error_3)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return CustomerController;
}());
exports.default = CustomerController;
//# sourceMappingURL=CustomerController.js.map