import chalk from 'chalk';

function success(message: string) {
  return `${chalk.green('✔')} ${message}`;
}

function failure(message: string) {
  return `${chalk.red('✖')} ${message}`;
}

function ul(message: string) {
  return `• ${message}`;
}

const format = {
  success,
  failure,
  ul,
};

export default format;
