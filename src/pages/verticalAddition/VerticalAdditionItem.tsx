import React from 'react';
import Addition from '../../lib/math/Addition';
import VerticalOperationItem from '../../components/math/VerticalOperationItem';


interface VerticalAdditionItemProps {
  add: Addition;
  showAnswer: boolean;
}

export default function VerticalAdditionItem({
  add, showAnswer,
}: VerticalAdditionItemProps): JSX.Element {
  return (
    <VerticalOperationItem
      numbers={[add.addendA, add.addendB]}
      answer={add.sum()}
      operator="+"
      showAnswer={showAnswer}
      label="Vertical Addition"
      className="vertical-addition-problem-item"
    />
  );
}
