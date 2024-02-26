import fs from 'fs';
import { getProblemInfo } from '../get';
import chalk from 'chalk';
import { box, format, indent, maxLength } from '../utils/index';
export interface TestOptions {
  problemNumber?: number;
}

export default async function test(source: string, options: TestOptions) {
  const problemNumber = options.problemNumber
    ? options.problemNumber
    : source.match(/\/([^/]+)\.[^.]+$/)![1];

  const code = fs.readFileSync(source).toString().trim();
  const { inputs, outputs } = await getProblemInfo(problemNumber);
  const result: boolean[] = [];

  createTempFiles(inputs);

  const originalLog = console.log;
  const boxWidth = maxLength(...inputs, ...outputs);

  for (let i = 0; i < inputs.length; i++) {
    // 코드 실행
    console.log(`${chalk.blue('◌')} 테스트 ${i + 1}: 실행 중...`);

    const ioMessage = [
      indent(format.ul('입력값'), 2),
      indent(box(inputs[i].trim(), boxWidth), 4),
      indent(format.ul('기댓값'), 2),
      indent(box(outputs[i].trim(), boxWidth), 4),
      indent(format.ul(`실행시간: 실행중...`), 2),
      '\n',
    ].join('\n');
    const cursorLines = ioMessage.split('\n').length + 2;

    console.log(ioMessage);

    const temp: string[] = [];
    console.log = (...data: string[]) => temp.push(...data);

    const newCode = code.replace('/dev/stdin', `./tmp/input${i}.txt`);

    try {
      console.time(`tc-${i}`);
      eval(newCode);
      console.timeEnd(`tc-${i}`);
    } catch (e) {
      console.log = originalLog;
      console.log(`\x1B[${cursorLines}A\x1B[K`);
      console.log(
        format.failure(
          `${chalk.bold(`테스트 ${i + 1}`)}: ${chalk.redBright('실행 중 오류가 발생했습니다.')}`,
        ),
      );
      console.log(
        `\x1B[${cursorLines - 5}B\x1B[K${indent(format.ul(`오류 내용`), 2)}`,
      );
      console.log(chalk.red(indent(String(e), 4)));
      console.log();
      continue;
    }

    console.log = originalLog;
    // 결과 출력
    const isCorrect = temp.slice(0, -3).join('\n').trim() === outputs[i];
    result.push(isCorrect);
    console.log(`\x1B[${cursorLines}A\x1B[K`);
    console.log(
      isCorrect
        ? format.success(
            `${chalk.bold(`테스트 ${i + 1}`)}: ${chalk.green('실행한 결괏값이 기댓값과 같습니다.')}`,
          )
        : format.failure(
            `${chalk.bold(`테스트 ${i + 1}`)}: ${chalk.redBright('실행한 결괏값이 기댓값과 다릅니다.')}`,
          ),
    );
    console.log(
      `\x1B[${cursorLines - 5}B\x1B[K${indent(format.ul(`실행시간: ${temp.at(-1)}`), 2)}`,
    );

    if (!isCorrect) {
      console.log(indent(format.ul('출력값'), 2));
      console.log(indent(box(temp.slice(0, -3).join('\n'), boxWidth), 4));
    }

    console.log('\n');
  }

  console.log(
    chalk.bold(
      (result.every(Boolean) ? format.success : format.failure)(
        `테스트 결과 ${chalk.blue(result.length)}개 중 ${result.every(Boolean) ? chalk.blue(result.length) : chalk.red(result.filter(Boolean).length)}개 성공`,
      ),
    ),
    '\n',
  );

  removeTempFiles();
}

function createTempFiles(inputs: string[]) {
  if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');

  inputs.forEach((input, index) => {
    fs.writeFileSync(`./tmp/input${index}.txt`, input);
  });
}

function removeTempFiles() {
  fs.rm('tmp', { recursive: true }, (err) => {
    if (err) throw err;
  });
}
