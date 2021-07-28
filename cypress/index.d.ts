declare namespace Cypress {
  interface Chainable {

    visitCalendar(): Chainable<AUTWindow>;
    visitHome(): Chainable<AUTWindow>;
    visitAdditionFillTheBlanks(): Chainable<AUTWindow>;
  }

  interface Chainable<Subject> {
    withinPreview(fn: (currentSubject: Subject) => void): Chainable<Subject>;
  }
}
