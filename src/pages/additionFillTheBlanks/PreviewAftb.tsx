import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MultiPaperPage, { Builder, Props } from '../../components/MultiPaperPage';
import NumberGenerator from '../../lib/NumberGenerator';
import AdditionSentence, {
  BlankPosition, blankTypes, blankTypesAddends, generateAdditionSentences,
} from './AdditionSentence';
import AftbData, { BlankPositionStrategy } from './AftbData';
import WorksheetHeader from '../../components/WorksheetHeader';
import WorksheetFooter from '../../components/WorksheetFooter';
import Addition from './Addition';
import { defaultGenerator } from '../../lib/RandomNumberGenerator';

interface PreviewAftbProps {
  aftbData: AftbData;
  numberGenerator?: NumberGenerator;
}

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

function blankTypeFromStrategy(
  blankStrategy: BlankPositionStrategy, numberGenerator: NumberGenerator,
): BlankPosition {
  switch (blankStrategy) {
    case 'addends':
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return blankTypesAddends[
        numberGenerator.integer(blankTypesAddends.length - 1)
      ] as BlankPosition;

    case 'random':
      return blankTypes[numberGenerator.integer(blankTypes.length - 1)];

    default:
      return 'sum';
  }
}

const PreviewAftb = ({
  aftbData,
  numberGenerator = defaultGenerator,
}: PreviewAftbProps): JSX.Element => {
  const classes = pageStyles();
  const data = generateAdditionSentences(aftbData, numberGenerator);

  const problemBuilder: Builder<Addition> = (addition, index) => {
    const { blankStrategy } = aftbData;
    const blankType = blankTypeFromStrategy(blankStrategy, numberGenerator);
    return (
      <AdditionSentence
        key={`problem-${index}`}
        addition={addition}
        blank={blankType}
      />
    );
  };

  return (
    <>
      <MultiPaperPage
        header={(<WorksheetHeader />)}
        footer={(<WorksheetFooter itemCount={data.length} />)}
        wrapper="ol"
        wrapperProps={{ className: `${classes.list} problems` }}
        wrapperPropsCallback={
          (props, { memberIndex }) => ({
            ...props,
            style: { counterReset: `problem ${memberIndex}` },
          } as Props)
        }
        data={data}
        itemSelector=".addition-sentence-item"
        builder={problemBuilder}
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
