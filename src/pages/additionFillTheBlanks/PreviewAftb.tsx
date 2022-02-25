import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MultiPaperPage, { Builder, Props } from '../../components/MultiPaperPage';
import AdditionSentence, {
  AdditionBlankPosition, blankTypes, blankTypesAddends, generateAdditionSentences,
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
  // All em units equivalent are based on a 20px font size base
  list: {
    margin: '5mm 0 0 0',
    padding: 0,
    // fontSize: '20px',
    columnCount: 2,
    columnWidth: 'auto',
    counterReset: 'problem 0',

    '& > li': {
      padding: '1.15em 0 1.15em 1.15em', // '6mm 0 6mm 6mm', // 23px
      marginLeft: '1.9em', // '10mm', // 38px
      counterIncrement: 'problem',
      '-webkit-column-break-inside': 'avoid',
      pabeBreakInside: 'avoid',
      breakInside: 'avoid',
    },

    '& > li::marker': {
      content: 'counter(problem) "."',
      fontSize: '0.8em', // 16px
    },

    '& .problem-blank': {
      borderBottom: '0.1em solid', // 2px
      paddingLeft: '0.2em', // 1mm
      paddingRight: '0.2em', // 1mm

      display: 'inline-block',
      minWidth: '1.6em', // 32px
      textAlign: 'center',
    },

    '& .underline': {
      color: 'transparent',
    },
  },
}));

function blankTypeFromStrategy(blankStrategy: BlankPositionStrategy): AdditionBlankPosition {
  switch (blankStrategy) {
    case 'addends':
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return blankTypesAddends[
        randomGenerator.integer(blankTypesAddends.length - 1)
      ] as AdditionBlankPosition;

    case 'random':
      return blankTypes[randomGenerator.integer(blankTypes.length - 1)];

    default:
      return 'sum';
  }
}

interface AdditionAndMeta {
  addition: Addition;
  blank: AdditionBlankPosition;
}

function PreviewAftb({
  aftbData,
}: PreviewAftbProps): JSX.Element {
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
      fontSize={aftbData.fontSize}
    />
  );

  return (
    <>
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>Complete the addition facts by filling in the blanks.</p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={data.length} />)}
        wrapper="ol"
        wrapperProps={{
          className: `${classes.list} problems`,
          'aria-label': 'Problems',
        }}
        data-test-id="problems"
        wrapperPropsCallback={
          (props, { memberIndex }) => ({
            ...props,
            style: {
              counterReset: `problem ${memberIndex}`,
              columns: aftbData.columns,
            },
          } as Props)
        }
        data={data}
        itemSelector=".addition-sentence-item"
        renderItems={problemBuilder}
      />
      <MultiPaperPage<AdditionAndMeta>
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
        wrapperProps={{
          className: `${classes.list} answers`,
          'aria-label': 'Answers',
        }}
        wrapperPropsCallback={
          (props, { memberIndex }) => ({
            ...props,
            style: {
              counterReset: `problem ${memberIndex}`,
              columns: aftbData.columns,
            },
          } as Props)
        }
        data={data}
        itemSelector=".addition-sentence-item"
        renderItems={
          ({ addition, blank }, index) => (
            <AdditionSentence
              showAnswer
              key={`answer-${index}`}
              addition={addition}
              blank={blank}
              fontSize={aftbData.fontSize}
            />
          )
        }
      />
    </>
  );
}

export default PreviewAftb;
