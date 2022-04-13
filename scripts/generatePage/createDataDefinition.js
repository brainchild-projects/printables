const { writeFile } = require('fs/promises');
const { logRed } = require('./colorLogs');
const { upperCamelCase, titleize } = require('./textManipulation');
const ImportMap = require('./ImportMap');

async function createDataDefinition(dirPath, pageName, fields) {
  const fileName = `${pageName}Data.ts`;
  const filePath = `${dirPath}/${fileName}`;

  const imports = new ImportMap([]);
  const headDefinitions = [];
  const fieldsDefinition = fields.map(({ fieldName, fieldType, choices }) => {
    const theType = fieldType === 'Select'
      ? upperCamelCase(fieldName)
      : fieldType;
    const definition = `  ${fieldName}: ${theType};`;
    if (fieldType === 'Select') {
      const options = choices
        .map((val) => `'${val}'`)
        .join(' | ');
      const optionsArray = choices
        .map((val) => `  ['${val}', '${titleize(val)}']`)
        .join(',\n');
      headDefinitions.push(
        `export type ${upperCamelCase(fieldName)} = ${options};`,
      );
      headDefinitions.push(
        `export const ${fieldName}Options = new Map([\n${optionsArray},\n]);`,
      );
    }
    if (fieldType === 'Range') {
      imports.addImportDefault(
        '../../lib/Range',
        'Range',
      );
    }
    return definition;
  });
  const mainSection = `export default interface ${pageName}Data {\n`
    + `${fieldsDefinition.join('\n')}\n}\n`;

  let content = imports.size === 0
    ? ''
    : `${imports.asImportStatements()}\n\n`;
  content += headDefinitions.length === 0
    ? mainSection
    : `${headDefinitions.join('\n')}\n\n${mainSection}`;

  await writeFile(filePath, content, (err) => {
    if (err !== null) {
      logRed(err);
    }
  });
  return filePath;
}

exports.createDataDefinition = createDataDefinition;
