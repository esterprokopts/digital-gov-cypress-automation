class GovHomePage {
  visit() {
    cy.visit("https://www.gov.il/he/");
  }

  getSearchButton() {
    return cy
      .get('button[aria-controls="popup"][aria-haspopup="true"]')
      .should("contain.text", "חפשו שירות או מידע");
  }

  openSearch() {
    this.getSearchButton()
      .should("be.visible")
      .click();
  }

  getSearchPopup() {
    return cy.get('div[role="dialog"][aria-labelledby="תיבת חיפוש"]');
  }

  getSuggestionsArea() {
    return cy.get("#searchSuggestions");
  }

  getMaybeInterestedTitle() {
    return cy.contains("span", "אולי יעניין אותך");
  }

  getTrendLinks() {
    return cy.get('a[id^="trands_"]');
  }

  clickSuggestedService() {
    return cy.get("#trands_3").click();
  }
}

export default GovHomePage;