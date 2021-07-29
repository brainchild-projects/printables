import React from 'react';
import PaperPage from '../../components/PaperPage';
import AftbData from './AftbData';

interface PreviewAftbProps {
  aftbData: AftbData;
}

const PreviewAftb = ({ aftbData }: PreviewAftbProps): JSX.Element => (
  <PaperPage>
    <h1>
      Hello
      {' '}
      {Math.random()}
    </h1>
  </PaperPage>
);

export default PreviewAftb;
