import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import WorksheetFooter from '../../components/WorksheetFooter';
import WorksheetHeader from '../../components/WorksheetHeader';
import VerticalAdditionData from './VerticalAdditionData';
import Range from '../../lib/Range';
import Addition from '../additionFillTheBlanks/Addition';
import pairsByRanges from '../../lib/pairsByRanges';
import VerticalAdditionItem from './VerticalAdditionItem';

function generateProblems({
  range, count, problemGeneration, customAddendsA, customAddendsB,
}: VerticalAdditionData): Addition[] {
  let rangeA: Range;
  let rangeB: Range;
  if (problemGeneration === 'custom addends') {
    rangeA = customAddendsA;
    rangeB = customAddendsB;
  } else {
    rangeA = range;
    rangeB = range;
  }

  const pairs = pairsByRanges(rangeA, rangeB, count);
  return pairs.map((pair) => Addition.create(...pair));
}

function itemBuilder(
  showAnswer: boolean,
) {
  function fn(problem: Addition, indexNumber: number) {
    return (
      <VerticalAdditionItem
        key={`problem-${indexNumber}`}
        add={problem}
        showAnswer={showAnswer}
      />
    );
  }
  return fn;
}

interface PreviewVerticalAdditionProps {
  data: VerticalAdditionData;
}

function PreviewVerticalAddition({ data }: PreviewVerticalAdditionProps): JSX.Element {
  const problems = generateProblems(data);
  const instructions = 'Solve the following addition problems.';

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
          columns: data.columns,
        }}
        data={problems}
        itemSelector=".vertical-addition-problem-item"
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
          columns: data.columns,
        }}
        data={problems}
        itemSelector=".vertical-addition-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewVerticalAddition;
