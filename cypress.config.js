const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const pdf = require('pdf-parse');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.pdfdrive.com",
    setupNodeEvents(on, config) {
      // File download plugin
      on('task', { downloadFile });

      // PDF text extraction task
      on('task', {
        readPdf(filename) {
          return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, data) => {
              if (err) {
                reject(`Failed to read PDF file: ${err.message}`);
                return;
              }
              pdf(data)
                .then((result) => resolve(result.text))
                .catch((err) => reject(`Failed to parse PDF: ${err.message}`));
            });
          });
        },
      });
    },
  },
});