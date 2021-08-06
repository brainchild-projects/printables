it('can set print options', () => {
  cy.visitAdditionFillTheBlanks();

  cy.findByLabelText(/orientation/i).select('portrait');
  cy.findByLabelText(/paper size/i).select('A4');

  cy.findByRole('region', { name: /paper.+page 1/i })
    .invoke('height')
    .shouldHaveMmLength(297);
  cy.findByRole('region', { name: /paper.+page 1/i })
    .invoke('width')
    .shouldHaveMmLength(210);

  cy.findByLabelText(/orientation/i).select('landscape');
  cy.findByRole('region', { name: /paper.+page 2/i })
    .invoke('width')
    .shouldHaveMmLength(297);

  cy.findByRole('region', { name: /paper.+page 1/i })
    .invoke('height')
    .shouldHaveMmLength(210);

  cy.findByLabelText(/paper size/i).select('US Letter');
  cy.findByRole('region', { name: /paper.+page 1/i })
    .invoke('height')
    .shouldHaveMmLength(216);
});
