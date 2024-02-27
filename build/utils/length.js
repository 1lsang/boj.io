"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLength = void 0;
function maxLength(...strings) {
    let length = 0;
    strings.forEach((str) => str.split('\n').forEach((line) => {
        if (line.length > length)
            length = line.length;
    }));
    return length;
}
exports.maxLength = maxLength;
//# sourceMappingURL=length.js.map