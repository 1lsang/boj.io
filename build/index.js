#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const command_1 = require("./command");
const program = new commander_1.Command();
program
    .name('boj.io')
    .description('Baekjoon Online Judge 문제 풀이 검증 자동화 CLI')
    .version('0.1.0');
program
    .description('주어진 테스트에 대해 코드를 실행하고 결과를 확인합니다.')
    .argument('<source>', '실행할 파일 경로')
    .option('-pn, --problem-number <number>', '문제 번호')
    .action(command_1.test);
program.parse();
//# sourceMappingURL=index.js.map