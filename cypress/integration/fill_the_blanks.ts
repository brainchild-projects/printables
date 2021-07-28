it('can create fill in the blanks addition worksheets', () => {
  cy.visitAdditionFillTheBlanks();

  cy.findByLabelText(/number of problems/i).clear().type('25');
  cy.findByLabelText(/from/i).clear().type('2');
  cy.findByLabelText('To').clear().type('3');
});
