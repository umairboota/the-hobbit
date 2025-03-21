// import 'cypress-iframe';

describe("Home page", () => {

    it("Search for 'The Hobbit' and preview PDF", () => {

        // Step 1 - Navigate to website
        cy.visit("https://www.pdfdrive.com/");

        // Step 2 - Search "The Hobbit" in the search bar
        cy.get('#q').should('be.visible').type("The Hobbit{enter}");

        // Step 3 - Check 'Exact Match' checkbox
        cy.get('#ftcb').should('be.visible').check({ force: true }).should('be.checked');

        // Step 4 - Select the page count (1-24) from dropdown (Select2)
        cy.get('#select2-select-pagecount-container').click();
        cy.get('.select2-results__option').contains('1-24').click();

        // Step 5 - Select the publisher year (After 2010)
        cy.get('#select2-select-pubyear-container').click();
        cy.get('.select2-results__option').contains('After 2010').click();

        // Step 6 - Search and select language (English)
        cy.get('#select2-select-searchin-container').click();
        cy.get('.select2-search__field').type('English');
        cy.get('.select2-results__option').contains('English').click();

        // Step 7 - Click the first search result for "The Hobbit"
        cy.get('ul > li h2').contains('The Hobbit').click();

        // Step 8 - Click on preview button
        cy.get('#previewButtonMain').click();

        // Step 9 - Wait for iframe to load and scroll inside it

        // step 10 - downlaod the pdf

        cy.get('#goToFileButtonMemberModal').click();
        cy.intercept('GET', '**/ads/**', { statusCode: 403 }).as('blockAds');

        cy.wait(1000);
        cy.get('.btn.btn-success.btn-responsive', { timeout: 30000 })
            .should('be.visible')
            .click();


            cy.task("downloadFile", {
                url: "PDF_DOWNLOAD_LINK_HERE",
                directory: "cypress/fixtures",
                filename: "downloaded.pdf",
              });
          
              // Verify the PDF exists
              cy.readFile("cypress/fixtures/downloaded.pdf").should("exist");

    });


});
