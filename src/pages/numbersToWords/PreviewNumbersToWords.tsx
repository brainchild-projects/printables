import React from 'react';
import Blank from '../../components/Blank';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import numberToWords from '../../lib/numberToWords';
import NumbersToWordsData from './NumbersToWordsData';
import MultipleChoiceProblem from '../placeValues/MultipleChoiceProblem';
import formatNumber from '../../lib/formatNumber';
import generateProblems, { NumToWordsProblem } from './generateProblems';

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
  const { problemType } = customData;
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
