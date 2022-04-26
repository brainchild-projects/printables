import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import WorksheetFooter from '../../components/WorksheetFooter';
import WorksheetHeader from '../../components/WorksheetHeader';
import SubtractionWithFiguresData from './SubtractionWithFiguresData';
import Range from '../../lib/Range';
import Subtraction from '../../lib/math/Subtraction';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import SubtractionSentence from './SubtractionSentence';
import SubtractionFigure from './SubtractionFigure';
import tryByKey from '../../lib/tryByKey';

function generateProblemsFromMinuend(minuendRange: Range, count: number): Subtraction[] {
  const problems: Subtraction[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; problems.length < count; i++) {
    const { from, to } = minuendRange;
    const minuend = randomGenerator.integer(to, from);
    const subtrahend = randomGenerator.integer(minuend, 0);
    limitedRetries(`${minuend}:${subtrahend}`, () => {
      problems.push(Subtraction.create({ minuend, subtrahend }));
    });
  }
  return problems;
}

function generateProblemsFromSubAndDiff(
  subRange: Range,
  diffRange: Range,
  count: number,
): Subtraction[] {
  const problems: Subtraction[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; problems.length < count; i++) {
    const subtrahend = randomGenerator.integer(subRange.to, subRange.from);
    const difference = randomGenerator.integer(diffRange.to, diffRange.from);
    limitedRetries(`${subtrahend}:${difference}`, () => {
      problems.push(Subtraction.create({ subtrahend, difference }));
    });
  }
  return problems;
}

function generateProblems(
  {
    count, problemGeneration, minuend, subtrahend, difference,
  }: SubtractionWithFiguresData,
): Array<Subtraction> {
  if (problemGeneration === 'minuend') {
    return generateProblemsFromMinuend(minuend, count);
  }
  return generateProblemsFromSubAndDiff(subtrahend, difference, count);
}

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
  const problems = generateProblems(data);
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
