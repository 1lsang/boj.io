"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function success(message) {
    return `${chalk_1.default.green('✔')} ${message}`;
}
function failure(message) {
    return `${chalk_1.default.red('✖')} ${message}`;
}
function ul(message) {
    return `• ${message}`;
}
const format = {
    success,
    failure,
    ul,
};
exports.default = format;
//# sourceMappingURL=format.js.map