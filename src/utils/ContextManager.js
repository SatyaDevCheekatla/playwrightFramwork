const { chromium, firefox, webkit } = require('@playwright/test');

const browserEngines = { chromium, firefox, webkit };

class ContextManager {
  static browsers = {};
  static contexts = {};

  static async init(browserName) {
    if (!browserName) {
      throw new Error('browserName is required. Pass it from the Playwright fixture.');
    }

    const engine = browserEngines[browserName];
    if (!engine) {
      throw new Error(`Unsupported browser: "${browserName}". Must be chromium, firefox, or webkit.`);
    }

    if (!this.browsers[browserName]) {
      this.browsers[browserName] = await engine.launch({
        headless: false,
        args: browserName === 'chromium' ? ['--start-maximized'] : [],
      });
    }

    if (!this.contexts[browserName]) {
      this.contexts[browserName] = await this.browsers[browserName].newContext(
        browserName === 'chromium'
          ? { viewport: null }
          : { viewport: { width: 1920, height: 1080 } }
      );
    }

    return this.contexts[browserName];
  }

  static getContext(browserName) {
    const context = this.contexts[browserName];
    if (!context) {
      throw new Error(`Context for "${browserName}" not initialized. Call init() first.`);
    }
    return context;
  }

  static async tearDown(browserName) {
    if (this.contexts[browserName]) {
      await this.contexts[browserName].close();
      delete this.contexts[browserName];
    }
    if (this.browsers[browserName]) {
      await this.browsers[browserName].close();
      delete this.browsers[browserName];
    }
  }

  static async tearDownAll() {
    await Promise.all(Object.keys(this.browsers).map((type) => this.tearDown(type)));
  }
}

module.exports = ContextManager;