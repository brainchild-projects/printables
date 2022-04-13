const { writeFile } = require('fs');
const { logRed } = require('./colorLogs');
const { lowerCamelCase } = require('./textManipulation');

const template = `import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import Customize[NAME]Form from './Customize[NAME]Form';
import [NAME]Data from './[NAME]Data';
import Preview[NAME] from './Preview[NAME]';

const defaultData: [NAME]Data = {
[DEFAULTS]
};
const key = '[KEY]';

function [NAME]Page(): JSX.Element {
  const { data, onChange } = usePageState<[NAME]Data>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="[TITLE]"
      optionsKey={key}
      customizeForm={(
        <Customize[NAME]Form
          onChange={onChange}
          data={data}
        />
      )}
    >
      <Preview[NAME] data={data} />
    </PrintableUI>
  );
}

export default [NAME]Page;
`;

function createDefaults(fields) {
  return fields.map(({ fieldName, fieldDefault }) => `  ${fieldName}: ${JSON.stringify(fieldDefault)},`)
    .join('\n');
}

async function createPage(dirPath, pageName, fields, title) {
  const fileName = `${pageName}Page.tsx`;
  const filePath = `${dirPath}/${fileName}`;
  const defaults = createDefaults(fields);
  const key = lowerCamelCase(pageName);

  const content = template.replace(/\[([A-Z]+)\]/g, (match, variable) => {
    switch (variable) {
      case 'NAME':
        return pageName;

      case 'DEFAULTS':
        return defaults;

      case 'TITLE':
        return title;

      case 'KEY':
        return key;

      default:
        return match;
    }
  });

  await writeFile(filePath, content, (err) => {
    if (err !== null) {
      logRed(err);
    }
  });

  return filePath;
}

module.exports = createPage;
