it('shows basic content', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.contains('Math Worksheets');
  cy.contains('Copyright');

  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /number grid/i }).click();
  });

  cy.hasCustomizeFormHeading(/number grid/i);
  cy.visitHome();
});
