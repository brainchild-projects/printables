const { writeFile } = require('fs/promises');
const { logRed } = require('./colorLogs');
const { upperCamelCase } = require('./textManipulation');
const ImportMap = require('./ImportMap');
const {
  numberField, switchField, numberRangeField, selectField, textField,
} = require('./fields');

const template = `import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
[IMPORTS]

interface [FORM]Props {
  onChange: (data: [DATA]) => void;
  data: [DATA];
}

function [FORM]({
  data, onChange,
}: [FORM]Props): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
[FIELDS]
    </CustomizeForm>
  );
}

export default [FORM];
`;

async function createCustomizeForm(dirPath, pageName, fields) {
  const dataName = `${upperCamelCase(pageName)}Data`;
  const fileName = `Customize${pageName}Form.tsx`;
  const filePath = `${dirPath}/${fileName}`;
  const imports = new ImportMap([]);
  const dataPath = `./${dataName}`;

  imports.addImportDefault(dataPath, dataName);

  const fieldElements = fields.map((fieldInfo) => {
    const { fieldName, fieldType } = fieldInfo;
    switch (fieldType) {
      case 'number':
        imports.addImportDefault(
          '../../components/forms/NumberField',
          'NumberField',
        );
        imports.addImportDefault(
          '../../components/forms/NumberField',
          'NumberField',
        );
        return numberField(fieldName);

      case 'boolean':
        imports.addImportDefault(
          '../../components/forms/SwitchField',
          'SwitchField',
        );
        return switchField(fieldName);

      case 'Range':
        imports.addImportDefault(
          '../../components/forms/NumberRangeSlider',
          'NumberRangeSlider',
        );
        return numberRangeField(fieldName, fieldInfo.magnitude);

      case 'Select':
        imports.addImportDefault(
          '../../components/forms/SelectField',
          'SelectField',
        );
        imports.addImportDefault(
          '../../components/forms/stringMapToOptions',
          'stringMapToOptions',
        );
        imports.addNamed(
          dataPath,
          upperCamelCase(fieldName),
        );
        imports.addNamed(
          dataPath,
          `${fieldName}Options`,
        );
        return selectField(fieldName, fieldInfo.choices);

      default:
        imports.addImportDefault(
          '../../components/forms/TextField',
          'TextField',
        );
        return textField(fieldName);
    }
  });

  const content = template.replace(
    /\[FORM\]/g,
    `Customize${upperCamelCase(pageName)}Form`,
  ).replace(
    /\[DATA\]/g,
    `${pageName}Data`,
  ).replace(
    /\[FIELDS\]/g,
    fieldElements.join('\n'),
  ).replace(
    /\[IMPORTS\]/g,
    imports.asImportStatements(),
  );

  await writeFile(filePath, content, (err) => {
    if (err !== null) {
      logRed(err);
    }
  });

  return filePath;
}
exports.createCustomizeForm = createCustomizeForm;
