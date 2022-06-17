import React from 'react';
import { makeStyles } from '@material-ui/core';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import SkipCountingData from './SkipCountingData';
import SkipCountingProblem from './SkipCountingProblem';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import Blank from '../../components/Blank';
import tryByKey from '../../lib/tryByKey';

function generateProblems({ skipCountBy, count }: SkipCountingData): SkipCountingProblem[] {
  const problems: SkipCountingProblem[] = [];
  const length = 5;
  const limitedRetries = tryByKey();
  while (problems.length < count) {
    const start = (
      randomGenerator.integerBiasLess(Math.floor(100 / skipCountBy) - length + 1, 1)
    ) * skipCountBy;
    const blankAt = randomGenerator.integer(length - 1, 0);
    limitedRetries([start, skipCountBy], () => {
      problems.push(new SkipCountingProblem({
        skipBy: skipCountBy,
        start,
        length,
        blankAt,
      }));
    });
  }

  return problems;
}

const styles = makeStyles(() => ({
  number: {
    padding: '0 2mm',
  },
}));

function commaIt(element: JSX.Element, index: number, length: number): JSX.Element {
  if (index < length - 1) {
    return (
      <>
        {element}
        <span className="comma">,&nbsp;</span>
      </>
    );
  }
  return element;
}

function itemBuilder(
  showAnswer: boolean,
  numberClass: string,
) {
  function fn(problem: SkipCountingProblem, indexNumber: number) {
    const sequence = problem.sequence(true);
    return (
      <ProblemListItem
        key={`problem-${indexNumber}`}
        className="skip-counting-problem-item"
        label={`Skip Counting ${showAnswer ? 'Answer' : 'Problem'}`}
      >
        {sequence.map((number, index) => {
          let nElement: JSX.Element;
          if (index === problem.blankAt) {
            nElement = (<Blank answer={number} showAnswer={showAnswer} />);
          } else {
            nElement = (<span className={numberClass}>{number}</span>);
          }
          return commaIt(nElement, index, sequence.length);
        })}
      </ProblemListItem>
    );
  }
  return fn;
}

interface PreviewSkipCountingProps {
  data: SkipCountingData;
}

function PreviewSkipCounting({ data }: PreviewSkipCountingProps): JSX.Element {
  const problems = generateProblems(data);
  const classes = styles();
  const instructions = 'Complete the skip counting problems by filling in the blank.';

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
        itemSelector=".skip-counting-problem-item"
        renderItems={itemBuilder(false, classes.number)}
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
        itemSelector=".skip-counting-problem-item"
        renderItems={itemBuilder(true, classes.number)}
      />
    </>
  );
}

export default PreviewSkipCounting;
