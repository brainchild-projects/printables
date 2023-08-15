import React, { ReactNode } from 'react';
import styleIt from '../styleIt';

const headerStyles = styleIt(() => ({
  header: {
    display: 'flex',
    marginTop: 20,
  },
  headerName: {
    flexGrow: '4',
    display: 'flex',
    paddingRight: '2em',
  },
  label: {
    flexGrow: '0',
    fontWeight: 'normal',
    paddingRight: '0.3em',
  },
  headerDate: {
    flexGrow: '2',
    display: 'flex',
  },
  headerBlank: {
    flexGrow: '1',
    borderBottom: '1px solid black',
  },
  instructions: {
    marginBottom: 0,
    marginTop: '10mm',
    fontSize: 16,
  },
}));

interface WorksheetHeaderProps {
  children: ReactNode;
}

function WorksheetHeader({ children }: WorksheetHeaderProps): JSX.Element {
  const classes = headerStyles();
  return (
    <>
      <section className={classes.header}>
        <div className={classes.headerName}>
          <strong className={classes.label}>Name:</strong>
          <span className={classes.headerBlank} />
        </div>
        <div className={classes.headerDate}>
          <strong className={classes.label}>Date:</strong>
          <span className={classes.headerBlank} />
        </div>
      </section>
      <div className={classes.instructions}>
        { children }
      </div>
    </>
  );
}

export default WorksheetHeader;
