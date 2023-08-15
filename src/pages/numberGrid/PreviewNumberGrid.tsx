import React from 'react';
import { Box } from '@material-ui/core';
import PaperPage from '../../components/PaperPage';
import NumberGridData from './NumberGridData';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import NumberGrid from './NumberGrid';
import PageTitle from '../../elements/PageTitle';
import styleIt from '../../components/styleIt';

interface PreviewNumberGridProps {
  data: NumberGridData,
}

const styles = styleIt(() => ({
  wrap: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
  },

}));

// eslint-disable-next-line complexity
function toOrdinal(n: number): string {
  const nString = n.toString();
  const { length } = nString;
  if (length > 1) {
    const last2N = parseFloat(nString.substring(length - 2));
    if (last2N > 10 && last2N < 14) {
      return `${n}th`;
    }
  }
  const lastN = parseFloat(nString[length - 1]);
  switch (lastN) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;

    default:
      return `${n}th`;
  }
}

function getInstructions({
  customInstructions, skipCountToggle, skipCount,
}: NumberGridData): string | undefined {
  if (customInstructions !== undefined && customInstructions !== '') {
    return customInstructions;
  }
  if (skipCountToggle && skipCount !== undefined) {
    return `Skip count by ${skipCount}’s by coloring or shading every ${toOrdinal(skipCount)} number’s cell.`;
  }
  return undefined;
}

function PreviewNumberGrid({ data }: PreviewNumberGridProps): JSX.Element {
  const { skipCount, skipCountToggle } = data;
  const instructions = getInstructions(data);
  const classes = styles();
  const skipCountBy = skipCountToggle ? skipCount : undefined;

  return (
    <>
      <PaperPage noFlexWrap>
        <Box className={classes.wrap}>
          <WorksheetHeader>
            {
              instructions
                ? (
                  <p>
                    {instructions}
                    <br />
                    &nbsp;
                  </p>
                )
                : <p>&nbsp;</p>
            }
          </WorksheetHeader>
          <NumberGrid skipCount={skipCountBy} showAnswer={false} />
        </Box>
      </PaperPage>
      {
        skipCountToggle ? (
          <section aria-label="Answer Key">
            <PaperPage noFlexWrap>
              <Box className={classes.wrap}>
                <PageTitle>Answer Key</PageTitle>
                <p>&nbsp;</p>
                <NumberGrid skipCount={skipCountBy} showAnswer />
              </Box>
            </PaperPage>
          </section>
        ) : null
      }

    </>
  );
}

export default PreviewNumberGrid;
