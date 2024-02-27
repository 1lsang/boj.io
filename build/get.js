"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProblemInfo = void 0;
const cheerio_1 = require("cheerio");
const client_1 = require("./client");
function getProblemInfo(pn) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client_1.client.get(`/${pn}`);
        if (response.status !== 200)
            throw new Error('문제를 불러올 수 없습니다. 문제 번호를 확인해주세요.');
        const $ = (0, cheerio_1.load)(response.data);
        const n = $('.sampledata').length;
        const inputs = [];
        const outputs = [];
        for (let i = 1; i <= n / 2; i++) {
            inputs.push($(`#sample-input-${i}`).text().toString().trim());
            outputs.push($(`#sample-output-${i}`).text().toString().trim());
        }
        return { inputs, outputs };
    });
}
exports.getProblemInfo = getProblemInfo;
//# sourceMappingURL=get.js.map