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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const get_1 = require("../get");
const chalk_1 = __importDefault(require("chalk"));
const index_1 = require("../utils/index");
function test(source, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const problemNumber = options.problemNumber
            ? options.problemNumber
            : source.match(/\/([^/]+)\.[^.]+$/)[1];
        const code = fs_1.default.readFileSync(source).toString().trim();
        const { inputs, outputs } = yield (0, get_1.getProblemInfo)(problemNumber);
        const result = [];
        createTempFiles(inputs);
        const originalLog = console.log;
        const boxWidth = (0, index_1.maxLength)(...inputs, ...outputs);
        for (let i = 0; i < inputs.length; i++) {
            // 코드 실행
            console.log(`${chalk_1.default.blue('◌')} 테스트 ${i + 1}: 실행 중...`);
            const ioMessage = [
                (0, index_1.indent)(index_1.format.ul('입력값'), 2),
                (0, index_1.indent)((0, index_1.box)(inputs[i].trim(), boxWidth), 4),
                (0, index_1.indent)(index_1.format.ul('기댓값'), 2),
                (0, index_1.indent)((0, index_1.box)(outputs[i].trim(), boxWidth), 4),
                (0, index_1.indent)(index_1.format.ul(`실행시간: 실행중...`), 2),
                '\n',
            ].join('\n');
            const cursorLines = ioMessage.split('\n').length + 2;
            console.log(ioMessage);
            const temp = [];
            console.log = (...data) => temp.push(...data);
            const newCode = code.replace('/dev/stdin', `./tmp/input${i}.txt`);
            try {
                console.time(`tc-${i}`);
                (() => {
                    eval(newCode);
                })();
                console.timeEnd(`tc-${i}`);
            }
            catch (e) {
                console.log = originalLog;
                console.log(`\x1B[${cursorLines}A\x1B[K`);
                console.log(index_1.format.failure(`${chalk_1.default.bold(`테스트 ${i + 1}`)}: ${chalk_1.default.redBright('실행 중 오류가 발생했습니다.')}`));
                console.log(`\x1B[${cursorLines - 5}B\x1B[K${(0, index_1.indent)(index_1.format.ul(`오류 내용`), 2)}`);
                console.log(chalk_1.default.red((0, index_1.indent)(String(e), 4)));
                console.log();
                continue;
            }
            console.log = originalLog;
            // 결과 출력
            const isCorrect = temp.slice(0, -3).join('\n').trim() === outputs[i];
            result.push(isCorrect);
            console.log(`\x1B[${cursorLines}A\x1B[K`);
            console.log(isCorrect
                ? index_1.format.success(`${chalk_1.default.bold(`테스트 ${i + 1}`)}: ${chalk_1.default.green('실행한 결괏값이 기댓값과 같습니다.')}`)
                : index_1.format.failure(`${chalk_1.default.bold(`테스트 ${i + 1}`)}: ${chalk_1.default.redBright('실행한 결괏값이 기댓값과 다릅니다.')}`));
            console.log(`\x1B[${cursorLines - 5}B\x1B[K${(0, index_1.indent)(index_1.format.ul(`실행시간: ${temp.at(-1)}`), 2)}`);
            if (!isCorrect) {
                console.log((0, index_1.indent)(index_1.format.ul('출력값'), 2));
                console.log((0, index_1.indent)((0, index_1.box)(temp.slice(0, -3).join('\n'), boxWidth), 4));
            }
            console.log('\n');
        }
        console.log(chalk_1.default.bold((result.every(Boolean) ? index_1.format.success : index_1.format.failure)(`테스트 결과 ${chalk_1.default.blue(result.length)}개 중 ${result.every(Boolean) ? chalk_1.default.blue(result.length) : chalk_1.default.red(result.filter(Boolean).length)}개 성공`)), '\n');
        removeTempFiles();
    });
}
exports.default = test;
function createTempFiles(inputs) {
    if (!fs_1.default.existsSync('tmp'))
        fs_1.default.mkdirSync('tmp');
    inputs.forEach((input, index) => {
        fs_1.default.writeFileSync(`./tmp/input${index}.txt`, input);
    });
}
function removeTempFiles() {
    fs_1.default.rm('tmp', { recursive: true }, (err) => {
        if (err)
            throw err;
    });
}
//# sourceMappingURL=test.js.map