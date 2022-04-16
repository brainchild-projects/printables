/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
const inquirer = require('inquirer');
const { existsSync } = require('fs');
const { mkdir } = require('fs/promises');
const { logGreen, logYellow } = require('./generatePage/colorLogs');
const { lowerCamelCase, titleize } = require('./generatePage/textManipulation');
const { createDataDefinition } = require('./generatePage/createDataDefinition');
const { createCustomizeForm } = require('./generatePage/createCustomizeForm');
const createPreview = require('./generatePage/createPreview');
const createPage = require('./generatePage/createPage');

const fieldTypes = [
  'number',
  'string',
  'boolean',
  'Range',
  'Select',
];

async function gatherSelectChoices() {
  const choices = [];
  let i = 1;
  while (true) {
    const { choice } = await inquirer.prompt([{
      name: 'choice',
      type: 'input',
      message: `  Choice #${i}:`,
    }]);

    if (choice === '') {
      break;
    }
    choices.push(choice);
    i += 1;
  }
  return choices;
}

function getDefaultValue({ fieldType, choices }) {
  switch (fieldType) {
    case 'number':
      return 0;

    case 'boolean':
      return false;

    case 'Range':
      return '0,9';

    case 'Select':
      return choices[0];

    default:
      return '';
  }
}

function rangeDefault(rangeStr) {
  const [from, to] = rangeStr.split(',').map((n) => parseFloat(n.trim()));
  return { from, to };
}

async function gatherFields() {
  const fields = [{
    fieldName: 'count',
    fieldType: 'number',
    fieldDefault: 10,
  }];
  while (true) {
    const field = {};
    logYellow('');
    const { fieldName } = await inquirer.prompt([{
      name: 'fieldName',
      type: 'input',
      message: 'Field Name:',
    }]);
    if (fieldName.trim() === '') {
      break;
    }
    field.fieldName = fieldName;

    const { fieldType } = await inquirer.prompt([{
      name: 'fieldType',
      type: 'list',
      message: 'Field Type:',
      choices: fieldTypes,
    }]);
    field.fieldType = fieldType;

    if (fieldType === 'Range') {
      const { magnitude } = await inquirer.prompt([{
        name: 'magnitude',
        type: 'input',
        message: '  Range magnitude:',
        default: 2,
      }]);
      field.magnitude = magnitude;
    }

    if (fieldType === 'Select') {
      field.choices = await gatherSelectChoices();
    }

    const { fieldDefault } = await inquirer.prompt([{
      name: 'fieldDefault',
      type: 'input',
      message: 'Default Value:',
      default: getDefaultValue(field),
    }]);
    let defaultValue;
    switch (fieldType) {
      case 'Range':
        defaultValue = rangeDefault(fieldDefault);
        break;

      case 'number':
        defaultValue = parseFloat(fieldDefault);
        break;

      default:
        defaultValue = fieldDefault;
    }
    field.fieldDefault = defaultValue;

    fields.push(field);
  }
  return fields;
}

async function getPageType() {
  const { pageType } = await inquirer.prompt([{
    name: 'pageType',
    type: 'list',
    message: 'Page Type:',
    choices: [
      'multi',
      'simple',
    ],
    default: 'multi',
  }]);
  return pageType;
}

async function getTitle(pageName) {
  const { title } = await inquirer.prompt([{
    name: 'title',
    message: 'Title:',
    default: titleize(pageName),
  }]);
  return title;
}

async function run() {
  logGreen('\nGenerate Page\n');

  const { pageName } = await inquirer.prompt([{
    name: 'pageName',
    type: 'input',
    message: 'Page Name (Use "CamelCase"):',
  }]);

  logGreen('\n\nDefine the data fields for this page.');
  logGreen('When you are done, hit ENTER for "Field Name"');
  const fields = await gatherFields();

  logYellow();

  const pageType = await getPageType();
  const title = await getTitle(pageName);

  const dirName = lowerCamelCase(pageName);
  const dirPath = `src/pages/${dirName}`;
  if (!(existsSync(dirPath))) {
    await mkdir(dirPath);
  }

  const result = await Promise.all([
    createCustomizeForm(dirPath, pageName, fields),
    createDataDefinition(dirPath, pageName, fields),
    createPreview(dirPath, pageName, pageType),
    createPage(dirPath, pageName, fields, title),
  ]);

  logGreen('\n\nFiles created:');
  result.forEach((file) => logGreen(file));
}

run();
