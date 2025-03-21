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
  
      // Step 9 - Click on "Go to Remote Folder"
      cy.get('#goToFileButtonMemberModal').click();
  
      // Block ads
      cy.intercept('GET', '**/ads/**', { statusCode: 403 }).as('blockAds');
  
      // Wait for the download button to be visible and click it
      cy.get('.btn.btn-success.btn-responsive', { timeout: 30000 })
        .should('be.visible')
        .then(($downloadButton) => {
          // Extract the PDF URL from the download button's href attribute
          const pdfUrl = $downloadButton.attr('href');
          cy.log('PDF URL:', pdfUrl);
  
          // Step 10 - Download the PDF using cy.request()
          cy.request({
            url: pdfUrl,
            encoding: 'binary',
          }).then((response) => {
            // Save the PDF file to the fixtures folder
            const fixturesFolder = 'cypress/fixtures'; // Path to the fixtures folder
            const pdfFilePath = `${fixturesFolder}/The_Hobbit.pdf`;
  
            // Write the file to the fixtures folder
            cy.writeFile(pdfFilePath, response.body, 'binary');
            cy.log(`PDF file saved to ${pdfFilePath}`);
          });
        });
    });
  });