import React, { ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import styleIt from './styleIt';

const styles = styleIt(() => ({
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));

interface ListItemLinkProps {
  to: To;
  children?: ReactNode | undefined;
  className?: string | undefined;
}

function ListItemLink({ to, children, className }: ListItemLinkProps): JSX.Element {
  const classes = styles();
  return (
    <li className={className}>
      <Link
        to={to}
        className={classes.link}
      >
        {children}
      </Link>
    </li>
  );
}

ListItemLink.defaultProps = {
  children: undefined,
  className: undefined,
};

export default ListItemLink;
