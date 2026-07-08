import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage.js';
import PageTitle from '../../elements/PageTitle.js';
import ProblemList from '../../components/ProblemList.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import VerticalMultiplicationData from './VerticalMultiplicationData.js';
import generateMultiplicationProblems from '../../lib/math/generateMultiplicationProblems.js';
import Multiplication from '../../lib/math/Multiplication.js';
import VerticalOperationItem from '../../components/math/VerticalOperationItem.js';

function itemBuilder(
  showAnswer: boolean,
) {
  function fn(multiplication: Multiplication, indexNumber: number) {
    return (
      <VerticalOperationItem
        key={`problem-${indexNumber}`}
        className="vertical-multiplication-problem-item"
        label="Vertical Multiplication"
        numbers={[multiplication.multiplicand, multiplication.multiplier]}
        answer={multiplication.product}
        operator="✕"
        showAnswer={showAnswer}
      />
    );
  }
  return fn;
}

interface PreviewVerticalMultiplicationProps {
  data: VerticalMultiplicationData;
}

function PreviewVerticalMultiplication({ data }: PreviewVerticalMultiplicationProps): JSX.Element {
  const problems = generateMultiplicationProblems(data);
  const instructions = 'Solve the following multiplication problems.';

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

export default PreviewVerticalMultiplication;
