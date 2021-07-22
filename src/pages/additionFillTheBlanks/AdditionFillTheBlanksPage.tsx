import React from 'react';
import PrintableUI from '../../components/PrintableUI';

const AdditionFillTheBlanksPage = (): JSX.Element => (
  <PrintableUI
    title="Addition: Fill the Blanks"
    customizeForm={<p>Something here</p>}
  >
    <h1>Preview Addition</h1>
  </PrintableUI>
);

export default AdditionFillTheBlanksPage;
