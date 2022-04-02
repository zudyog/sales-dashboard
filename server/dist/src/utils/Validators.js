"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpecialChars = exports.validateGUID = void 0;
var validateGUID = function (guid) {
    var validate = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    if (!validate.test(guid)) {
        return false;
    }
    return true;
};
exports.validateGUID = validateGUID;
var checkSpecialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
exports.checkSpecialChars = checkSpecialChars;
//# sourceMappingURL=Validators.js.map