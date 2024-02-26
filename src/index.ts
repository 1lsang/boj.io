#! /usr/bin/env node

import { Command } from 'commander';
import { test } from './command';

const program = new Command();

program
  .name('boj.io')
  .description('Baekjoon Online Judge 문제 풀이 검증 자동화 CLI')
  .version('0.1.0');

program
  .command('test')
  .description('주어진 테스트에 대해 코드를 실행하고 결과를 확인합니다.')
  .argument('<source>', '실행할 파일 경로')
  .option('-pn, --problem-number <number>', '문제 번호')
  .action(test);

program.parse();
