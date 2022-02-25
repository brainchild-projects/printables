import React from 'react';

interface Stringable {
  toString: () => string;
}

function stringMapToOptions(map: Map<string, string | number | Stringable>): Array<JSX.Element> {
  return Array.from(map.entries()).map(([value, label]) => (
    <option key={value} value={value}>{label}</option>
  ));
}

export default stringMapToOptions;
