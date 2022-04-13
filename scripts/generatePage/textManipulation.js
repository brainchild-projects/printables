function lowerCamelCase(text) {
  return `${text[0].toLocaleLowerCase()}${text.substr(1)}`;
}

function upperCamelCase(text) {
  return `${text[0].toLocaleUpperCase()}${text.substr(1)}`;
}

function titleize(text) {
  return upperCamelCase(text.match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1).join(' '));
}

function dashed(text) {
  return upperCamelCase(text.match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1).join('-')).toLocaleLowerCase();
}

exports.lowerCamelCase = lowerCamelCase;
exports.upperCamelCase = upperCamelCase;
exports.titleize = titleize;
exports.dashed = dashed;
