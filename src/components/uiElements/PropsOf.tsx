import React from 'react';

// PropsOf tries to get the expected properties for a given HTML tag name or component.
type PropsOf<Tag> =
Tag extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Tag] :
  Tag extends React.ComponentType<infer Props> ? Props & JSX.IntrinsicAttributes :
    never;

export default PropsOf;
