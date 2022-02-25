it('can change worksheet appearance', () => {
  cy.visitAdditionFillTheBlanks();

  cy.findByLabelText(/font size/i).select('24');
  cy.findAllByRole('listitem', { name: /problem/i }).first().shouldHaveFontSize(24);

  cy.findByLabelText(/font size/i).select('20');
  cy.findAllByRole('listitem', { name: /problem/i }).first().shouldHaveFontSize(20);
});
