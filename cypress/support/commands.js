// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

const paths = {
  home: '/',
  calendar: '/calendar',
  additionFillTheBlanks: '/addition-fill-the-blanks',
};

const pathNames = Object.keys(paths);

for (const name of pathNames) {
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
  const path = paths[name];
  Cypress.Commands.add(`visit${capitalName}`, () => {
    cy.visit(path);
  });
}

Cypress.Commands.add(
  'withinPreview',
  (callback) => cy.findByRole('region', { name: /preview/i }).within(callback),
);

Cypress.Commands.add(
  'mmToPixel',
  (mmLength) => cy.get('body').then(($el) => {
    $el.append(`
      <div
        style="width: ${mmLength}mm; height: 2px; position: absolute; margin: 0; padding: 0; border: none;vis"
        id="sizeEstimationToPixel"
      ></div>
    `);
    const $estimateEl = $el.find('#sizeEstimationToPixel');
    const length = Math.round($estimateEl.width());
    $estimateEl.remove();
    return length;
  }),
);

const lengths = new Map();
Cypress.Commands.add(
  'shouldHaveMmLength',
  {
    prevSubject: true,
  },
  (subject, mmLength) => {
    if (lengths.has(mmLength)) {
      const pixelLength = lengths.get(mmLength);
      return cy.wrap(Math.round(subject)).should('eql', pixelLength);
    }
    return cy.mmToPixel(mmLength)
      .then(
        (pixelLength) => {
          lengths.set(mmLength, pixelLength);
          return cy.wrap(Math.round(subject)).should('eql', pixelLength);
        },
      );
  },
);
