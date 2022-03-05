function goBackHome() {
  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });
}

it('can visit all subpages', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.findByRole('link', { name: /calendar/i }).click();
  cy.findByRole('button', { name: /print calendar/i });

  goBackHome();

  cy.contains(/Printable Materials for Education/i);

  // Addition Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /addition.+fill.+blank/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /addition.+fill.+blank/i });
  });

  goBackHome();

  // Pattern Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /patterns/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /patterns/i });
  });

  goBackHome();

  // Place Value Worksheets
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /place values/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /place values/i });
  });

  goBackHome();

  // Numbers to Words
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: /numbers to words/i }).click();
  });

  cy.withinCustomizeForm(() => {
    cy.findByRole('heading', { name: /numbers to words/i });
  });
});
