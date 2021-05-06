describe("Cypress TypeScript", () => {
  it("works", () => {
    cy.wrap({ life: 30 }).its("life").should("equal", 30);
  });
});
