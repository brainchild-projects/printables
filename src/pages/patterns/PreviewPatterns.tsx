/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';
import FontLoad from '../../components/FontLoad.js';
import MultiPaperPage from '../../components/MultiPaperPage.js';
import ProblemList from '../../components/ProblemList.js';
import ProblemListItem from '../../components/ProblemListItem.js';
import WorksheetFooter from '../../components/printElements/WorksheetFooter.js';
import WorksheetHeader from '../../components/printElements/WorksheetHeader.js';
import PatternGenerator from '../../lib/PatternGenerator.js';
import randomElement from '../../lib/randomElement.js';
import PatternsData, { BlankPosition } from './PatternsData.js';
import { randomGenerator } from '../../lib/RandomNumberGenerator.js';
import PageTitle from '../../elements/PageTitle.js';
import Blank from '../../components/Blank.js';
import Square from '../../components/svgShapes/outlined/Square.js';
import Rectangle from '../../components/svgShapes/outlined/Rectangle.js';
import Parallelogram from '../../components/svgShapes/outlined/Parallelogram.js';
import Triangle from '../../components/svgShapes/outlined/Triangle.js';
import Diamond from '../../components/svgShapes/outlined/Diamond.js';
import Circle from '../../components/svgShapes/outlined/Circle.js';
import Oval from '../../components/svgShapes/outlined/Oval.js';
import Pentagon from '../../components/svgShapes/outlined/Pentagon.js';
import Hexagon from '../../components/svgShapes/outlined/Hexagon.js';
import Star from '../../components/svgShapes/outlined/Star.js';
import Heart from '../../components/svgShapes/outlined/Heart.js';
import styleIt from '../../components/styleIt.js';

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

const problemStyles = styleIt(() => ({
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
    display: 'inline-block',
    minWidth: 32,
    textAlign: 'center',
  },
  underline: {
    color: 'transparent',
  },
}));

const shapeWidth = 40;

const shapeEquivalents = new Map([
  ['□', <Square width={shapeWidth} />],
  ['▭', <Rectangle width={shapeWidth} />],
  ['▱', <Parallelogram width={shapeWidth} />],
  ['△', <Triangle width={shapeWidth} />],
  ['◇', <Diamond width={shapeWidth} />],
  ['○', <Circle width={shapeWidth} />],
  ['⬯', <Oval width={shapeWidth} />],
  ['⬠', <Pentagon width={shapeWidth} />],
  ['⬡', <Hexagon width={shapeWidth} />],
  ['☆', <Star width={shapeWidth} />],
  ['♡', <Heart width={shapeWidth} />],
]);

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
          elements.map((shapeStr, index): JSX.Element => {
            const shape = shapeEquivalents.get(shapeStr) ?? '';
            return (
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
                          blankWidth={`${shapeWidth}px`}
                        />
                      </span>
                    )
                    : (<span className="problem-shape">{shape}</span>)
                }
              </span>
            );
          })
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
            <p>
              {patternsData.blankPosition === 'end' ? 'What comes next? ' : ''}
              Complete the pattern by drawing the correct shape on the blank.
            </p>
          </WorksheetHeader>
        )}
        footer={(<WorksheetFooter itemCount={data.length} />)}
        wrapper={ProblemList}
        data={data}
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
        renderItems={itemBuilder(true)}
      />
    </>
  );
}

export default PreviewPatterns;
