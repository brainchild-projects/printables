/* eslint-disable react/no-array-index-key */
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import FontLoad from '../../components/FontLoad';
import MultiPaperPage from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PatternGenerator from '../../lib/PatternGenerator';
import randomElement from '../../lib/randomElement';
import PatternsData, { BlankPosition } from './PatternsData';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import PageTitle from '../../elements/PageTitle';
import Blank from '../../components/Blank';

interface PreviewPatternsProps {
  patternsData: PatternsData;
}

const patternTypes = [
  'ABC',
  'AAB',
  'ABA',
  'ABB',
  'ABCD',
  'AABB',
  'AABC',
  'ABBC',
  'ABCC',
];

interface PatternProblem {
  elements: string[];
  blankIndex: number;
}

const problemStyles = makeStyles(() => ({
  listItem: {
    paddingTop: '0.15em',
    paddingBottom: '0.15em',
  },
  pattern: {
    fontSize: 48,
    fontFamily: "'Sawarabi Gothic', sans-serif",
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  patternElement: {
    padding: '0 2mm',
  },
  problemBlank: {
    borderColor: 'black',
    paddingLeft: '1mm',
    paddingRight: '1mm',
    display: 'inline-block',
    minWidth: 32,
    textAlign: 'center',
  },
  underline: {
    color: 'transparent',
  },
}));

interface PatternProblemDisplayProps extends PatternProblem {
  showAnswer: boolean;
}

function PatternProblemDisplay({
  elements, blankIndex, showAnswer,
}: PatternProblemDisplayProps): JSX.Element {
  const classes = problemStyles();
  return (
    <ProblemListItem
      className={classNames('pattern-problem-item', classes.listItem)}
    >
      <div className={classes.pattern}>
        {
          elements.map((shape, index): JSX.Element => (
            <span className={classes.patternElement} key={`pattern-${index}`}>
              {
                index === (blankIndex)
                  ? (
                    <span className={classes.problemBlank}>
                      <Blank
                        showAnswer={showAnswer}
                        answer={shape}
                        width="narrow"
                        lineWidth="2px"
                      />
                    </span>
                  )
                  : (<span className="problem-shape">{shape}</span>)
              }
            </span>
          ))
        }
      </div>
    </ProblemListItem>
  );
}

function getBlankPositionIndex(length: number, pos: BlankPosition): number {
  const positionMax = length - 1;
  switch (pos) {
    case 'start':
      return 0;

    case 'random':
      return randomGenerator.integer(positionMax);

    default:
      return positionMax;
  }
}

function generatePatternProblems({ count, blankPosition }: PatternsData): PatternProblem[] {
  const generator = PatternGenerator.create(8);
  const problems: PatternProblem[] = [];
  for (let i = 0; i < count; i++) {
    const elements = generator.generate(randomElement<string>(patternTypes));
    const blankIndex = getBlankPositionIndex(elements.length, blankPosition);
    problems.push({
      elements,
      blankIndex,
    });
  }
  return problems;
}

function itemBuilder(showAnswer: boolean) {
  return function builder(
    { elements, blankIndex: blankPosition }: PatternProblem,
    index: number,
  ) {
    return (
      <PatternProblemDisplay
        key={`problem-${index}`}
        elements={elements}
        blankIndex={blankPosition}
        showAnswer={showAnswer}
      />
    );
  };
}

function PreviewPatterns({ patternsData }: PreviewPatternsProps): JSX.Element {
  const data = generatePatternProblems(patternsData);

  return (
    <>
      <FontLoad href="https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&amp;display=swap" />
      <MultiPaperPage
        header={(
          <WorksheetHeader>
            <p>What comes next? Complete the pattern by drawing the correct shape on the blank.</p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={data.length} />)}
        wrapper={ProblemList}
        data={data}
        itemSelector=".pattern-problem-item"
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
        }}
        data={data}
        itemSelector=".subtraction-with-figures-problem-item"
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewPatterns;
