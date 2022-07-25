it('can create compare numbers worksheet', () => {
  cy.visitWorksheetCompareNumbers();

  cy.findByLabelText(/count/i).clearType('8');
  cy.findByLabelText(/magnitude/i).select('Hundreds');
  cy.findByLabelText(/columns/i).clearType('2');
  cy.withinPreview(() => {
    cy.findByRole('list', { name: 'Problems' }).within((subject) => {
      cy.wrap(subject).findAllByRole('listitem')
        .should('have.length', 8)
        .each(($li) => {
          cy.wrap($li).contains(/\d+\s+_+\s+\d+/);
        });
    });

    cy.findByRole('list', { name: 'Answers' }).within((subject) => {
      cy.wrap(subject).findAllByRole('listitem')
        .should('have.length', 8)
        .each(($li) => {
          cy.wrap($li).contains(/\d+\s+(<|>|=)\s+\d+/);
        });
    });
  });
});
