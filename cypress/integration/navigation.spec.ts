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

  // Addition Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /addition.+fill.+blank/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /addition.+fill.+blank/i });
  });

  // Back home
  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });

  // Pattern Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /patterns/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /patterns/i });
  });

  // Back home
  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });

  // Place Value Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /place values/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /place values/i });
  });
});
