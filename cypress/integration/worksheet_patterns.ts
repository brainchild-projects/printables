it('can create patterns worksheet', () => {
  cy.visitWorksheetPatterns();

  cy.findByLabelText(/number of problems/i).clear().type('5');

  cy.withinPreview(() => {
    cy.get('ol.problems > li').should('have.length', 5);
    cy.get('ol.problems').find('li').each(($li) => {
      cy.wrap($li).contains(/[□▢▭▯▱△▷▽◁◇○◸◹◺◿⬭⬯⬠⬡☆♡]+/);
    });
  });
});
