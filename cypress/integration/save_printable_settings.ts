it('can save changes in settings', () => {
  cy.clock(Date.parse('July 8, 2021'));
  cy.visitAdditionFillTheBlanks();
  cy.findByLabelText(/number of problems/i).clearType('40');
  cy.setNumberRange(/number range/i, 1, 5);
  cy.findByLabelText(/blank.+position/i).select('Addends');

  cy.visitCalendar();
  cy.findByLabelText(/month/i).select('December');
  cy.findByLabelText(/year/i).select('2024');

  // Check if the settings were saved
  cy.visitAdditionFillTheBlanks();
  cy.findByLabelText(/number of problems/i).invoke('val').should('equal', '40');
  cy.findByLabelText(/from/i).invoke('val').should('equal', '1');
  cy.findByLabelText(/^to/i).invoke('val').should('equal', '5');
  cy.findByLabelText(/blank.+position/i).invoke('val').should('equal', 'addends');

  cy.visitCalendar();
  cy.findByLabelText(/month/i).invoke('val').should('equal', '11');
  cy.findByLabelText(/year/i).invoke('val').should('equal', '2024');
});
