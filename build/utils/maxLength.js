"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function maxLength(...strings) {
    let length = 0;
    strings.forEach((str) => str.split('\n').forEach((line) => {
        if (line.length > length)
            length = line.length;
    }));
    return length;
}
exports.default = maxLength;
//# sourceMappingURL=maxLength.js.map