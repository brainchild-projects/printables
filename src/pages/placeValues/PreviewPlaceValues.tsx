import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Blank, { BlankProps } from '../../components/Blank';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/WorksheetFooter';
import WorksheetHeader from '../../components/WorksheetHeader';
import PageTitle from '../../elements/PageTitle';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PlaceValuesData from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';

interface PreviewPlaceValuesProps {
  customData: PlaceValuesData;
}

function generateProblems({ count, magnitude }: PlaceValuesData): Array<PlaceValuesProblem> {
  let max: number;
  if (magnitude === 'hundreds') {
    max = 999;
  } else {
    max = 99;
  }
  const problems: Array<PlaceValuesProblem> = [];
  const track: Set<number> = new Set([]);
  while (problems.length < count) {
    const number = randomGenerator.integer(max);
    if (!track.has(number)) {
      problems.push(new PlaceValuesProblem(number));
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
  },

  equals: {
    padding: '0 1.15em',
    display: 'inline-block',
  },
}));

interface BlankAndPlaceProps extends BlankProps {
  place: string;
  and?: boolean;
}

function BlankAndPlace({
  answer, showAnswer, place, and = false,
}: BlankAndPlaceProps): JSX.Element {
  return (
    <>
      {' '}
      <Blank answer={answer} showAnswer={showAnswer} />
      {' '}
      {place}
      {' '}
      {and ? (<span className="and">and</span>) : ''}
      {' '}
    </>
  );
}

BlankAndPlace.defaultProps = {
  and: false,
};

function PreviewPlaceValues({ customData }: PreviewPlaceValuesProps): JSX.Element {
  const classes = pageStyles();
  const problems = generateProblems(customData);
  const itemBuilder = (showAnswer: boolean) => {
    function fn(problem: PlaceValuesProblem, indexNumber: number) {
      return (
        <ProblemListItem
          key={`problem-${indexNumber}`}
          className="place-value-problem-item"
          label={`Place Value ${showAnswer ? 'Answer' : 'Problem'}`}
        >
          {
            customData.magnitude === 'hundreds'
              ? (<BlankAndPlace answer={problem.hundreds()} showAnswer={showAnswer} place="hundreds" and />)
              : ''
          }
          <BlankAndPlace answer={problem.tens()} showAnswer={showAnswer} place="tens" and />
          <BlankAndPlace answer={problem.ones()} showAnswer={showAnswer} place="ones" />
          <span className={classes.equals}>=</span>
          {' '}
          {problem.number}
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
            <p>Fill out the correct number for each place value.</p>
          </WorksheetHeader>
        )}
        wrapper={ProblemList}
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapperProps={{ className: `problems bar ${classes.list} foo` }}
        data={problems}
        itemSelector=".place-value-problem-item"
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{
          className: `problems bar ${classes.list}`,
          label: 'Answers',
        }}
        data={problems}
        itemSelector=".place-value-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewPlaceValues;
