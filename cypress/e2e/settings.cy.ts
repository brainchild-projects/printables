it('can set settings', () => {
  cy.visitSettings();

  // Default Paper Size
  cy.findByLabelText(/default paper size/i).select('A4');

  cy.visitCalendar();
  cy.withinCustomizeForm(() => {
    cy.findByLabelText(/paper size/i).should('have.value', 'A4');
  });

  // Custom Paper Size
  cy.visitSettings();
  cy.findByRole('region', { name: /paper sizes/i }).within(() => {
    cy.findByRole('button', { name: /add/i }).click();
  });

  cy.findByRole('dialog', { name: /add/i }).within(() => {
    cy.findByLabelText(/name/i).clearType('Big Paper');
    cy.findByLabelText(/width/i).clearType('300');
    cy.findByLabelText(/height/i).clearType('400');
    cy.findByRole('button', { name: /save/i }).click();
  });
  // Check if we saved it
  cy.findByRole('list', { name: /paper sizes/i }).within(() => {
    cy.findByRole('listitem')
      .contains('Big Paper');
    cy.findByRole('listitem')
      .contains(/300mm.+400mm/i);
  });
});
