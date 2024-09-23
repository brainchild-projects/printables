import React, { ReactNode } from 'react';
import classNames from 'classnames';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PlaceValuesData from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';
import FillInTheBlanksProblem from './FillInTheBlanksProblem';
import MultipleChoiceProblem from './MultipleChoiceProblem';
import { shouldAddComma } from '../../lib/math/commaNumberFormat';
import tryByKey from '../../lib/tryByKey';
import { magNFromMagnitude, Magnitude, maxFromMagnitude } from '../../lib/math/magnitude';
import styleIt from '../../components/styleIt';

interface PreviewPlaceValuesProps {
  customData: PlaceValuesData;
}

function generateProblems({ count, magnitude }: PlaceValuesData): Array<PlaceValuesProblem> {
  const max = maxFromMagnitude(magnitude);
  const magNumber = magNFromMagnitude(magnitude);

  const problems: Array<PlaceValuesProblem> = [];
  const limitedRetries = tryByKey(max);

  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(magNumber);
    limitedRetries(number, () => {
      problems.push(new PlaceValuesProblem(number, {
        digitPlaceValue: randomGenerator.integer(
          PlaceValuesProblem.countWholeNumberDigits(number),
          1,
        ),
      }));
    });
  }
  return problems;
}

const pageStyles = styleIt(() => ({
  list: {
    '& .and': {
      padding: '0 0.5em',
      display: 'inline-block',
    },

    '& .comma': {
      padding: '0 0.5em 0 0',
      display: 'inline-block',
    },

    '& p u': {
      borderBottom: '0.1em solid',
      textDecoration: 'none',
    },
  },
}));

function mapDigitsCallback(theNumber: number) {
  return function callback(digit: number, isItem: boolean, index: number): ReactNode {
    const numPart = isItem ? (<u>{digit}</u>) : digit;
    return (
      <span key={index}>
        {numPart}
        {shouldAddComma(theNumber, index) ? ',' : ''}
      </span>
    );
  };
}

function underlineDigit(problem: PlaceValuesProblem): Array<ReactNode> {
  return problem.mapDigits(mapDigitsCallback(problem.number));
}

function getChoices(magnitude: Magnitude) {
  const choices = ['ones', 'tens', 'hundreds'];
  if (magnitude === 'thousands') {
    choices.push('thousands');
  }
  return choices;
}

function itemBuilder(
  showAnswer: boolean,
  { magnitude, solution: problemType }: PlaceValuesData,
) {
  const choices = getChoices(magnitude);
  function fn(problem: PlaceValuesProblem, indexNumber: number) {
    return (
      <ProblemListItem
        key={`problem-${indexNumber}`}
        className="place-value-problem-item"
        label={`Place Value ${showAnswer ? 'Answer' : 'Problem'}`}
      >
        {
          problemType === 'blanks'
            ? (
              <FillInTheBlanksProblem
                magnitude={magnitude}
                problem={problem}
                showAnswer={showAnswer}
              />
            )
            : (
              <MultipleChoiceProblem
                choices={choices}
                answer={choices[problem.digitPlaceValue - 1]}
                showAnswer={showAnswer}
              >
                {underlineDigit(problem)}
              </MultipleChoiceProblem>
            )
        }

      </ProblemListItem>
    );
  }
  return fn;
}

const blanksInstruction = 'Fill out the correct number for each place value.';
const choiceInstruction = 'What is the place value of the underlined digit? Circle the letter of the correct answer.';

function PreviewPlaceValues({ customData }: PreviewPlaceValuesProps): JSX.Element {
  const classes = pageStyles();
  const problems = generateProblems(customData);
  const { solution: problemType, columns } = customData;
  const columnGap = 5;

  const instructions = problemType === 'blanks' ? blanksInstruction : choiceInstruction;
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
          className: classNames('problems', classes.list),
          columns,
          columnGap,
        }}
        data={problems}
        renderItems={itemBuilder(false, customData)}
      />
      <MultiPaperPage
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{
          className: classNames('problems', classes.list),
          label: 'Answers',
          columns,
          columnGap,
        }}
        data={problems}
        renderItems={itemBuilder(true, customData)}
      />
    </>
  );
}

export default PreviewPlaceValues;
