it('can create vertical addition worksheets', () => {
  cy.visitWorksheetVerticalAddition();

  cy.findByLabelText(/count/i).clearType('12');

  cy.setNumberRange(/range$/i, 2, 3);

  cy.withinPreview(() => {
    cy.contains(/2\s+\+\s+3/);
  });

  cy.findByLabelText('Problem Generation').select('Custom Addends');
  cy.setNumberRange(/addend.+a/i, 2, 3);
  cy.setNumberRange(/addend.+b/i, 4, 5);
  cy.findByLabelText(/count/i).clearType('50');
  cy.findByLabelText(/columns/i).clearType('5');

  cy.withinPreview(() => {
    // Problems
    cy.problemListItems()
      .should('have.length', 50)
      .each(($li) => {
        cy.wrap($li).contains(/([23]\s+\+\s+[45]|[45]\s+\+\s+[23])/);
      });

    // Answers
    cy.answerListItems()
      .should('have.length', 50)
      .each(($li) => {
        cy.wrap($li).contains(/([23]\s+\+\s+[45].+[678]|[45]\s+\+\s+[23].+[678])/);
      });
  });
});
