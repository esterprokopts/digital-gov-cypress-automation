import GovHomePage from "../pages/GovHomePage";

describe("Gov.il - Header search component", () => {
  const govHomePage = new GovHomePage();

  beforeEach(() => {
    // פתיחת האתר לפני כל טסט כדי להבטיח מצב נקי
    govHomePage.visit();
  });

  it("should display search button in header", () => {
    // בדיקה שהכפתור של החיפוש קיים ונראה למשתמש
    govHomePage.getSearchButton().should("be.visible");
  });

  it("should open search popup after clicking search button", () => {
    // פעולה: פתיחת החיפוש
    govHomePage.openSearch();

    // בדיקה: חלון החיפוש נפתח
    govHomePage.getSearchPopup().should("be.visible");
  });

  it("should display search suggestions after opening search", () => {
    // פעולה: פתיחת החיפוש
    govHomePage.openSearch();

    // בדיקה: אזור ההצעות מוצג
    govHomePage.getSuggestionsArea().should("be.visible");

    // בדיקה: כותרת "אולי יעניין אותך" קיימת
    govHomePage.getMaybeInterestedTitle().should("contain.text", "אולי יעניין אותך");
  });

  it("should display suggested links", () => {
    // פעולה: פתיחת החיפוש
    govHomePage.openSearch();

    // בדיקה: קיימים קישורים מוצעים (לפחות אחד)
    govHomePage.getTrendLinks().should("have.length.greaterThan", 0);
  });

  it("should navigate after clicking suggested service", () => {
    // פעולה: פתיחת החיפוש
    govHomePage.openSearch();

    // פעולה: לחיצה על שירות מוצע
    govHomePage.clickSuggestedService();

    // בדיקה: מעבר לעמוד אחר (ניווט תקין)
    cy.url().should("include", "government-service-branches");
  });

});