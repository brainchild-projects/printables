it('can create subtraction with figures worksheets', () => {
  cy.visitWorksheetSubtractionWithFigures();

  cy.findByLabelText(/count/i).clearType('12');

  cy.setNumberRange(/minuend/i, 5, 6);

  cy.withinPreview(() => {
    cy.contains(/[56]\s+-\s+[0-6]\s+=\s+\d/);
  });

  cy.findByLabelText(/problem.+generation/i).select('Subtrahend and Difference');
  cy.setNumberRange(/subtrahend/i, 2, 3);
  cy.setNumberRange(/difference/i, 4, 5);
  cy.findByLabelText(/count/i).clearType('30');
  cy.findByLabelText(/columns/i).clearType('3');

  cy.withinPreview(() => {
    // Problems
    cy.problemListItems()
      .should('have.length', 30)
      .each(($li) => {
        cy.wrap($li).contains(/[6-8]\s+-\s+[23]\s+=/);
      });

    // Answers
    cy.answerListItems()
      .should('have.length', 30)
      .each(($li) => {
        // TODO: Change it back when https://github.com/cypress-io/cypress/issues/21108 is fixed
        // cy.wrap($li).contains(/[6-8]\s+-\s+[23]\s+=\s+[45]/);
        cy.wrap($li).contains(/[6-8]\s+-\s+[23]\s+=\s+\d/);
      });
  });
});
