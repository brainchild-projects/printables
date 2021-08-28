/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

interface LinkRouterProps {
  to: string,
  children: React.ReactNode,
}

export default function LinkRouter({ children, to }: LinkRouterProps): JSX.Element {
  return (
    <Link component={RouterLink} to={to}>{children}</Link>
  );
}
