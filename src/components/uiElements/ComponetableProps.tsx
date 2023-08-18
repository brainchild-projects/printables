import { ComponentType } from 'react';

type ComponetablePaperProps<Tag extends keyof JSX.IntrinsicElements> = {
  component?: ComponentType | keyof JSX.IntrinsicElements;
  className?: string;
} & JSX.IntrinsicElements[Tag];

export default ComponetablePaperProps;

