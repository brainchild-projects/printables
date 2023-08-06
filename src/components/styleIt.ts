import hash from 'crypto-js/md5';

type ClassNames = string;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyRecord<T> extends Record<ClassNames, T> {}

// TODO: This is a hack to get around the fact that TypeScript doesn't support recursive types
type BasicStyleProp = string | number;
export type StyleProps = MyRecord<StyleProps> | BasicStyleProp;
export type StyleRecords = Record<ClassNames, StyleProps>;
export type StyleDefinitionsFunc<T extends StyleRecords> = () => T;
export type StyleDefinitionCallback = (key: string, declarations: StyleRecords) => string;
type ClassNamesFunc<T extends StyleRecords> = () => Record<keyof T, string>;

function generateClassName(suffix: string, className: string): string {
  return `${className}-${suffix}`;
}

function generateClassNames<T extends StyleRecords>(suffix: string, styleDefs: T): Record<keyof T, string> {
  const classNames: Record<keyof T, string> = {} as Record<keyof T, string>;
  Object.keys(styleDefs).forEach((definitionIdentifier) => {
    classNames[definitionIdentifier as keyof T] = generateClassName(suffix, definitionIdentifier);
  });
  return classNames;
}

function generateSuffix<T extends StyleRecords>(styleDef: T): string {
  return hash(JSON.stringify(styleDef)).toString().substring(0, 8);
}

function generateSelectorWithParent(value: string, parentSelector: string): string {
  if (value.includes('&')) {
    return value.replaceAll('&', parentSelector);
  }
  if (value.includes(',')) {
    return value.split(',').map((v) => `${parentSelector} ${v.trim()}`).join(',');
  }
  return `${parentSelector} ${value}`;
}

export function generateSelector(value: string, classNames: Record<ClassNames, string>, parentSelector?: string): string {
  if (parentSelector) {
    return generateSelectorWithParent(value, parentSelector);
  }
  return classNames[value] ? `.${classNames[value]}` : value;
}

function propertize(property: string): string {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function generateStyleDeclaration(property: string, value: string | number): string {
  const valueString = typeof value === 'number' ? `${value}px` : value;
  return `${propertize(property)}:${valueString};`;
}

function isBasicStyleProp(value: unknown): value is BasicStyleProp {
  return typeof value === 'string' || typeof value === 'number';
}

function isStyleRecord(value: unknown): value is StyleRecords {
  return value !== undefined && typeof value === 'object' && value !== null && !Array.isArray(value);
}

function generateDeclarationBlocksOnBlocks<T extends StyleProps>(declarations: T, callback?: StyleDefinitionCallback): string {
  const entries = Object.entries(declarations);
  let declarationBlock = '{';
  let callbackOutput = '';
  for (const [key, value] of entries) {
    if (isBasicStyleProp(value)) {
      declarationBlock += generateStyleDeclaration(key, value);
    } else if (callback && isStyleRecord(value)) {
      callbackOutput = callback(key, value);
    }
  }
  return `${declarationBlock}}${callbackOutput}`;
}

export function generateDeclarationBlocks<T extends StyleProps>(declarations: T, callback?: StyleDefinitionCallback): string {
  if (typeof declarations === 'string' || typeof declarations === 'number') {
    return declarations as string;
  }
  return generateDeclarationBlocksOnBlocks(declarations, callback);
}

function generateStyleContentInternal(styleKey: string, styleDefs: StyleRecords, classNames: Record<ClassNames, string>, parentSelector?: string): string {
  const selector = generateSelector(styleKey, classNames, parentSelector);
  return `${selector}${generateDeclarationBlocks(styleDefs, (key, innerStyleDefs) =>
    `\n${generateStyleContentInternal(key, innerStyleDefs, classNames, selector)}`,
  )}`;
}

function generateStyleContent(styleDefs: StyleRecords, classNames: Record<ClassNames, string>): string {
  const styleContent: string[] = [];
  const styleKeys = Object.keys(styleDefs);
  for (const styleKey of styleKeys) {
    const styleDef = styleDefs[styleKey];
    if (isStyleRecord(styleDef)) {
      styleContent.push(generateStyleContentInternal(styleKey, styleDef, classNames));
    }
  }
  return styleContent.join('\n').trim();
}

function styleIt<T extends StyleRecords>(styleFunc: StyleDefinitionsFunc<T>): ClassNamesFunc<T> {
  const styleDefs = styleFunc();
  const suffix = generateSuffix(styleDefs);
  const classNames = generateClassNames(suffix, styleDefs);
  const styleElement = document.createElement('style');

  styleElement.textContent = generateStyleContent(styleDefs, classNames);
  document.head.appendChild(styleElement);

  return () => classNames;
}

export default styleIt;
