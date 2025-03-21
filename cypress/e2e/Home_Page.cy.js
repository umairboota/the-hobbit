import HomePage from '../support/pages/HomePage';

describe("Home page", () => {
    it("Search for 'The Hobbit', preview PDF, and validate text", () => {
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
        // cy.wait('@blockAds');

        // Step 10 - Download the PDF
        const pdfFilePath = 'cypress/downloads/The_Hobbit.pdf';
        HomePage.downloadPdf(pdfFilePath);

        // Step 11 - Verify file exists
        cy.readFile(pdfFilePath, { timeout: 15000 }).should('exist');

        // Step 12 - Validate text in the downloaded PDF
        cy.task("readPdf", pdfFilePath).then((pdfText) => {
            expect(pdfText).to.contain(
                "This guide was written in 1981 by Robert Foster. It has been updated and revised by Amy " +
                "Jurskis to now include the Common Core State Standards."
            );
        });
    });
});