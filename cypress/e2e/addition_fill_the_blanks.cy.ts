it('can create fill in the blanks addition worksheets', () => {
  cy.visitAdditionFillTheBlanks();

  cy.findByLabelText(/number of problems/i).clearType('25');

  cy.setNumberRange(/number range$/i, 2, 3);

  cy.withinPreview(() => {
    cy.contains('2 + 3 = ');
  });
  cy.findByLabelText(/blank position/i).select('Addends');
  cy.withinPreview(() => {
    cy.contains(/_ \+ [23] = [56]/);
  });

  cy.findByLabelText(/blank position/i).select('Random');
  cy.withinPreview(() => {
    cy.contains(/_ \+ [23] = [56]/);
    cy.contains(/[23] \+ _+ = [56]/);
    cy.contains(/[23] \+ [23] = _/);
  });

  cy.findByLabelText(/problem.+generation/i).select('Custom Addends');
  cy.setNumberRange(/addend a/i, 2, 3);
  cy.setNumberRange(/addend b/i, 4, 5);
  cy.findByLabelText(/blank position/i).select('Sum');
  cy.findByLabelText(/number of problems/i).clearType('19');
  cy.withinPreview(() => {
    cy.get('ol.problems').find('li').each(($li) => {
      cy.wrap($li).contains(/[23] \+ [45]|[45] \+ [23]/);
    });
  });

  cy.findByLabelText(/problem.+generation/i).select('Custom Sum');
  cy.setNumberRange(/sum/i, 6, 7);
  cy.findByLabelText(/blank position/i).select('Addends');

  cy.withinPreview(() => {
    cy.contains(/_ \+ [0-7] = [67]/);
    cy.contains(/[0-7] \+ _+ = [67]/);
  });
});
