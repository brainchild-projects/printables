it('can create subtraction fill in the blanks worksheets', () => {
  cy.visitWorksheetSubtractionFillInTheBlanks();

  cy.findByLabelText(/count/i).clearType('15');

  cy.findByLabelText(/problem.+generation/i).should('have.value', 'minuend');
  cy.findByLabelText(/blank position/i).select('Random');
  cy.setNumberRange(/minuend/i, 3, 4);

  cy.withinPreview(() => {
    cy.contains(/[34]\s+-\s+[0-4]\s+=\s+_+/);
    cy.contains(/_+\s+-\s+[0-4]\s+=\s+\d/);
  });

  cy.findByLabelText(/problem.+generation/i).select('Subtrahend and Difference');
  cy.setNumberRange(/subtrahend/i, 3, 4);
  cy.setNumberRange(/difference/i, 5, 6);
  cy.findByLabelText(/count/i).clearType('28');
  cy.findByLabelText(/columns/i).clearType('3');
  cy.findByLabelText(/blank position/i).select('Difference');

  cy.withinPreview(() => {
    // Problems
    cy.problemListItems()
      .should('have.length', 28)
      .each(($li) => {
        cy.wrap($li).contains(/([8-9]|10)\s+-\s+[3-6]\s+=\s+_+/);
      });

    // Answers
    cy.answerListItems()
      .should('have.length', 28)
      .each(($li) => {
        cy.wrap($li).contains(/([8-9]|10)\s+-\s+[3-6]\s+=\s+\d/);
      });
  });
});
