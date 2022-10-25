it('shows header', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.contains('Math Worksheets');
  cy.contains('Copyright');
});
