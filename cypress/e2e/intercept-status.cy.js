describe("Gov.il - Filters API", () => {
  it("should intercept filter requests and validate status code", () => {
    cy.intercept("GET", "**GetTaxonomiesList?collectionName=cities**").as("citiesRequest");
    cy.intercept("GET", "**GetAggregationCategories**").as("categoriesRequest");
    cy.intercept("GET", "**GetAggregationCities**").as("aggregationCitiesRequest");
    cy.intercept("GET", "**/BureausWebApi/Bureaus**").as("bureausRequest");

    cy.visit("https://www.gov.il/he/government-service-branches/?limit=10&skip=0", {
      failOnStatusCode: false
    });

    cy.wait("@citiesRequest").its("response.statusCode").should("eq", 200);

    cy.get('button[title="פתיחת חיפוש מתקדם"]')
      .should("be.visible")
      .click({ force: true });

    cy.get('input#accessibility')
      .should("exist")
      .check({ force: true });

    cy.wait("@categoriesRequest", { timeout: 15000 }).its("response.statusCode").should("eq", 200);
    cy.wait("@aggregationCitiesRequest", { timeout: 15000 }).its("response.statusCode").should("eq", 200);
    cy.wait("@bureausRequest", { timeout: 15000 }).its("response.statusCode").should("eq", 200);
  });
});