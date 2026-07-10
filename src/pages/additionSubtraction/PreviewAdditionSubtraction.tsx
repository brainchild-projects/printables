import React from 'react';
import MultiPaperPage, { Builder } from '../../components/MultiPaperPage.js';
import AdditionSubtractionItem, {
  blankTypes, blankTypesAddends, generateItems,
} from './AdditionSubtractionItem.js';
import AdditionSubtractionData from './AdditionSubtractionData.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import PageTitle from '../../elements/PageTitle.js';
import ProblemList from '../../components/ProblemList.js';
import { randomGenerator } from '../../lib/RandomNumberGenerator.js';
import Addition from '../../lib/math/Addition.js';
import { AdditionAddends, AdditionBlankPosition } from '../../components/math/AdditionSentenceBasic.js';

interface PreviewAddSubProps {
  data: AdditionSubtractionData;
}

interface AdditionAndMeta {
  addition: Addition;
  blank: AdditionBlankPosition;
  subtrahend: AdditionAddends;
}

type ItemBuilder = (showAnser: boolean) => Builder<AdditionAndMeta>;

function blankType(): AdditionBlankPosition {
  return blankTypes[randomGenerator.integer(blankTypes.length - 1)];
}

function subtrahendToUse(): AdditionAddends {
  return blankTypesAddends[randomGenerator.integer(blankTypesAddends.length - 1)];
}

function PreviewAddSub({ data }: PreviewAddSubProps): JSX.Element {
  const theData = generateItems(data).map((addition) => {
    const blank = blankType();
    const subtrahend = subtrahendToUse();
    return {
      addition,
      blank,
      subtrahend,
    } as AdditionAndMeta;
  });

  const itemBuilder: ItemBuilder = (showAnswer) => {
    const keyPrefix = showAnswer ? 'answer' : 'problem';
    return function builder(addMeta, index) {
      const { addition, blank, subtrahend } = addMeta;

      return (
        <AdditionSubtractionItem
          key={`${keyPrefix}-${index}`}
          blank={blank}
          blanksOnAddition={data.blanksOnAddition}
          addition={addition}
          subtrahend={subtrahend}
          fontSize={data.fontSize}
          showAnswer={showAnswer}
          subtractionFirst={data.subtractionFirst}
        />
      );
    };
  };

  return (
    <>
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>Complete the addition and subtraction facts by filling in the blanks.</p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={theData.length} />)}
        wrapper={ProblemList}
        wrapperProps={{ columns: data.columns }}
        data-testid="problems"
        data={theData}
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage<AdditionAndMeta>
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{ className: 'answers', label: 'Answers', columns: data.columns }}
        data={theData}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewAddSub;
