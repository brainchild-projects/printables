const replaceRegexp = /[\s_-]/g;
const splitRegexp = /(?=[A-Z])/;
function joinWords(newString, word) {
  return `${newString + word.charAt(0).toUpperCase() + word.slice(1)} `;
}

function titleize(str) {
  const newStr = str
    .replace(replaceRegexp, ' ')
    .split(splitRegexp)
    .join(' ')
    .split(' ');

  return newStr.reduce(joinWords, '').trim();
}

function lowerCamelCase(text) {
  return `${text[0].toLocaleLowerCase()}${text.substr(1)}`;
}

function upperCamelCase(text) {
  return `${text[0].toLocaleUpperCase()}${text.substr(1)}`;
}

function dashed(text) {
  return upperCamelCase(text.match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1).join('-')).toLocaleLowerCase();
}

exports.lowerCamelCase = lowerCamelCase;
exports.upperCamelCase = upperCamelCase;
exports.titleize = titleize;
exports.dashed = dashed;
