it('can create skip counting worksheet', () => {
  cy.visitWorksheetSkipCounting();
  cy.findByLabelText(/count$/i).clearType(6);
  cy.findByLabelText(/skip count by/i).clearType(5);
  cy.findByLabelText(/columns/i).clearType(2);

  cy.withinPreview(() => {
    cy.problemListItems()
      .should('have.length', 6)
      .each(($li) => {
        cy.wrap($li).contains(/[\d_]+\s*,\s*[\d_]+$/);
      });

    cy.answerListItems()
      .should('have.length', 6)
      .each(($li) => {
        cy.wrap($li).contains(/\d+\s*,\s*\d+$/);
      });
  });
});
