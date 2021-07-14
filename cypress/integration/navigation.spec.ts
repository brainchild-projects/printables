it('can visit all subpages', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.findByRole('link', { name: /calendar/i }).click();
  cy.findByRole('button', { name: /print calendar/i });

  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });
  cy.contains(/Printable Materials for Education/i);
});
