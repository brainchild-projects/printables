import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Blank, { BlankProps } from '../../components/Blank';
import MultiPaperPage, { Props } from '../../components/MultiPaperPage';
import WorksheetFooter from '../../components/WorksheetFooter';
import WorksheetHeader from '../../components/WorksheetHeader';
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
  }
  return problems;
}

const pageStyles = makeStyles(() => ({
  heading: {
    textAlign: 'center',
  },
  list: {
    '& > li': {
      fontSize: 20,
      padding: '1.15em 0 1.15em 1.15em', // '6mm 0 6mm 6mm', // 23px
      counterIncrement: 'problem',
      '-webkit-column-break-inside': 'avoid',
      pabeBreakInside: 'avoid',
      breakInside: 'avoid',
    },
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
        <li
          key={`problem-${indexNumber}`}
          className="place-value-problem-item"
          aria-label={`Place Value ${showAnswer ? 'Answer' : 'Problem'}`}
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
        </li>
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
        wrapper="ol"
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapperProps={{ className: `problems bar ${classes.list} foo` }}
        data={problems}
        itemSelector=".place-value-problem-item"
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(
          <Typography
            variant="h6"
            component="h2"
            className={classes.heading}
          >
            Answer Key
          </Typography>
        )}
        wrapper="ol"
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapperProps={{
          className: `problems bar ${classes.list}`,
          'aria-label': 'Answers',
        }}
        wrapperPropsCallback={
          (props, { memberIndex }) => ({
            ...props,
            style: {
              counterReset: `problem ${memberIndex}`,
            },
          } as Props)
        }
        data={problems}
        itemSelector=".place-value-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewPlaceValues;
