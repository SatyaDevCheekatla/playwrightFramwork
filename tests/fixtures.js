const { test } = require('@playwright/test');
const ContextManager = require('../src/utils/ContextManager');
const POMManager = require('../src/common/POMManager');

/**
 * Custom fixture that provides page and pomManager
 * Handles setup and teardown automatically
 */
const base = test.extend({
  pomManager: async ({ page, browserName }, use) => {
    // Setup
    const context = await ContextManager.init(browserName);
    const testPage = await context.newPage();
    const pomManager = new POMManager(testPage);

    // Use the fixture
    await use({ page: testPage, pomManager, context });

    // Teardown
    await testPage.close();
    await ContextManager.tearDown(browserName);
  },
});

module.exports = { test: base };
