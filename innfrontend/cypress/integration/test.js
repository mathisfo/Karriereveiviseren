describe("Page renders", () => {
    it("renders page", () => {
      cy.visit("http://localhost:3000");
      cy.get("div").contains("Heihei");
    });
  });
  
  