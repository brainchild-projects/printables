import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage.js';
import PageTitle from '../../elements/PageTitle.js';
import ProblemList from '../../components/ProblemList.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import SubtractionWithFiguresData from './SubtractionWithFiguresData.js';
import Subtraction from '../../lib/math/Subtraction.js';
import SubtractionSentence from './SubtractionSentence.js';
import SubtractionFigure from './SubtractionFigure.js';
import generateSubtractionProblems from '../../lib/math/generateSubtractionProblems.js';

function itemBuilder(
  showAnswer: boolean,
) {
  const keyPrefix = showAnswer ? 'answer' : 'problem';
  function fn(problem: Subtraction, indexNumber: number) {
    return (
      <SubtractionSentence
        prefix={(
          <SubtractionFigure
            subtraction={problem}
            showAnswer={showAnswer}
          />
        )}
        subtraction={problem}
        key={`${keyPrefix}-${indexNumber}`}
        showAnswer={showAnswer}
      />
    );
  }
  return fn;
}

interface PreviewSubtractionWithFiguresProps {
  data: SubtractionWithFiguresData;
}

function PreviewSubtractionWithFigures({ data }: PreviewSubtractionWithFiguresProps): JSX.Element {
  const problems = generateSubtractionProblems(data);
  const { columns } = data;
  const instructions = 'Cross-out the necessary number of circles to help you find the answer in the blanks.';

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
          columns,
        }}
        data={problems}
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{
          className: 'answers',
          label: 'Answers',
          columns,
        }}
        data={problems}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewSubtractionWithFigures;
