import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PaperPage from '../../components/PaperPage';
import NumberGenerator from '../../lib/NumberGenerator';
import RandomNumberGenerator from '../../lib/RandomNumberGenerator';
import AftbData from './AftbData';

interface AdditionSentenceProps {
  addendA: number;
  addendB: number;
}
interface AdditionSentenceData extends AdditionSentenceProps {
  key: string;
}

function generateAdditionSentences(
  { rangeFrom, rangeTo, problems }: AftbData,
  generator: NumberGenerator,
): AdditionSentenceData[] {
  const generated: AdditionSentenceData[] = [];
  for (let index = 0; index < problems; index++) {
    generated.push({
      key: `problem-${index + 1}`,
      addendA: generator.integer(rangeTo, rangeFrom),
      addendB: generator.integer(rangeTo, rangeFrom),
    });
  }
  return generated;
}

function AdditionSentence({
  addendA, addendB,
}: AdditionSentenceProps): JSX.Element {
  return (
    <li>
      {addendA}
      {' '}
      +
      {' '}
      {addendB}
      {' '}
      = __
      {' '}
    </li>
  );
}
interface PreviewAftbProps {
  aftbData: AftbData;
  numberGenerator?: NumberGenerator;
}

const defaultGenerator = new RandomNumberGenerator(Math.random);

const pageStyles = makeStyles(() => ({
  wrap: {
    width: '100%',
  },
  heading: {
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    margin: '10mm 0 0 0',
    padding: 0,
    fontSize: '24px',
    columnCount: 2,
    columnWidth: 'auto',

    '& > li': {
      padding: '10mm',
    },
  },

}));

const PreviewAftb = ({
  aftbData,
  numberGenerator = defaultGenerator,
}: PreviewAftbProps): JSX.Element => {
  const classes = pageStyles();
  return (
    <PaperPage>
      <div className={classes.wrap}>
        <Typography
          variant="h5"
          component="h1"
          className={classes.heading}
        >
          Addition: Fill in the Blanks
        </Typography>
        <ul className={classes.list}>
          {
            generateAdditionSentences(aftbData, numberGenerator)
              .map(({ key, addendA, addendB }) => (
                <AdditionSentence key={key} addendA={addendA} addendB={addendB} />
              ))
          }
        </ul>
      </div>
    </PaperPage>
  );
};

PreviewAftb.defaultProps = {
  numberGenerator: defaultGenerator,
};

export default PreviewAftb;
