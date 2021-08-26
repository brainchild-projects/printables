export interface ReplaceParam {
  prefix: string;
  suffix: string;
  replacement: string;
}

function replaceWithDelimeter(
  subject: string,
  { prefix, suffix, replacement }: ReplaceParam,
): string {
  const prefixIndex = subject.indexOf(prefix);
  const suffixIndex = subject.indexOf(suffix);
  if (prefixIndex > -1 && suffixIndex > -1) {
    const before = subject.substr(0, prefixIndex + prefix.length);
    const after = subject.substr(suffixIndex);
    return before + replacement + after;
  }
  return subject;
}

export default replaceWithDelimeter;
