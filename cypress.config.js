require('dotenv').config(); // Load .env variables

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ctyrf8',
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
