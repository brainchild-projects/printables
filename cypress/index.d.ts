type LabelPattern = string | RegExp;
declare namespace Cypress {
  interface Chainable {

    visitCalendar(): Chainable<AUTWindow>;
    visitHome(): Chainable<AUTWindow>;
    visitSettings(): Chainable<AUTWindow>;
    visitAdditionFillTheBlanks(): Chainable<AUTWindow>;
    visitWorksheetPatterns(): Chainable<AUTWindow>;
    visitWorksheetPlaceValues(): Chainable<AUTWindow>;
    visitWorksheetNumbersToWords(): Chainable<AUTWindow>;
    visitWorksheetAdditionSubtraction(): Chainable<AUTWindow>;
    visitWorksheetVerticalAddition(): Chainable<AUTWindow>;
    visitWorksheetSubtractionWithFigures(): Chainable<AUTWindow>;
    visitWorksheetSubtractionFillInTheBlanks(): Chainable<AUTWindow>;
    visitWorksheetTellingTime(): Chainable<AUTWindow>;
    visitWorksheetNumberGrid(): Chainable<AUTWindow>;
    visitWorksheetSkipCounting(): Chainable<AUTWindow>;
    visitWorksheetCompareNumbers(): Chainable<AUTWindow>;
  }

  interface Chainable<Subject> {
    withinPreview(fn: (currentSubject: Subject) => void): Chainable<Subject>;
    withinCustomizeForm(fn: (currentSubject: Subject) => void): Chainable<Subject>;
    mmToPixel(mmLength: number): Chainable<number>;
    shouldHaveMmLength(mmLength: number): Chainable<Subject>;
    shouldHaveFontSize(size: number): Chainable<Subject>;
    shouldHaveColumns(count: number): Chainable<Subject>;
    reactComponent(fn?: (prevSubject: Subject) => void): Chainable<Subject>;
    setNumberRange(label: string | RegExp, min: number, max: number): Chainable<Subject>;
    findPaperPage(page: number): Chainable<Subject>;
    clearType(value: string | number): Chainable<Subject>;
    hasCustomizeFormHeading(text: LabelPattern): Chainable<Subject>;
    problemListItems(): Chainable<Subject>;
    answerListItems(): Chainable<Subject>;
    toggleOnSwitch(label: string | RegExp): Chainable<Subject>;
    toggleOffSwitch(label: string | RegExp): Chainable<Subject>;
  }
}
