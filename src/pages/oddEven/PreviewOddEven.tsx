import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import OddEvenData from './OddEvenData';
import Blank from '../../components/Blank';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import tryByKey from '../../lib/tryByKey';

class PreviewOddEvenProblem {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  oddOrEven() {
    return this.value % 2 === 0 ? 'Even' : 'Odd';
  }
}

interface FillInTheBlanksItemProps {
  problem: PreviewOddEvenProblem;
  showAnswer: boolean;
}

function FillInTheBlanks({ problem, showAnswer }: FillInTheBlanksItemProps) {
  return (
    <>
      {'The number '}
      {problem.value}
      {' is '}
      <Blank
        answer={problem.oddOrEven()}
        width="wide"
        showAnswer={showAnswer}
      />
    </>
  );
}

function generateProblems({ count }: OddEvenData): PreviewOddEvenProblem[] {
  const problems: PreviewOddEvenProblem[] = [];
  const limitedRetries = tryByKey();
  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(3);
    limitedRetries(number, () => {
      problems.push(new PreviewOddEvenProblem(number));
    });
  }

  return problems;
}

function itemBuilder(
  showAnswer: boolean,
) {
  function fn(problem: PreviewOddEvenProblem, indexNumber: number) {
    return (
      <ProblemListItem
        key={`problem-${indexNumber}`}
        className="odd-even-problem-item"
        label={`Odd Even ${showAnswer ? 'Answer' : 'Problem'}`}
      >
        <FillInTheBlanks
          problem={problem}
          showAnswer={showAnswer}
        />
      </ProblemListItem>
    );
  }
  return fn;
}

interface PreviewOddEvenProps {
  data: OddEvenData;
}

function PreviewOddEven({ data }: PreviewOddEvenProps): JSX.Element {
  const problems = generateProblems(data);
  const instructions = 'Write “Odd” in the blank if the number is odd, or “Even” if the number is even.';

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
        }}
        data={problems}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewOddEven;
