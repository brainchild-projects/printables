import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import NumberGenerator from '../../lib/NumberGenerator';
import RandomNumberGenerator from '../../lib/RandomNumberGenerator';
import AdditionSentence, { generateAdditionSentences } from './AdditionSentence';
import AftbData from './AftbData';

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
    fontSize: '20px',
    columnCount: 2,
    columnWidth: 'auto',

    '& > li': {
      padding: '8mm',
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
