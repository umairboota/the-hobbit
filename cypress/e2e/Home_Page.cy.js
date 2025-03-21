import HomePage from '../support/pages/HomePage';

describe("Home page", () => {
  it("Search for 'The Hobbit' and preview PDF", () => {
    // Step 1 - Navigate to website
    HomePage.visit();

    // Step 2 - Search "The Hobbit" in the search bar
    HomePage.searchForBook('The Hobbit');

    // Step 3 - Check 'Exact Match' checkbox
    HomePage.checkExactMatch();

    // Step 4 - Select the page count (1-24) from dropdown (Select2)
    HomePage.selectPageCount('1-24');

    // Step 5 - Select the publisher year (After 2010)
    HomePage.selectPubYear('After 2010');

    // Step 6 - Search and select language (English)
    HomePage.selectLanguage('English');

    // Step 7 - Click the first search result for "The Hobbit"
    HomePage.clickSearchResult('The Hobbit');

    // Step 8 - Click on preview button
    HomePage.clickPreviewButton();

    // Step 9 - Click on "Go to Remote Folder"
    HomePage.clickGoToRemoteFolderButton();

    // Block ads
    cy.intercept('GET', '**/ads/**', { statusCode: 403 }).as('blockAds');

    // Step 10 - Download the PDF
    HomePage.downloadPdf();
  });
});