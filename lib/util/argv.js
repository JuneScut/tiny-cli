"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgvMap = void 0;
var getArgvMap = function () {
    var argvs = process.argv;
    var m = new Map();
    for (var _i = 0, argvs_1 = argvs; _i < argvs_1.length; _i++) {
        var item = argvs_1[_i];
        var _a = item.split("="), key = _a[0], v = _a[1];
        m.set(key, v);
    }
    return m;
};
exports.getArgvMap = getArgvMap;
