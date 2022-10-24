import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CustomizeForm from './CustomizeForm';
import InstanceOptionsProvider from '../InstanceSettingsProvider';

describe('CustomizeForm', () => {
  describe('when there are errors', () => {
    beforeEach(() => {
      const callback = () => true;
      render(
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

  describe('Printing Tips', () => {
    let printBefore: () => void;
    beforeEach(() => {
      printBefore = window.print;
      window.print = vi.fn();
      const callback = () => true;
      render(
        <InstanceOptionsProvider>
          <CustomizeForm
            name="Foo"
            onBeforePrint={callback}
          >
            Hello
          </CustomizeForm>
        </InstanceOptionsProvider>,
      );
    });

    afterEach(() => {
      window.print = printBefore;
    });

    describe('when print help button is clicked', () => {
      beforeEach(() => userEvent.click(screen.getByLabelText('Printing Tips')));

      it('shows printing help text dialog', () => {
        expect(screen.getByText(/Make sure to match/i)).toBeInTheDocument();
      });
    });
  });
});
