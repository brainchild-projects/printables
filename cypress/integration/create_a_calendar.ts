it('can create a calendar', () => {
  cy.clock(Date.parse('July 8, 2021'));
  cy.visitCalendar();

  cy.findByRole('listbox', { name: /month/i }).select('August');
  cy.findByRole('listbox', { name: /year/i }).select('2022');
  cy.findByRole('button', { name: /generate/i }).click();

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
  cy.findByRole('region', { name: /preview/i }).within(() => {
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
    cy.findByRole('button', { name: /print/i }).click();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(printStub).to.be.called;
  });
});
