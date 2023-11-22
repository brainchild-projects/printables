it('can create number grid worksheet', () => {
  cy.visitWorksheetNumberGrid();

  let n = 1;
  cy.findByRole('table', { name: 'Number Grid' })
    .findAllByRole('cell')
    .each(($cell) => {
      cy.wrap($cell).contains(n.toString());
      n += 1;
    });

  cy.toggleOnSwitch(/skip counting/i);
  cy.findByLabelText(/skip count by/i).clearType(5);

  cy.findByRole('section', { name: /answer key/i })
    .within(() => {
      let k = 1;
      cy.findByRole('table', { name: 'Number Grid' })
        .findAllByRole('cell')
        .each(($cell) => {
          cy.wrap($cell).should(
            k % 5 === 0 ? 'have.class' : 'not.have.class',
            'highlight',
          );
          k += 1;
        });
    });
});
