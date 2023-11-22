/* eslint-disable cypress/no-unnecessary-waiting */
it('shows basic content', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.contains('Math Worksheets');
  cy.contains('Copyright');

  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /number grid/i }).click();
  });

  // The following is just for the server to warm up
  // TODO: Fix this when we figure out how to solve this slow warm up phase
  cy.wait(5000);
  cy.hasCustomizeFormHeading(/number grid/i);
  cy.wait(5000);
  cy.visitHome();
});