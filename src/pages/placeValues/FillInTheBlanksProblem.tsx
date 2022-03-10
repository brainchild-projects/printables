import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlaceValuesData from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';
import Blank, { BlankProps } from '../../components/Blank';

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

interface FillInTheBlanksProblemProps {
  magnitude: PlaceValuesData['magnitude'];
  problem: PlaceValuesProblem;
  showAnswer: boolean;
}

const ftbStyle = makeStyles(() => ({
  equals: {
    padding: '0 1.15em',
    display: 'inline-block',
  },
}));

function FillInTheBlanksProblem({
  magnitude, problem, showAnswer,
}: FillInTheBlanksProblemProps): JSX.Element {
  const classes = ftbStyle();
  return (
    <>
      {
        magnitude === 'hundreds'
          ? (<BlankAndPlace answer={problem.hundreds()} showAnswer={showAnswer} place="hundreds" and />)
          : ''
      }
      <BlankAndPlace answer={problem.tens()} showAnswer={showAnswer} place="tens" and />
      <BlankAndPlace answer={problem.ones()} showAnswer={showAnswer} place="ones" />
      <span className={classes.equals}>=</span>
      {' '}
      {problem.number}
    </>
  );
}

export default FillInTheBlanksProblem;
