import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomizeForm from './CustomizeForm';

describe('CustomizeForm', () => {
  describe('when there are errors', () => {
    beforeEach(() => {
      const callback = () => true;
      return render(
        <CustomizeForm
          name="Foo"
          onBeforePrint={callback}
          error="This is an error"
        >
          Hello
        </CustomizeForm>,
      );
    });

    it('should display error message', () => {
      const error = screen.queryByText('This is an error');
      expect(error).toBeInTheDocument();
    });

    it('should disable print button', () => {
      const button = screen.getByRole('button', { name: 'Print Foo' });
      expect(button).toBeDisabled();
    });
  });
});
