const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx,mjs}',
    baseUrl: 'https://www.akveo.com/ngx-admin/',
    watchForFileChanges: false,
<<<<<<< HEAD
  },
});
 
=======
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
>>>>>>> 032b0dd (add material for lecture 17)
