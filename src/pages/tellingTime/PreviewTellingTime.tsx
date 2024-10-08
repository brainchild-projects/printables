import React from 'react';
import MultiPaperPage from '../../components/MultiPaperPage';
import PageTitle from '../../elements/PageTitle';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import TellingTimeData from './TellingTimeData';
import SimpleTime from './SimpleTime';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import Range from '../../lib/Range';
import randomElement from '../../lib/randomElement';
import ClockFace from './ClockFace';
import Blank from '../../components/Blank';
import tryByKey from '../../lib/tryByKey';
import styleIt from '../../components/styleIt';

const hourRange: Range = { from: 1, to: 12 };
const minuterRange: Range = { from: 0, to: 59 };

function generateProblems({ problemType, count }: TellingTimeData): SimpleTime[] {
  const problems: SimpleTime[] = [];
  let minuteGen: () => number;
  switch (problemType) {
    case 'hours':
      minuteGen = () => 0;
      break;

    case 'hours and half hours':
      minuteGen = () => randomElement([0, 30]);
      break;

    case '5-minute intervals':
      minuteGen = () => randomGenerator.integerR({ from: 0, to: 11 }) * 5;
      break;

    default:
      minuteGen = () => randomGenerator.integerR(minuterRange);
      break;
  }
  const limitedRetries = tryByKey();
  while (problems.length < count) {
    const hour = randomGenerator.integerR(hourRange);
    const minute = minuteGen();
    limitedRetries([hour, minute], () => {
      problems.push(
        new SimpleTime(hour, minute),
      );
    });
  }

  return problems;
}

const itemStyles = styleIt(() => ({
  wrapper: {
    display: 'inline-block',
    verticalAlign: 'text-top',
    textAlign: 'center',
    paddingBottom: '4mm',
  },
}));

function itemBuilder(
  showAnswer: boolean,
) {
  const classes = itemStyles();
  function fn(time: SimpleTime, indexNumber: number) {
    return (
      <ProblemListItem
        key={`problem-${indexNumber}`}
        className="telling-time-problem-item"
        label={`Telling Time ${showAnswer ? 'Answer' : 'Problem'}`}
      >
        <div className={classes.wrapper}>
          <ClockFace hour={time.hour} minute={time.minute} />
          <Blank answer={time.toString()} showAnswer={showAnswer} width="wide" />
        </div>
      </ProblemListItem>
    );
  }
  return fn;
}

interface PreviewTellingTimeProps {
  data: TellingTimeData;
}

function PreviewTellingTime({ data }: PreviewTellingTimeProps): JSX.Element {
  const problems = generateProblems(data);
  const instructions = 'Write the time shown on the clock.';

  return (
    <>
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>{instructions}</p>
          </WorksheetHeader>
        )}
        wrapper={ProblemList}
        footer={(<WorksheetFooter itemCount={problems.length} />)}
        wrapperProps={{
          className: 'problems',
          columns: data.columns,
        }}
        data={problems}
        renderItems={itemBuilder(false)}
      />
      <MultiPaperPage
        header={(
          <PageTitle>Answer Key</PageTitle>
        )}
        wrapper={ProblemList}
        wrapperProps={{
          className: 'answers',
          label: 'Answers',
          columns: data.columns,
        }}
        data={problems}
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewTellingTime;
