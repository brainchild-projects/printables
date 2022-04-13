import React, { ReactNode } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/WorksheetFooter';
import WorksheetHeader from '../../components/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PlaceValuesData from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';
import FillInTheBlanksProblem from './FillInTheBlanksProblem';
import MultipleChoiceProblem from './MultipleChoiceProblem';

interface PreviewPlaceValuesProps {
  customData: PlaceValuesData;
}

function generateProblems({ count, magnitude }: PlaceValuesData): Array<PlaceValuesProblem> {
  let max: number;
  const magN = magnitude === 'hundreds' ? 3 : 2;
  if (magnitude === 'hundreds') {
    max = 999;
  } else {
    max = 99;
  }
  const problems: Array<PlaceValuesProblem> = [];
  const track: Set<number> = new Set([]);
  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(magN);
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
      padding: '0 1.15em',
      display: 'inline-block',
    },

    '& p u': {
      borderBottom: '0.1em solid',
      textDecoration: 'none',
    },
  },
}));

function mapDigitsCallback(digit: number, isItem: boolean): ReactNode {
  return isItem ? (<u>{digit}</u>) : digit;
}

function underlineDigit(problem: PlaceValuesProblem): Array<ReactNode> {
  return problem.mapDigits(mapDigitsCallback);
}

function itemBuilder(
  showAnswer: boolean,
  { magnitude, solution: problemType }: PlaceValuesData,
) {
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
                choices={['ones', 'tens', 'hundreds']}
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
          className: `problems ${classes.list}`,
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
          className: `problems bar ${classes.list}`,
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
