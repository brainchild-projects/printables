/* eslint-disable no-console */
const chalk = require('chalk');

function logGreen(text) {
  console.log(chalk.green(text));
}
exports.logGreen = logGreen;
function logYellow(text) {
  console.log(chalk.yellow(text));
}
exports.logYellow = logYellow;
function logRed(text) {
  console.log(chalk.red(text));
}
exports.logRed = logRed;
