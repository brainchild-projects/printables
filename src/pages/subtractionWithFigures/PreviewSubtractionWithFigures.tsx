import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import SubtractionWithFiguresData from './SubtractionWithFiguresData';
import Subtraction from '../../lib/math/Subtraction';
import SubtractionSentence from './SubtractionSentence';
import SubtractionFigure from './SubtractionFigure';
import generateSubtractionProblems from '../../lib/math/generateSubtractionProblems';

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
        itemSelector=".subtraction-with-figures-problem-item"
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
        itemSelector=".subtraction-with-figures-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewSubtractionWithFigures;
