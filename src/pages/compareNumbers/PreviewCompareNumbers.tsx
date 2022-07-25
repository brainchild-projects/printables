import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import CompareNumbersData from './CompareNumbersData';
import generateProblems from './generateProblems';
import CompareNumbersProblem from './CompareNumbersProblem';
import Blank from '../../components/Blank';

function itemBuilder(
  showAnswer: boolean,
) {
  function fn(problem: CompareNumbersProblem, indexNumber: number) {
    return (
      <ProblemListItem
        key={`problem-${indexNumber}`}
        className="compare-numbers-problem-item"
        label={`Compare Numbers ${showAnswer ? 'Answer' : 'Problem'}`}
      >
        {problem.left}
        {' '}
        <Blank showAnswer={showAnswer} answer={problem.symbol().toString()} />
        {' '}
        {problem.right}
      </ProblemListItem>
    );
  }
  return fn;
}

interface PreviewCompareNumbersProps {
  data: CompareNumbersData;
}

function PreviewCompareNumbers({ data }: PreviewCompareNumbersProps): JSX.Element {
  const problems = generateProblems(data);
  const instructions = 'Write <, >, = if the number on the left is less than, greater than, or equal to the number on the right.';

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
        itemSelector=".compare-numbers-problem-item"
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
        itemSelector=".compare-numbers-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewCompareNumbers;
