"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
var mongoose_1 = require("mongoose");
var BaseSchema = /** @class */ (function (_super) {
    __extends(BaseSchema, _super);
    function BaseSchema(sche) {
        var _this = _super.call(this, sche) || this;
        _this.set('toJSON', {
            getters: true,
            virtuals: true,
            transform: function (doc, converted) {
                delete converted._id;
            }
        });
        return _this;
    }
    return BaseSchema;
}(mongoose_1.Schema));
var CustomersSchema = new BaseSchema({
    // id: { type: String },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
});
CustomersSchema.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: function (_doc, converted) {
        delete converted._id;
    }
});
exports.CustomerModel = (0, mongoose_1.model)('Customers', CustomersSchema);
//# sourceMappingURL=CustomerModel.js.map