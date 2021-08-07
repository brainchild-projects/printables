import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
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
    <li className="addition-sentence-item">
      {addendA}
      {' '}
      +
      {' '}
      {addendB}
      {' '}
      = ___
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
  const data = generateAdditionSentences(aftbData, numberGenerator);

  return (
    <MultiPaperPage
      header={(
        <Typography
          variant="h5"
          component="h1"
          className={classes.heading}
        >
          Addition: Fill in the Blanks
        </Typography>
      )}
      contentWrapper="ul"
      contentWrapperClassName={classes.list}
      data={data}
      itemSelector=".addition-sentence-item"
      builder={
        ({ key, addendA, addendB }) => (
          <AdditionSentence key={key} addendA={addendA} addendB={addendB} />
        )
      }
    />
  );
};

PreviewAftb.defaultProps = {
  numberGenerator: defaultGenerator,
};

export default PreviewAftb;
