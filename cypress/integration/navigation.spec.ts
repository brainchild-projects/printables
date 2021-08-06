it('can visit all subpages', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.findByRole('link', { name: /calendar/i }).click();
  cy.findByRole('button', { name: /print calendar/i });

  // Back home
  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });
  cy.contains(/Printable Materials for Education/i);

  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /addition.+fill.+blank/i }).click();
  });

  cy.findByRole('region', { name: /customize form/i }).within(() => {
    cy.findByRole('heading', { name: /addition.+fill.+blank/i });
  });
});
