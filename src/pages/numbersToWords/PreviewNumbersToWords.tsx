import React from 'react';
import Blank from '../../components/Blank';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import numberToWords from '../../lib/numberToWords';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import NumbersToWordsData from './NumbersToWordsData';
import tryByKey from '../../lib/tryByKey';
import { magNFromMagnitude, maxFromMagnitude } from '../../lib/math/magnitude';

function generateProblems({ count, magnitude }: NumbersToWordsData): Array<number> {
  const max = maxFromMagnitude(magnitude);
  const magNumber = magNFromMagnitude(magnitude);

  const problems: Array<number> = [];
  const limitedRetries = tryByKey(max);

  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(magNumber);
    limitedRetries(number, () => {
      problems.push(number);
    });
  }

  return problems;
}

interface PreviewNumbersToWordsProps {
  customData: NumbersToWordsData;
}

// TODO: Use locale on computer's machine
const numberFormatter = new Intl.NumberFormat('en-US');

function PreviewNumbersToWords({ customData }: PreviewNumbersToWordsProps): JSX.Element {
  const problems = generateProblems(customData);

  const itemBuilder = (showAnswer: boolean) => {
    function fn(number: number, indexNumber: number) {
      return (
        <ProblemListItem
          key={`problem-${indexNumber}`}
          className="numbers-to-words-problem-item"
          label={`Numbers To Words ${showAnswer ? 'Answer' : 'Problem'}`}
        >
          {
            numberToWords(number)
          }
          {': '}
          <Blank answer={numberFormatter.format(number)} width="wide" showAnswer={showAnswer} />
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
            <p>Write the number that is written in words.</p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapper={ProblemList}
        data={problems}
        itemSelector=".numbers-to-words-problem-item"
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(<PageTitle>Answer Key</PageTitle>)}
        wrapper={ProblemList}
        wrapperProps={{ label: 'Answers' }}
        data={problems}
        itemSelector=".numbers-to-words-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewNumbersToWords;
