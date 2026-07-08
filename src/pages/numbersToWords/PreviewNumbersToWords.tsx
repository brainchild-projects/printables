import React from 'react';
import Blank from '../../components/Blank.js';
import MultiPaperPage from '../../components/MultiPaperPage.js';
import ProblemList from '../../components/ProblemList.js';
import ProblemListItem from '../../components/ProblemListItem.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import PageTitle from '../../elements/PageTitle.js';
import numberToWords from '../../lib/numberToWords.js';
import NumbersToWordsData from './NumbersToWordsData.js';
import MultipleChoiceProblem from '../placeValues/MultipleChoiceProblem.js';
import formatNumber from '../../lib/formatNumber.js';
import generateProblems, { NumToWordsProblem } from './generateProblems.js';

interface FillInTheBlanksProps {
  number: number;
  showAnswer: boolean;
}

function FillInTheBlanks({ number, showAnswer }: FillInTheBlanksProps) {
  return (
    <>
      {
        numberToWords(number)
      }
      {': '}
      <Blank answer={formatNumber(number)} width="wide" showAnswer={showAnswer} />
    </>
  );
}

interface PreviewNumbersToWordsProps {
  customData: NumbersToWordsData;
}

function PreviewNumbersToWords({ customData }: PreviewNumbersToWordsProps): JSX.Element {
  const { problemType, fontSize } = customData;
  const problems = generateProblems(customData);
  const instructions = problemType === 'blanks'
    ? 'Write the number that is written in words.'
    : 'Circle the number that the words represent.';

  const itemBuilder = (showAnswer: boolean) => {
    function fn(problem: NumToWordsProblem, indexNumber: number) {
      const { number } = problem;
      return (
        <ProblemListItem
          key={`problem-${indexNumber}`}
          className="numbers-to-words-problem-item"
          label={`Numbers To Words ${showAnswer ? 'Answer' : 'Problem'}`}
          fontSize={fontSize}
        >
          {
            problemType === 'blanks'
              ? (
                <FillInTheBlanks number={number} showAnswer={showAnswer} />
              )
              : (
                <MultipleChoiceProblem
                  choices={problem.choices}
                  answer={number}
                  showAnswer={showAnswer}
                >
                  {numberToWords(number)}
                </MultipleChoiceProblem>
              )
          }
        </ProblemListItem>
      );
    }
    return fn;
  };
  return (
    <>
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>{instructions}</p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapper={ProblemList}
        data={problems}
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(<PageTitle>Answer Key</PageTitle>)}
        wrapper={ProblemList}
        wrapperProps={{ label: 'Answers' }}
        data={problems}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewNumbersToWords;
