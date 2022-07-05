it('can create numbers to words worksheet', () => {
  cy.visitWorksheetNumbersToWords();

  cy.findByLabelText(/number of problems/i).clearType('7');
  cy.findByLabelText(/magnitude/i).select('Hundreds');
  cy.withinPreview(() => {
    cy.findByRole('list', { name: 'Problems' }).within((subject) => {
      cy.wrap(subject).findAllByRole('listitem')
        .should('have.length', 7)
        .each(($li) => {
          cy.wrap($li).contains(/[a-z\-\s]+:\s+_+/);
        });
    });
  });
});
