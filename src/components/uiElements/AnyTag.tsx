import React from 'react';

// AnyTag is anything that a JSX tag can be.
type AnyTag = string
| React.FunctionComponent<never>
| (new (props: never) => React.Component);

export default AnyTag;
