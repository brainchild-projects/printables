const replaceRegexp = /[\s_-]/g;
const splitRegexp = /(?=[A-Z])/;
function joinWords(newString: string, word: string) {
  return `${newString + word.charAt(0).toUpperCase() + word.slice(1)} `;
}

export default function titleize(str: string) {
  const newStr = str
    .replace(replaceRegexp, ' ')
    .split(splitRegexp)
    .join(' ')
    .split(' ');

  return newStr.reduce(joinWords, '').trim();
}
