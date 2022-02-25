import React from 'react';
import Stringable from '../../lib/Stringable';

function arrayToOptions(arr: Array<string | number | Stringable>): Array<JSX.Element> {
  return Array.from(arr.values()).map((val) => (
    <option key={val.toString()} value={val.toString()}>{val}</option>
  ));
}

export default arrayToOptions;
