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

  // Vertical Addition Worksheets
  goBackHome();
  clickWorksheetLink(/vertical.+addition/i);
  cy.hasCustomizeFormHeading(/vertical.+addition/i);

  // Addition and Subtraction
  goBackHome();
  clickWorksheetLink(/addition.+subtraction/i);
  cy.hasCustomizeFormHeading(/addition.+subtraction/i);

  // Subtraction with Figures
  goBackHome();
  clickWorksheetLink(/subtraction.+figures/i);
  cy.hasCustomizeFormHeading(/subtraction.+figures/i);

  // Subtraction
  goBackHome();
  clickWorksheetLink(/subtraction.+fill.+blank/i);
  cy.hasCustomizeFormHeading(/subtraction.+fill.+blank/i);

  // Pattern Worksheets
  goBackHome();
  clickWorksheetLink(/patterns/i);
  cy.hasCustomizeFormHeading(/patterns/i);

  // Place Value Worksheets
  goBackHome();
  clickWorksheetLink(/place values/i);
  cy.hasCustomizeFormHeading(/place values/i);

  // Numbers to Words
  goBackHome();
  clickWorksheetLink(/numbers to words/i);
  cy.hasCustomizeFormHeading(/numbers to words/i);

  // Telling Time
  goBackHome();
  clickWorksheetLink(/telling time/i);
  cy.hasCustomizeFormHeading(/telling time/i);

  // Number Grid
  goBackHome();
  clickWorksheetLink(/number grid/i);
  cy.hasCustomizeFormHeading(/number grid/i);

  // Skip Counting
  goBackHome();
  clickWorksheetLink(/skip counting/i);
  cy.hasCustomizeFormHeading(/skip counting/i);

  // Settings Page
  goBackHome();
  cy.findByRole('button', { name: /open menu/i }).click();
  cy.findByRole('navigation', { name: /sidebar/i })
    .find('a:contains("Settings")')
    .click();
  cy.findByRole('button', { name: /close menu/i }).click();
  cy.findByRole('heading', { name: /settings/i });
});
