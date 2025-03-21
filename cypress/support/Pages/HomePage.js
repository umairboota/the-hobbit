class HomePage {
    // Elements
    searchInput() {
      return cy.get('#q');
    }
  
    exactMatchCheckbox() {
      return cy.get('#ftcb');
    }
  
    pageCountDropdown() {
      return cy.get('#select2-select-pagecount-container');
    }
  
    pageCountOption(text) {
      return cy.get('.select2-results__option').contains(text);
    }
  
    pubYearDropdown() {
      return cy.get('#select2-select-pubyear-container');
    }
  
    pubYearOption(text) {
      return cy.get('.select2-results__option').contains(text);
    }
  
    languageDropdown() {
      return cy.get('#select2-select-searchin-container');
    }
  
    languageSearchInput() {
      return cy.get('.select2-search__field');
    }
  
    languageOption(text) {
      return cy.get('.select2-results__option').contains(text);
    }
  
    searchResult(text) {
      return cy.get('ul > li h2').contains(text);
    }
  
    previewButton() {
      return cy.get('#previewButtonMain');
    }
  
    goToRemoteFolderButton() {
      return cy.get('#goToFileButtonMemberModal');
    }
  
    alternativesParent() {
      return cy.get('div#alternatives.mt-2');
    }
  
    downloadButton() {
      return cy.get('a.btn.btn-success.btn-responsive');
    }
  
    // Actions
    visit() {
      cy.visit('/');
    }
  
    searchForBook(bookName) {
      this.searchInput().should('be.visible').type(`${bookName}{enter}`);
    }
  
    checkExactMatch() {
      this.exactMatchCheckbox().check({ force: true }).should('be.checked');
    }
  
    selectPageCount(optionText) {
      this.pageCountDropdown().click();
      this.pageCountOption(optionText).click();
    }
  
    selectPubYear(optionText) {
      this.pubYearDropdown().click();
      this.pubYearOption(optionText).click();
    }
  
    selectLanguage(language) {
      this.languageDropdown().click();
      this.languageSearchInput().type(language);
      this.languageOption(language).click();
    }
  
    clickSearchResult(bookName) {
      this.searchResult(bookName).click();
    }
  
    clickPreviewButton() {
      this.previewButton().click();
    }
  
    clickGoToRemoteFolderButton() {
      this.goToRemoteFolderButton().click();
    }
  
    downloadPdf() {
      this.alternativesParent()
        .should('exist', { timeout: 80000 }) 
        .within(() => {
          this.downloadButton()
            // .should('be.visible')
            .then(($downloadButton) => {
              const pdfUrl = $downloadButton.attr('href');
              cy.log('PDF URL:', pdfUrl);
  
              // Download the PDF
              cy.request({
                url: pdfUrl,
                encoding: 'binary',
              }).then((response) => {
                const fixturesFolder = 'cypress/fixtures';
                const pdfFilePath = `${fixturesFolder}/The_Hobbit.pdf`;
                cy.writeFile(pdfFilePath, response.body, 'binary');
                cy.log(`PDF file saved to ${pdfFilePath}`);
              });
            });
        });
    }
  }
  
  export default new HomePage();