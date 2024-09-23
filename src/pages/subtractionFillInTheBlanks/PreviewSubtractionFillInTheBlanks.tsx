import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import SubtractionFillInTheBlanksData, { BlankPosition } from './SubtractionFillInTheBlanksData';
import generateSubtractionProblems from '../../lib/math/generateSubtractionProblems';
import Subtraction from '../../lib/math/Subtraction';
import SubtractionSentence from '../subtractionWithFigures/SubtractionSentence';
import { SubtractionBlankPosition, subtractionBlankPositions } from '../../components/math/SubtractionSentenceBasic';
import randomElement from '../../lib/randomElement';

interface SubtractionMeta {
  subtraction: Subtraction;
  blank: SubtractionBlankPosition;
}

function itemBuilder(
  showAnswer: boolean,
  fontSize: number,
) {
  const keyPrefix = showAnswer ? 'answer' : 'problem';
  function fn({ subtraction, blank }: SubtractionMeta, indexNumber: number) {
    return (
      <SubtractionSentence
        subtraction={subtraction}
        key={`${keyPrefix}-${indexNumber}`}
        showAnswer={showAnswer}
        fontSize={fontSize}
        blank={blank}
      />
    );
  }
  return fn;
}

function getBlank(strategy: BlankPosition): SubtractionBlankPosition {
  if (strategy === 'random') {
    return randomElement(subtractionBlankPositions);
  }
  return strategy;
}

function generateProblems(data: SubtractionFillInTheBlanksData): SubtractionMeta[] {
  return generateSubtractionProblems(data).map((subtraction) => ({
    subtraction,
    blank: getBlank(data.blankPosition),
  }));
}

interface PreviewSubtractionFillInTheBlanksProps {
  data: SubtractionFillInTheBlanksData;
}

function PreviewSubtractionFillInTheBlanks({
  data,
}: PreviewSubtractionFillInTheBlanksProps): JSX.Element {
  const problems = generateProblems(data);
  const { columns, fontSize } = data;
  const instructions = 'Complete the subtraction facts by filling in the blanks.';

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
        renderItems={itemBuilder(false, fontSize)}
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
        renderItems={itemBuilder(true, fontSize)}
      />
    </>
  );
}

export default PreviewSubtractionFillInTheBlanks;
