import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import VerticalAdditionData from './VerticalAdditionData';
import Range from '../../lib/Range';
import pairsByRanges from '../../lib/pairsByRanges';
import VerticalAdditionItem from './VerticalAdditionItem';
import Addition from '../../lib/math/Addition';
import tryByKey from '../../lib/tryByKey';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import noRegroupPair from '../../lib/math/noRegroupPair';

function commonRangeProblems(count: number, rangeA: Range, rangeB: Range): Addition[] {
  const pairs = pairsByRanges(rangeA, rangeB, count);
  return pairs.map((pair) => Addition.create(...pair));
}

function noRegroupingProblems(count: number, range: Range): Addition[] {
  const limitedRetries = tryByKey(count);
  const problems: Addition[] = [];
  while (problems.length < count) {
    const a = randomGenerator.integerBiasLess(range.to, range.from);
    const b = noRegroupPair(a, range.to);
    limitedRetries(`${a}:${b}`, () => {
      problems.push(Addition.create(a, b));
    });
  }
  return problems;
}

function generateProblems({
  problemGeneration, count, range, customAddendsA, customAddendsB, noRegroupingRange,
}: VerticalAdditionData): Addition[] {
  switch (problemGeneration) {
    case 'custom addends':
      return commonRangeProblems(count, customAddendsA, customAddendsB);

    case 'no regrouping':
      return noRegroupingProblems(count, noRegroupingRange);

    default:
      return commonRangeProblems(count, range, range);
  }
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
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewVerticalAddition;
