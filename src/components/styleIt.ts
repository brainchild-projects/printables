import hash from 'crypto-js/md5';

type ClassNames = string;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyRecord<T> extends Record<ClassNames, T> {}
export type StyleProps = MyRecord<StyleProps> | string | number;
export type StyleRecords = Record<ClassNames, StyleProps>;
export type StyleDefinitionsFunc<T extends StyleRecords> = () => T;
export type StyleDefinitionCallback = (key: string, declarations: StyleRecords) => void;
type ClassNamesFunc<T extends StyleRecords> = () => Record<keyof T, string>;

// const stylesCache = new Map<string, Record<ClassNames, string>>();
// const classNamesSet = new Map<ClassNames, string>();

function generateClassName(suffix: string, className: string, def: StyleProps): string {
  const style = typeof def === 'object' ? JSON.stringify(def) : def;
  const classNameHash = hash(`${className}${style}`).toString().substring(0, 8);
  return `${className}-${classNameHash}-${suffix}`;
}

function generateClassNames<T extends StyleRecords>(suffix: string, styleDefs: T): Record<keyof T, string> {
  const classNames: Record<keyof T, string> = {} as Record<keyof T, string>;
  Object.keys(styleDefs).forEach((definitionIdentifier) => {
    classNames[definitionIdentifier as keyof T] = generateClassName(suffix, definitionIdentifier, styleDefs[definitionIdentifier]);
  });
  return classNames;
}

function generateSuffix<T extends StyleRecords>(styleDef: T): string {
  return hash(JSON.stringify(styleDef)).toString().substring(0, 8);
}

function styleIt<T extends StyleRecords>(styleFunc: StyleDefinitionsFunc<T>): ClassNamesFunc<T> {
  const styleDefs = styleFunc();
  const suffix = generateSuffix(styleDefs);

  const generatedClassNames = generateClassNames(suffix, styleDefs);

  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);

  return () => generatedClassNames;
}

function propertize(property: string): string {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function generateStyleDeclaration(property: string, value: string | number): string {
  const valueString = typeof value === 'number' ? `${value}px` : value;
  return `${propertize(property)}:${valueString};`;
}

export function generateDeclarationBlocks<T extends StyleProps>(declarations: T, callback: StyleDefinitionCallback): string {
  const entries = Object.entries(declarations);
  let declarationBlock = '{';
  for (const [key, value] of entries) {
    if (typeof value === 'string' || typeof value === 'number') {
      declarationBlock += generateStyleDeclaration(key, value);
    } else {
      callback(key, value as StyleRecords);
    }
  }
  return `${declarationBlock}}`;
}

export default styleIt;
