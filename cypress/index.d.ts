declare namespace Cypress {
  interface Chainable {
    visitCalendar(): Chainable<AUTWindow>;
    visitHome(): Chainable<AUTWindow>;
  }
}
