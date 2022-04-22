const { writeFile } = require('fs/promises');
const { logRed } = require('./colorLogs');
const { upperCamelCase, titleize } = require('./textManipulation');
const ImportMap = require('./ImportMap');

function createOptions(choices) {
  return choices
    .map((val) => `'${val}'`)
    .join(' | ');
}

function createOptionsArray(choices) {
  return choices
    .map((val) => `  ['${val}', '${titleize(val)}']`)
    .join(',\n');
}

function selectHeadDefinitions(fieldName, choices) {
  const headDefinitions = [];
  const options = createOptions(choices);
  const optionsArray = createOptionsArray(choices);
  headDefinitions.push(
    `export type ${upperCamelCase(fieldName)} = ${options};`,
  );
  headDefinitions.push(
    `export const ${fieldName}Options = new Map([\n${optionsArray},\n]);`,
  );
  return headDefinitions;
}

function defineFields(fields) {
  const imports = new ImportMap([]);
  const headDefinitions = [];
  const fieldsDefinition = fields.map(({ fieldName, fieldType, choices }) => {
    const theType = fieldType === 'Select'
      ? upperCamelCase(fieldName)
      : fieldType;
    const definition = `  ${fieldName}: ${theType};`;
    if (fieldType === 'Select') {
      headDefinitions.concat(selectHeadDefinitions(fieldName, choices));
    }
    if (fieldType === 'Range') {
      imports.addImportDefault('../../lib/Range', 'Range');
    }
    return definition;
  });

  return { fieldsDefinition, imports, headDefinitions };
}

async function createDataDefinition(dirPath, pageName, fields) {
  const fileName = `${pageName}Data.ts`;
  const filePath = `${dirPath}/${fileName}`;

  const { fieldsDefinition, imports, headDefinitions } = defineFields(fields);
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
