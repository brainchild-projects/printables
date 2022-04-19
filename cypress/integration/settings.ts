it('can set settings', () => {
  cy.visitSettings();

  // Default Paper Size
  cy.findByLabelText(/default paper size/i).select('A4');

  cy.visitCalendar();
  cy.withinCustomizeForm(() => {
    cy.findByLabelText(/paper size/i).should('have.value', 'A4');
  });
});
