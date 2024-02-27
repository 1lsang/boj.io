"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function box(input, width) {
    const maxLength = Math.max(...input.split('\n').map((line) => line.length), Math.max(width !== null && width !== void 0 ? width : 0, 24));
    const res = input
        .split('\n')
        .map((line) => '│ ' + line + ' '.repeat(maxLength - line.length) + ' │')
        .join('\n');
    return `┌─${'─'.repeat(maxLength)}─┐\n${res}\n└─${'─'.repeat(maxLength)}─┘`;
}
exports.default = box;
//# sourceMappingURL=box.js.map