"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function result(message, isSuccess) {
    const emoji = isSuccess ? chalk_1.default.green('✔') : chalk_1.default.red('✖');
    console.log(`${emoji} ${message.before || ''} ${isSuccess ? chalk_1.default.green(message.success) : chalk_1.default.red(message.failure)} ${message.after || ''}`);
}
exports.default = {
    result,
};
//# sourceMappingURL=print.js.map