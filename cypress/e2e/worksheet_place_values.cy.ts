it('can create place values worksheet', () => {
  cy.visitWorksheetPlaceValues();

  cy.findByLabelText(/number of problems/i).clearType('5');
  cy.findByLabelText(/magnitude/i).select('Hundreds');

  cy.withinPreview(() => {
    cy.contains(/_+\s+hundreds,\s+_+\s+tens\s+and\s+_+\s+ones\s+=\s+[1-9]\d\d/i);
    cy.findAllByRole('listitem', { name: /problem/i }).should('have.length', 5);
  });

  cy.findByLabelText(/number of problems/i).clearType('10');
  cy.findByLabelText(/magnitude/i).select('Tens');

  cy.withinPreview(() => {
    cy.contains(/_+\s+tens\s+and\s+_+\s+ones\s+=\s+[1-9]\d/i);
    cy.findAllByRole('listitem', { name: /problem/i }).should('have.length', 10);
  });

  cy.withinPreview(() => {
    cy.findByRole('list', { name: /answers/i }).within(() => {
      cy.contains(/\d\s+tens\s+and\s+\d\s+ones\s+=\s+[1-9]\d/i);
      cy.findAllByRole('listitem', { name: /answer/i }).should('have.length', 10);
    });
  });

  cy.findByLabelText(/problem type/i).select('Multiple Choice');
  cy.findByLabelText(/magnitude/i).select('Hundreds');

  cy.withinPreview(() => {
    cy.findAllByRole('listitem', { name: /choice/i })
      .each((item) => {
        cy.wrap(item).within(() => {
          cy.contains(/hundreds|tens|ones/i);
        });
      });
  });

  cy.findByLabelText(/magnitude/i).select('thousands');

  cy.withinPreview(() => {
    cy.findAllByRole('listitem', { name: /choice/i })
      .each((item) => {
        cy.wrap(item).within(() => {
          cy.contains(/thousands|hundreds|tens|ones/i);
        });
      });
  });
});
