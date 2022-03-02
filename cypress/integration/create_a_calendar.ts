/* eslint-disable promise/no-nesting */
it('can create a calendar', () => {
  cy.clock(Date.parse('July 8, 2021'));
  cy.visitCalendar();

  cy.findByLabelText(/month/i).select('August');
  cy.findByLabelText(/year/i).select('2022');

  const days = [
    /^sun/i,
    /^mon/i,
    /^tue/i,
    /^wed/i,
    /^thu/i,
    /^fri/i,
    /^sat/i,
  ];

  const firstWeekDates = [
    31,
    1,
    2,
    3,
    4,
    5,
    6,
  ];

  cy.withinPreview(() => {
    cy.contains('August 2022');
    cy.findAllByRole('columnheader')
      .should('have.length', 7)
      .each(($th, index) => {
        cy.wrap($th).contains(days[index]);
      });

    cy.get('tbody > tr:first-child > td')
      .each(($td, index) => {
        cy.wrap($td).contains(firstWeekDates[index]);
      });
  });

  void cy.window().then((win) => {
    const printStub = cy.stub(win, 'print');

    void cy.findByRole('button', { name: /print\s+calendar/i }).click().then(() => {
      void cy.findByRole('button', { name: /got\s+it/i }).click().then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(printStub).to.be.called;
      });
    });
  });

  // TODO: 2022-03-02 - The following spec fails because there's a bug with tick and clock
  // See: https://github.com/cypress-io/cypress/issues/7834
  //
  // New day comes
  // cy.clock(Date.parse('July 10, 2021'));
  // void cy.tick(3600 * 1000 * 48).then(() => {
  //   cy.visitHome();
  //   cy.visitCalendar();
  //   return cy.withinPreview(() => {
  //     cy.contains('July 2021');
  //   });
  // });
});
