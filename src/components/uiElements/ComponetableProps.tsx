import { ComponentType } from 'react';

type ComponetablePaperProps<Tag extends keyof JSX.IntrinsicElements> = {
  component?: ComponentType | keyof JSX.IntrinsicElements;
  className?: string | undefined;
} & JSX.IntrinsicElements[Tag];

export default ComponetablePaperProps;

