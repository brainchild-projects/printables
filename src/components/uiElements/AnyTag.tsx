import { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTag = ComponentType<any> | keyof JSX.IntrinsicElements;

export default AnyTag;
