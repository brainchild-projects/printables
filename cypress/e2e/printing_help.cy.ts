/* eslint-disable promise/no-nesting */
it('shows printing help for first time users and as ncessary', () => {
  cy.visitAdditionFillTheBlanks();

  void cy.window().then((win) => {
    const printStub = cy.stub(win, 'print');
    void cy.findByRole('button', { name: /print\s+worksheet/i }).click().then(() => {
      expect(printStub).not.to.be.called;
    });
    cy.contains(/make sure to match/i);
    void cy.findByRole('button', { name: /got\s+it/i }).click().then(() => {
      expect(printStub).to.be.called;
      void cy.findByRole('button', { name: /print\s+worksheet/i }).click().then(() => {
        expect(printStub).to.be.calledTwice;
      });
    });
  });
});
