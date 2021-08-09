import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MultiPaperPage from '../../components/MultiPaperPage';
import NumberGenerator from '../../lib/NumberGenerator';
import RandomNumberGenerator from '../../lib/RandomNumberGenerator';
import AdditionSentence, { generateAdditionSentences } from './AdditionSentence';
import AftbData from './AftbData';
import WorksheetHeader from '../../components/WorksheetHeader';
import WorksheetFooter from '../../components/WorksheetFooter';

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
        header={(<WorksheetHeader />)}
        footer={(<WorksheetFooter itemCount={data.length} />)}
        wrapper="ol"
        wrapperProps={{ className: `${classes.list} problems` }}
        wrapperPropsInstanceCallback={
          (props, { memberIndex }) => ({
            ...props,
            style: { counterReset: `problem ${memberIndex}` },
          })
        }
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
        wrapper="ol"
        wrapperProps={{ className: `${classes.list} answers` }}
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
