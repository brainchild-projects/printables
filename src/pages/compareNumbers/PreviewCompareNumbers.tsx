import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage.js';
import PageTitle from '../../elements/PageTitle.js';
import ProblemList from '../../components/ProblemList.js';
import ProblemListItem from '../../components/ProblemListItem.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import CompareNumbersData from './CompareNumbersData.js';
import generateProblems from './generateProblems.js';
import CompareNumbersProblem from './CompareNumbersProblem.js';
import Blank from '../../components/Blank.js';

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

export default PreviewCompareNumbers;
