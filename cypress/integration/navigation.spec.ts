describe('Navigation', () => {
  it('can visit all subpages', () => {
    cy.visit('/');
    cy.contains('Printables');
    cy.findByRole('link', { name: /calendar/i }).click();
    cy.findByRole('button', { name: /generate/i }).click();
  });
});
