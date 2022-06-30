import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PlaceValuesData, { magnitudes, PlaceValuesMagnitude } from './PlaceValuesData';
import PlaceValuesProblem from './PlaceValuesProblem';
import Blank, { BlankProps } from '../../components/Blank';
import commaNumberFormat from '../../lib/math/commaNumberFormat';

interface BlankAndPlaceProps extends BlankProps {
  place: string;
  and?: boolean;
  comma?: boolean;
}

function BlankAndPlace({
  answer, showAnswer, place, and = false, comma = false,
}: BlankAndPlaceProps): JSX.Element {
  return (
    <>
      {' '}
      <Blank answer={answer} showAnswer={showAnswer} />
      {' '}
      {place}
      {comma ? (<span className="comma">,</span>) : ''}
      {' '}
      {and ? (<span className="and">and</span>) : ''}
      {' '}
    </>
  );
}

BlankAndPlace.defaultProps = {
  and: false,
  comma: false,
};

interface FillInTheBlanksProblemProps {
  magnitude: PlaceValuesData['magnitude'];
  problem: PlaceValuesProblem;
  showAnswer: boolean;
}

const ftbStyle = makeStyles(() => ({
  equals: {
    padding: '0 0.5em',
    display: 'inline-block',
  },
}));

const magnitudeKeys = Array.from(magnitudes.keys());

function magnitudeN(magnitude: PlaceValuesMagnitude): number {
  const index = magnitudeKeys.indexOf(magnitude);
  return (index ?? 0) + 2;
}

function FillInTheBlanksProblem({
  magnitude, problem, showAnswer,
}: FillInTheBlanksProblemProps): JSX.Element {
  const classes = ftbStyle();
  const magIndex = magnitudeN(magnitude);
  return (
    <>
      {
        magIndex > 3
          ? (<BlankAndPlace answer={problem.thousands()} showAnswer={showAnswer} place="thousands" comma />)
          : ''
      }
      {
        magIndex > 2
          ? (<BlankAndPlace answer={problem.hundreds()} showAnswer={showAnswer} place="hundreds" comma />)
          : ''
      }
      <BlankAndPlace answer={problem.tens()} showAnswer={showAnswer} place="tens" and />
      <BlankAndPlace answer={problem.ones()} showAnswer={showAnswer} place="ones" />
      <span className={classes.equals}>=</span>
      {' '}
      {commaNumberFormat(problem.number)}
    </>
  );
}

export default FillInTheBlanksProblem;
