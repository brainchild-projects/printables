import { writeFile } from 'fs';
import { logRed } from './colorLogs.js';
import { titleize, dashed } from './textManipulation.js';

const multiTemplate = `import React from 'react';
import classNames from 'classnames';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import [DATA] from './[DATA]';

class [PREVIEW]Problem {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

function generateProblems(data: [DATA]): [PREVIEW]Problem[] {
  // WARNING: TOO SIMPLE
  const problems: [PREVIEW]Problem[] = [];
  for (let i = 0; i < data.count; i++) {
    problems.push(new [PREVIEW]Problem(i));
  }

  return problems;
}

function itemBuilder(
  showAnswer: boolean,
  data: [DATA],
  className = '',
) {
  function fn(problem: [PREVIEW]Problem, indexNumber: number) {
    return (
      <ProblemListItem
        key={\`problem-\${indexNumber}\`}
        className={classNames('[DASHEDNAME]-problem-item', className)}
        label={\`[LABELPREFIX] \${showAnswer ? 'Answer' : 'Problem'}\`}
      >
        Problem
        {problem.value}
      </ProblemListItem>
    );
  }
  return fn;
}

interface [PREVIEW]Props {
  data: [DATA];
}

function [PREVIEW]({ data }: [PREVIEW]Props): JSX.Element {
  const problems = generateProblems(data);
  const instructions = 'INSTRUCTIONS GO HERE.';

  return (
    <>
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>{instructions}</p>
          </WorksheetHeader>
        )}
        wrapper={ProblemList}
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapperProps={{
          className: 'problems',
        }}
        data={problems}
        renderItems={itemBuilder(false, data)}
      />
      <MultiPaperPage
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{
          className: 'answers',
          label: 'Answers',
        }}
        data={problems}
        renderItems={itemBuilder(true, data)}
      />
    </>
  );
}

export default [PREVIEW];
`;

const simpleTemplate = `import React from 'react';
import Box from '../../components/uiElements/Box';
import PageTitle from '../../elements/PageTitle';
import PaperPage from '../../components/PaperPage';
import [DATA] from './[DATA]';
import styleIt from '../../components/styleIt';

interface [PREVIEW]Props {
  data: [DATA],
}

const styles = styleIt(() => ({
  wrap: {
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
  },
}));

function [PREVIEW](props: [PREVIEW]Props): JSX.Element {
  const classes = styles();

  return (
    <PaperPage noFlexWrap>
      <Box className={classes.wrap}>
        <PageTitle>[LABELPREFIX]</PageTitle>
        <p>CONTENT HERE</p>
      </Box>
    </PaperPage>
  );
}

export default [PREVIEW];
`;

async function createPreview(dirPath, pageName, pageType) {
  const prevName = `Preview${pageName}`;
  const dataName = `${pageName}Data`;
  const labelPrefix = titleize(pageName);
  const dashedName = dashed(pageName);
  const fileName = `${prevName}.tsx`;
  const filePath = `${dirPath}/${fileName}`;
  const template = pageType === 'multi'
    ? multiTemplate
    : simpleTemplate;

  const content = template.replace(/\[([A-Z]+)\]/g, (match, variable) => {
    switch (variable) {
      case 'PREVIEW':
        return prevName;

      case 'DATA':
        return dataName;

      case 'LABELPREFIX':
        return labelPrefix;

      case 'DASHEDNAME':
        return dashedName;

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

export default createPreview;
