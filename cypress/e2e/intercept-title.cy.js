describe("Gov.il - Intercept and change title", () => {

  it("should change breadcrumbs title to 'office'", () => {

    cy.intercept("GET", "**/govil-landing-page-api/**", (req) => {

      req.continue((res) => {

        const breadcrumbs = res.body?.breadcrumbsObject?.breadcrumbs;

        if (breadcrumbs) {
          const pageBreadcrumb = breadcrumbs.find(
            (item) => item.id === "breadcrumbs_page"
          );

          if (pageBreadcrumb) {
            pageBreadcrumb.title = "office";
          }
        }

      });

    }).as("changeTitle");

    cy.visit("https://www.gov.il/he/departments/prime_ministers_office", {
      failOnStatusCode: false
    });

    cy.wait("@changeTitle");

    // בדיקה שהטקסט החדש מופיע
    cy.contains("office").should("exist");
  });

});