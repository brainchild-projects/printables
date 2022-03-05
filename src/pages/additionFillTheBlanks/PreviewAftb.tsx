import React from 'react';
import MultiPaperPage, { Builder } from '../../components/MultiPaperPage';
import AdditionSentence, {
  AdditionBlankPosition, blankTypes, blankTypesAddends, generateAdditionSentences,
} from './AdditionSentence';
import AftbData, { BlankPositionStrategy } from './AftbData';
import WorksheetHeader from '../../components/WorksheetHeader';
import WorksheetFooter from '../../components/WorksheetFooter';
import Addition from './Addition';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';

interface PreviewAftbProps {
  aftbData: AftbData;
}

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
        wrapper={ProblemList}
        wrapperProps={{ columns: aftbData.columns }}
        data-test-id="problems"
        data={data}
        itemSelector=".addition-sentence-item"
        renderItems={problemBuilder}
      />
      <MultiPaperPage<AdditionAndMeta>
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper="ol"
        wrapperProps={{ className: 'answers', label: 'Answers' }}
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
