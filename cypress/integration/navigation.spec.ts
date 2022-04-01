function goBackHome() {
  cy.findByRole('banner').within(() => {
    cy.findByText('Printables').click();
  });
}

function clickWorksheetLink(linkText: LabelPattern) {
  cy.findByRole('list', { name: /worksheets/i }).within(() => {
    cy.findByRole('link', { name: linkText }).click();
  });
}

it('can visit all subpages', () => {
  cy.visitHome();
  cy.contains('Printables');
  cy.findByRole('link', { name: /calendar/i }).click();
  cy.findByRole('button', { name: /print calendar/i });

  goBackHome();

  cy.contains(/Printable Materials for Education/i);

  // Addition Worksheets
  clickWorksheetLink(/addition.+fill.+blank/i);
  cy.hasCustomizeFormHeading(/addition.+fill.+blank/i);

  goBackHome();

  // Addition and Subtraction
  clickWorksheetLink(/addition.+subtraction/i);
  cy.hasCustomizeFormHeading(/addition.+subtraction/i);

  goBackHome();

  // Pattern Worksheets
  clickWorksheetLink(/patterns/i);
  cy.hasCustomizeFormHeading(/patterns/i);

  goBackHome();

  // Place Value Worksheets
  clickWorksheetLink(/place values/i);
  cy.hasCustomizeFormHeading(/place values/i);

  goBackHome();

  // Numbers to Words
  clickWorksheetLink(/numbers to words/i);
  cy.hasCustomizeFormHeading(/numbers to words/i);
});
