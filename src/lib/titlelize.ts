const replaceRegexp = /[\s_-]/g;
const splitRegexp = /(?=[A-Z])/;
const innerWordsNoCap = new Set([
  'and', 'the', 'to', 'in', 'an', 'a',
]);

function joinWords(newString: string, word: string) {
  if (newString !== '' && innerWordsNoCap.has(word.toLowerCase())) {
    return `${newString}${word.toLowerCase()} `;
  }
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
