it('can create telling time worksheet', () => {
  cy.visitWorksheetTellingTime();

  cy.findByLabelText(/count/i).clearType(7);

  cy.withinPreview(() => {
    cy.problemListItems()
      .should('have.length', 7);
  });
});
