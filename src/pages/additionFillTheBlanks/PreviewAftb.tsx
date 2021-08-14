import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MultiPaperPage, { Builder, Props } from '../../components/MultiPaperPage';
import AdditionSentence, {
  BlankPosition, blankTypes, blankTypesAddends, generateAdditionSentences,
} from './AdditionSentence';
import AftbData, { BlankPositionStrategy } from './AftbData';
import WorksheetHeader from '../../components/WorksheetHeader';
import WorksheetFooter from '../../components/WorksheetFooter';
import Addition from './Addition';
import { randomGenerator } from '../../lib/RandomNumberGenerator';

interface PreviewAftbProps {
  aftbData: AftbData;
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
      '-webkit-column-break-inside': 'avoid',
      pabeBreakInside: 'avoid',
      breakInside: 'avoid',
    },

    '& > li::marker': {
      content: 'counter(problem) "."',
      fontSize: '16px',
    },

    '& .problem-blank': {
      borderBottom: '2px solid',
      paddingLeft: '1mm',
      paddingRight: '1mm',
      display: 'inline-block',
      minWidth: 32,
      textAlign: 'center',
    },

    '& .underline': {
      color: 'transparent',
    },
  },
}));

function blankTypeFromStrategy(blankStrategy: BlankPositionStrategy): BlankPosition {
  switch (blankStrategy) {
    case 'addends':
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return blankTypesAddends[
        randomGenerator.integer(blankTypesAddends.length - 1)
      ] as BlankPosition;

    case 'random':
      return blankTypes[randomGenerator.integer(blankTypes.length - 1)];

    default:
      return 'sum';
  }
}

interface AdditionAndMeta {
  addition: Addition;
  blank: BlankPosition;
}

const PreviewAftb = ({
  aftbData,
}: PreviewAftbProps): JSX.Element => {
  const classes = pageStyles();
  const data = generateAdditionSentences(aftbData).map((addition): AdditionAndMeta => {
    const { blankStrategy } = aftbData;
    const blank = blankTypeFromStrategy(blankStrategy);
    return {
      addition,
      blank,
    };
  });

  const problemBuilder: Builder<AdditionAndMeta> = (
    { addition, blank }: AdditionAndMeta,
    index: number,
  ) => (
    <AdditionSentence
      key={`problem-${index}`}
      addition={addition}
      blank={blank}
    />
  );

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
          ({ addition, blank }, index) => (
            <AdditionSentence
              showAnswer
              key={`answer-${index}`}
              addition={addition}
              blank={blank}
            />
          )
        }
      />
    </>
  );
};

export default PreviewAftb;
