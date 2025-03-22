require('dotenv').config(); // Load .env variables

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ctyrf8',
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      email: process.env.EMAIL,
      password: process.env.PASS
    }
  },
});
