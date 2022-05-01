/* eslint-disable react/no-array-index-key */
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import FontLoad from '../../components/FontLoad';
import MultiPaperPage, { Builder } from '../../components/MultiPaperPage';
import ProblemList from '../../components/ProblemList';
import ProblemListItem from '../../components/ProblemListItem';
import WorksheetFooter from '../../components/printElements/WorksheetFooter';
import WorksheetHeader from '../../components/printElements/WorksheetHeader';
import PatternGenerator from '../../lib/PatternGenerator';
import randomElement from '../../lib/randomElement';
import PatternsData from './PatternsData';

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
    borderBottom: '2px solid',
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

function PatternProblemDisplay({ elements }: PatternProblem): JSX.Element {
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
                index === (elements.length - 1)
                  ? (
                    <span className={classes.problemBlank}>
                      <span className={classes.underline}>__</span>
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

function generatePatternProblems({ count }: PatternsData): PatternProblem[] {
  const generator = PatternGenerator.create(8);
  const problems: PatternProblem[] = [];
  for (let i = 0; i < count; i++) {
    const elements = generator.generate(randomElement<string>(patternTypes));
    problems.push({ elements });
  }
  return problems;
}

function PreviewPatterns({ patternsData }: PreviewPatternsProps): JSX.Element {
  const data = generatePatternProblems(patternsData);
  const itemBuilder: Builder<PatternProblem> = (
    { elements }: PatternProblem,
    index: number,
  ) => (
    <PatternProblemDisplay key={`problem-${index}`} elements={elements} />
  );

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
        renderItems={itemBuilder}
      />
    </>
  );
}

export default PreviewPatterns;
