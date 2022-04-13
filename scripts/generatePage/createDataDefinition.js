const { writeFile } = require('fs/promises');
const { logRed } = require('./colorLogs');
const { upperCamelCase, titleize } = require('./textManipulation');

async function createDataDefinition(dirPath, pageName, fields) {
  const fileName = `${pageName}Data.ts`;
  const filePath = `${dirPath}/${fileName}`;

  const imports = [];
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
      imports.push(
        "import Range from '../../lib/Range';",
      );
    }
    return definition;
  });
  const mainSection = `export default interface ${pageName}Data {\n`
    + `${fieldsDefinition.join('\n')}\n}\n`;

  let content = imports.length === 0
    ? ''
    : `${imports.join('\n')}\n\n`;
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
