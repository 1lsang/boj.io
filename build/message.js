"use strict";
class Message extends String {
    constructor(message) {
        this.message = super(message);
    }
    indent(width) {
        return this.text
            .split('\n')
            .map((line) => ' '.repeat(width) + line)
            .join('\n');
    }
}
//# sourceMappingURL=message.js.map