it('can set print options', () => {
  cy.visitAdditionFillTheBlanks();

  cy.findByLabelText(/orientation/i).select('portrait');
  cy.findByLabelText(/paper size/i).select('A4');

  cy.findPaperPage(1)
    .invoke('height')
    .shouldHaveMmLength(297);
  cy.findPaperPage(1)
    .invoke('width')
    .shouldHaveMmLength(210);

  cy.findByLabelText(/orientation/i).select('landscape');
  cy.findPaperPage(2)
    .invoke('width')
    .shouldHaveMmLength(297);

  cy.findPaperPage(1)
    .invoke('height')
    .shouldHaveMmLength(210);

  cy.findByLabelText(/paper size/i).select('US Letter');
  cy.findPaperPage(1)
    .invoke('height')
    .shouldHaveMmLength(216);
});
