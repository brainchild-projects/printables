import React from 'react';
import MultiPaperPage, { Builder } from '../../components/MultiPaperPage';
import AdditionSentence, {
  blankTypes, blankTypesAddends, generateAdditionSentences,
} from './AdditionSentence';
import AftbData, { BlankPositionStrategy } from './AftbData';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import Addition from '../../lib/math/Addition';
import { AdditionBlankPosition } from '../../components/math/AdditionSentenceBasic';
import randomElement from '../../lib/randomElement';

interface PreviewAftbProps {
  aftbData: AftbData;
}

function blankTypeFromStrategy(blankStrategy: BlankPositionStrategy): AdditionBlankPosition {
  switch (blankStrategy) {
    case 'addends':
      return randomElement(blankTypesAddends);

    case 'addend a':
      return 'addendA';

    case 'addend b':
      return 'addendB';

    case 'random':
      return randomElement(blankTypes);

    default:
      return 'sum';
  }
}

interface AdditionAndMeta {
  addition: Addition;
  blank: AdditionBlankPosition;
}

type ItemBuilder = (showAnser: boolean) => Builder<AdditionAndMeta>;

function PreviewAftb({
  aftbData,
}: PreviewAftbProps): JSX.Element {
  const data = generateAdditionSentences(aftbData).map((addition) => {
    const { blankStrategy } = aftbData;
    const blank = blankTypeFromStrategy(blankStrategy);
    return {
      addition,
      blank,
    } as AdditionAndMeta;
  });

  const itemBuilder: ItemBuilder = (showAnswer) => {
    const keyPrefix = showAnswer ? 'answer' : 'problem';
    return function builder(addMeta, index) {
      const { blank, addition } = addMeta;
      return (
        <AdditionSentence
          key={`${keyPrefix}-${index}`}
          addition={addition}
          blank={blank}
          fontSize={aftbData.fontSize}
          showAnswer={showAnswer}
        />
      );
    };
  };

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
        data-testid="problems"
        data={data}
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage<AdditionAndMeta>
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{ className: 'answers', label: 'Answers', columns: aftbData.columns }}
        data={data}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewAftb;
