import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
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
  header: {
    display: 'flex',
  },
  headerName: {
    flexGrow: 4,
    display: 'flex',
    paddingRight: '2em',
  },
  label: {
    flexGrow: 0,
    fontWeight: 'normal',
    paddingRight: '0.3em',
  },
  headerDate: {
    flexGrow: 2,
    display: 'flex',
  },
  headerBlank: {
    flexGrow: 1,
    borderBottom: '1px solid black',
  },
  instructions: {
    marginBottom: 0,
    marginTop: '10mm',
    fontSize: '16px',
  },
  heading: {
    textAlign: 'center',
  },
  list: {
    margin: '5mm 0 0 0',
    padding: 0,
    fontSize: '20px',
    columnCount: 2,
    columnWidth: 'auto',
    counterReset: 'problem 0',

    '& > li': {
      padding: '6mm 0 6mm 6mm',
      marginLeft: '10mm',
      counterIncrement: 'problem',
    },

    '& > li::marker': {
      content: 'counter(problem) "."',
      fontSize: '16px',
    },

    '& .blank': {
      position: 'relative',
      top: '2mm',
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
    <>
      <MultiPaperPage
        header={(
          <>
            <section className={classes.header}>
              <div className={classes.headerName}>
                <strong className={classes.label}>Name:</strong>
                <span className={classes.headerBlank} />
              </div>
              <div className={classes.headerDate}>
                <strong className={classes.label}>Date:</strong>
                <span className={classes.headerBlank} />
              </div>
            </section>
            <p className={classes.instructions}>
              Complete the addition facts by filling in the blanks.
            </p>
          </>
        )}
        contentWrapper="ol"
        contentWrapperClassName={`${classes.list} problems`}
        data={data}
        itemSelector=".addition-sentence-item"
        builder={
          (addition, index) => (
            <AdditionSentence
              key={`problem-${index}`}
              addition={addition}
            />
          )
        }
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
        contentWrapper="ol"
        contentWrapperClassName={`${classes.list} answers`}
        data={data}
        itemSelector=".addition-sentence-item"
        builder={
          (addition, index) => (
            <AdditionSentence
              showAnswer
              key={`answer-${index}`}
              addition={addition}
            />
          )
        }
      />
    </>
  );
};

PreviewAftb.defaultProps = {
  numberGenerator: defaultGenerator,
};

export default PreviewAftb;
