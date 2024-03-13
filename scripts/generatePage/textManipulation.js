const replaceRegexp = /[\s_-]/g;
const splitRegexp = /(?=[A-Z])/;

function joinWords(newString, word) {
  return `${newString + word.charAt(0).toUpperCase() + word.slice(1)} `;
}

export function titleize(str) {
  const newStr = str
    .replace(replaceRegexp, ' ')
    .split(splitRegexp)
    .join(' ')
    .split(' ');

  return newStr.reduce(joinWords, '').trim();
}

export function lowerCamelCase(text) {
  return `${text[0].toLocaleLowerCase()}${text.substr(1)}`;
}

export function upperCamelCase(text) {
  return `${text[0].toLocaleUpperCase()}${text.substr(1)}`;
}

export function dashed(text) {
  return upperCamelCase(text.match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1).join('-')).toLocaleLowerCase();
}
