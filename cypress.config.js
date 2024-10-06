const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // add this line
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});