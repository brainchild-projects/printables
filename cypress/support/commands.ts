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

import paths, { VisitPathMapKeys } from './visitPaths.js';
const pathNames = Object.keys(paths) as VisitPathMapKeys[];

// Helper so TypeScript knows what we're capitalizing
const capitalize = <T extends string>(s: T): Capitalize<T> =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;

// I don't know why you can't express this directly on the interface declaration below
export type VisitCommands = {
  // The folloowing create the typed methods to something like:
  //   visitHome: () => Cypress.Chainable<Cypress.AUTWindow>
  [K in VisitPathMapKeys as `visit${Capitalize<K>}`]: () => Cypress.Chainable<Cypress.AUTWindow>;
};

// Custom `within{something}` methods
const withinElements = {
  preview: /preview/i,
  customizeForm: /customize form/i,
  answerKey: /Answer Key/i,
} as const satisfies { [k: string]: RegExp }

type WithinElementsKeys = keyof typeof withinElements;

type WithinElementCommands = {
  [K in WithinElementsKeys as `within${Capitalize<K>}`]: (
    fn: (currentSubject: JQuery) => void
  ) => Cypress.Chainable<JQuery>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Chainable<Subject = any> extends VisitCommands, WithinElementCommands {
      mmToPixel(mmLength: number): Chainable<number>;
      shouldHaveMmLength(mmLength: number): Chainable<Subject>;
      shouldHaveFontSize(size: number): Chainable<Subject>;
      shouldHaveColumns(count: number): Chainable<Subject>;
      reactComponent(fn?: (prevSubject: Subject) => void): Chainable<Subject>;
      setNumberRange(label: string | RegExp, min: number, max: number): Chainable<Subject>;
      findPaperPage(page: number): Chainable<Subject>;
      clearType(value: string | number): Chainable<Subject>;
      hasCustomizeFormHeading(text: string | RegExp): Chainable<Subject>;
      problemListItems(): Chainable<Subject>;
      answerListItems(): Chainable<Subject>;
      toggleOnSwitch(label: string | RegExp): Chainable<Subject>;
      toggleOffSwitch(label: string | RegExp): Chainable<Subject>;
    }
  }
}

// Register all visit commands dynamically
(pathNames).forEach((key) => {
  // With the help of typed capitalization method above, TS knows that we're
  // transforming 'home' to 'visitHome', etc.
  const methodName = `visit${capitalize(key)}` as const;

  Cypress.Commands.add(methodName, () => {
    return cy.visit(paths[key]);
  });
});

type WithinCallback = (currentSubject: JQuery<HTMLElement>) => void;

(Object.keys(withinElements) as WithinElementsKeys[]).forEach((key) => {
  const methodName = `within${capitalize(key)}` as const;

  Cypress.Commands.add(
    methodName,
    (callback: WithinCallback) => {
      const nameMatcher = withinElements[key];
      return cy.findByRole('region', { name: nameMatcher }).within(callback);
    }
  );
});

Cypress.Commands.add(
  'hasCustomizeFormHeading',
  (heading) => cy.withinCustomizeForm(() => cy.findByRole('heading', { name: heading })),
);

Cypress.Commands.add(
  'withinAnswerKey',
  (callback) => cy.findByRole('region', { name: /Answer Key/i }).within(callback),
);

Cypress.Commands.add(
  'mmToPixel',
  (mmLength) => cy.get('body').then(($body: JQuery<HTMLBodyElement>) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `width: ${mmLength}mm; height: 2px; position: absolute; margin: 0; padding: 0; border: none;`;
    $body.append(tempDiv);
    const width = Math.round(tempDiv.getBoundingClientRect().width);

    // TODO: should we return cy.wrap(width)
    return width;
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

Cypress.Commands.add(
  'shouldHaveFontSize',
  { prevSubject: true },
  (subject: Element[], size) => cy.window().then((win: Cypress.AUTWindow) => {
    const style = win.getComputedStyle(subject[0]);
    return cy.wrap(style.fontSize).should('eql', `${size}px`);
  }),
);

Cypress.Commands.add(
  'shouldHaveColumns',
  { prevSubject: true },
  (subject: Element[], count) => cy.window().then((win: Cypress.AUTWindow) => {
    const style = win.getComputedStyle(subject[0]);
    return cy.wrap(style.columnCount).should('eql', count.toString());
  }),
);

Cypress.Commands.add('findPaperPage', (page) => cy.findByRole('region', { name: new RegExp(`paper.+page ${page}`, 'i') }));
Cypress.Commands.add('clearType', { prevSubject: true }, (subject: Element[], value) => {
  cy.wrap(subject).clear();
  cy.wrap(subject).type(value.toString());
});

Cypress.Commands.add(
  'problemListItems',
  () => cy.findAllByRole('list', { name: /problems/i }).find('li'),
);

Cypress.Commands.add(
  'answerListItems',
  () => cy.findAllByRole('list', { name: /answers/i }).find('li'),
);

Cypress.Commands.add(
  'toggleOffSwitch',
  (label) => cy.findByLabelText(label).uncheck(),
);

Cypress.Commands.add(
  'toggleOnSwitch',
  (label) => cy.findByLabelText(label).check(),
);

Cypress.Commands.add('reactComponent', {
  prevSubject: 'element',
}, ($el) => {
  if ($el.length !== 1) {
    throw new Error(`cy.component() requires element of length 1 but got ${$el.length}`);
  }
  // Query for key starting with __reactInternalInstance$ for React v16.x
  const key = Object.keys($el.get(0)).find((aKey) => aKey.startsWith('__reactFiber$'));
  if (key === undefined) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: better type declaration here
  const domFiber = $el.prop(key) as { return: any };
  Cypress.log({
    name: 'component',
    consoleProps() {
      return {
        component: domFiber,
      };
    },
  });

  return domFiber.return;
});

Cypress.Commands.add('setNumberRange', (label, min, max) => cy.findAllByLabelText(label)
  .first()
  .parent()
  .then(($el: JQuery) => {
    const $root = $el.closest('.numberRangeSlider');
    const $from = $root.find('input[name="rangeFrom"]');
    const $to = $root.find('input[name="rangeTo"]');
    cy.wrap($root).scrollIntoView({ offset: { top: -150, left: 0 } });
    cy.wrap($from).clearType(min.toString());
    return cy.wrap($to).clearType(max.toString());
  }));
