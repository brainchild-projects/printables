it('can create patterns worksheet', () => {
  cy.visitWorksheetPatterns();

  cy.findByLabelText(/number of problems/i).clearType('5');
  cy.findByLabelText(/blank position/i).select('Start');
  cy.findByLabelText(/blank position/i).select('Random');

  cy.withinPreview(() => {
    cy.problemListItems()
      .should('have.length', 5);
    cy.get('ol.problems').find('li').each(($li) => {
      cy.wrap($li).contains(
        /(heart|circle|square|diamond|triangle|rectangle|oval|hexagon|pentagon|star|parallelogram)+/,
      );
    });
  });
});
