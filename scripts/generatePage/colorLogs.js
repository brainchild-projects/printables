/* eslint-disable no-console */
import chalk from 'chalk';

export function logGreen(text) {
  console.log(chalk.green(text));
}

export function logYellow(text) {
  console.log(chalk.yellow(text));
}

export function logRed(text) {
  console.log(chalk.red(text));
}
