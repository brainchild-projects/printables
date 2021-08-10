it('can create fill in the blanks addition worksheets', () => {
  cy.visitAdditionFillTheBlanks();

  cy.get('[data-cy="single-range-slider"]')
    .reactComponent()
    .its('memoizedProps')
    .invoke('onChange', null, [2, 3]);
  cy.findByLabelText(/number of problems/i).clear().type('25');
  cy.withinPreview(() => {
    cy.contains('2 + 3 = ');
  });
  cy.findByLabelText('Blank').select('Addends');
  cy.withinPreview(() => {
    cy.contains(/_ \+ [23] = [56]/);
  });

  cy.findByLabelText('Blank').select('Random');
  cy.withinPreview(() => {
    cy.contains(/_ \+ [23] = [56]/);
    cy.contains(/[23] \+ _+ = [56]/);
    cy.contains(/[23] \+ [23] = _/);
  });
});
