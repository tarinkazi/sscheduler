describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  //Find a specific day
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});