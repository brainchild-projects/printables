import React from 'react';
import Stringable from '../../lib/Stringable';
import asTitleized from '../../lib/titlelize';

function arrayToOptions(
  arr: Array<string | number | Stringable>,
  titleize = false,
): Array<JSX.Element> {
  return Array.from(arr.values()).map((val) => {
    const valStr = val.toString();
    return (
      <option
        key={valStr}
        value={valStr}
      >
        {titleize ? asTitleized(valStr) : val}
      </option>
    );
  });
}

export default arrayToOptions;
