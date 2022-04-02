it('can create addition-subtraction relationship worksheets', () => {
  cy.visitWorksheetAdditionSubtraction();

  cy.setNumberRange(/number range$/i, 2, 3);
  cy.findByLabelText(/number of problems/i).clearType('25');

  cy.withinPreview(() => {
    cy.contains(/name/i);
    cy.contains(/\w+\s+[_23]_* \+ [_23]_* = [56_]_*\s+\w+\s+[56_]_* - [_23]_* = [_23]_*/);
  });

  cy.findByLabelText('Problem Generation').select('Custom Addends');
  cy.setNumberRange(/addend a/i, 2, 3);
  cy.setNumberRange(/addend b/i, 4, 5);
  cy.findByLabelText(/number of problems/i).clearType('50');
  cy.withinPreview(() => {
    cy.get('ol.problems').find('li').each(($li) => {
      cy.wrap($li).contains(/Since\s+[_2345]_* \+ [_2345]_* = [_678]_*\s+Then\s+[678_]_* - [_2345]_* = [_2345]_*/);
    });
  });
});
