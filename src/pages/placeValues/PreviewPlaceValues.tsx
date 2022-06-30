import React, { ReactNode } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PlaceValuesData, { PlaceValuesMagnitude } from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';
import FillInTheBlanksProblem from './FillInTheBlanksProblem';
import MultipleChoiceProblem from './MultipleChoiceProblem';
import { shouldAddComma } from '../../lib/math/commaNumberFormat';

interface PreviewPlaceValuesProps {
  customData: PlaceValuesData;
}

function maxFromMagnitude(magnitude: PlaceValuesData['magnitude']): number {
  switch (magnitude) {
    case 'thousands':
      return 9999;

    case 'hundreds':
      return 999;

    default:
      return 99;
  }
}

function magNFromMagnitude(magnitude: PlaceValuesData['magnitude']): number {
  switch (magnitude) {
    case 'thousands':
      return 4;

    case 'hundreds':
      return 3;

    default:
      return 2;
  }
}

function generateProblems({ count, magnitude }: PlaceValuesData): Array<PlaceValuesProblem> {
  const max = maxFromMagnitude(magnitude);
  const magNumber = magNFromMagnitude(magnitude);

  const problems: Array<PlaceValuesProblem> = [];
  const track: Set<number> = new Set([]);
  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(magNumber);
    if (!track.has(number)) {
      problems.push(new PlaceValuesProblem(number, {
        digitPlaceValue: randomGenerator.integer(
          PlaceValuesProblem.countWholeNumberDigits(number),
          1,
        ),
      }));
      track.add(number);
    }
    if (problems.length % max === 0) {
      track.clear();
    }
  }
  return problems;
}

const pageStyles = makeStyles(() => ({
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

function getChoices(magnitude: PlaceValuesMagnitude) {
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
                answer={problem.digitPlaceValue - 1}
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
        itemSelector=".place-value-problem-item"
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
        itemSelector=".place-value-problem-item"
        renderItems={itemBuilder(true, customData)}
      />
    </>
  );
}

export default PreviewPlaceValues;
