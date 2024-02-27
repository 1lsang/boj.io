"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indent(str, width) {
    return str
        .split('\n')
        .map((line) => ' '.repeat(width) + line)
        .join('\n');
}
exports.default = indent;
//# sourceMappingURL=indent.js.map