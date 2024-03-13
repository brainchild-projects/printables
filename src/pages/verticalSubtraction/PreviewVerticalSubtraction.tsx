import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import generateSubtractionProblems from '../../lib/math/generateSubtractionProblems';
import Subtraction from '../../lib/math/Subtraction';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import VerticalSubtractionData from './VerticalSubtractionData';
import VerticalOperationItem from '../../components/math/VerticalOperationItem';

function itemBuilder(
  showAnswer: boolean,
) {
  function fn(subtraction: Subtraction, indexNumber: number) {
    return (
      <VerticalOperationItem
        key={`problem-${indexNumber}`}
        className="vertical-subtraction-problem-item"
        label="Vertical Subtraction"
        numbers={[subtraction.minuend, subtraction.subtrahend]}
        answer={subtraction.difference}
        operator="-"
        showAnswer={showAnswer}
      />
    );
  }
  return fn;
}

interface PreviewVerticalSubtractionProps {
  data: VerticalSubtractionData;
}

function PreviewVerticalSubtraction({ data }: PreviewVerticalSubtractionProps): JSX.Element {
  const problems = generateSubtractionProblems(data);
  const instructions = 'Solve the following subtraction problems';

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
        itemSelector=".vertical-subtraction-problem-item"
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
        itemSelector=".vertical-subtraction-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewVerticalSubtraction;
