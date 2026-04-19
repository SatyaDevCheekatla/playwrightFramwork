# Allure Report Setup - Complete Guide

## Overview
The Playwright Mokha Framework has been configured with Allure reporting to provide comprehensive test execution reports with detailed action logs and failure screenshots.

## ✅ What Has Been Configured

### 1. **Dependencies Installed**
```json
- allure-playwright: ^1.0.0
- allure-commandline: latest
```

### 2. **Playwright Config Updated**
Updated `playwright.config.js` to include Allure reporter:
```javascript
reporter: [
  ['html'],
  ['allure-playwright'],
],
```

### 3. **Enhanced BasePage.js with Logging**
All page object actions now include comprehensive logging:
- **navigate()** - Logs all page navigations
- **click()** - Logs element interactions
- **type()** - Logs text input (truncated for security)
- **getText()** - Logs text retrieval
- **waitForElement()** - Logs wait conditions

### 4. **Test Files Enhanced with Steps**
Both test files now use `test.step()` for structured reporting:
- **Registration.spec.js** - 3 tests with detailed steps
- **LoginFlow.spec.js** - 2 tests with detailed steps

## 📊 Generated Report Structure

### **Test Results Directory: `allure-results/`**
Contains all raw test data:
- `*.json` - Test result files with metadata
- `*.txt` - Console log attachments
- `*.png` - Failure screenshots

### **HTML Report Directory: `allure-report/`**
Contains the interactive Allure report:
- `index.html` - Main report page
- `data/` - Report data files
- `widgets/` - Report widgets

## 🚀 Running Tests and Generating Reports

### Step 1: Run All Tests
```bash
npx playwright test tests/
```
This will:
- Execute all tests
- Generate `allure-results/` directory with test data
- Capture screenshots and logs

### Step 2: Generate Allure Report
```bash
npx allure generate allure-results -o allure-report --clean
```
This creates the interactive HTML report.

### Step 3: View Report
```bash
npx allure open allure-report
```
Opens the report in default browser at `http://127.0.0.1:<port>`

## 📝 Log Examples

### Navigation Log
```
[ACTION] Navigating to URL: https://parabank.parasoft.com/parabank/index.htm
[ACTION] ✓ Navigation completed to: https://parabank.parasoft.com/parabank/index.htm
```

### Click Action Log
```
[ACTION] Clicking on element: getByRole('link', { name: 'Register' })
[ACTION] ✓ Successfully clicked on element: getByRole('link', { name: 'Register' })
```

### Test Data Log
```
[TEST DATA] Registered user: admin1776610476140
[TEST DATA] Newly created account number: 51528
```

## 📸 Screenshots in Report

Allure automatically captures and attaches:
- **Page screenshots** at each test step
- **Failure screenshots** when tests fail
- **Video traces** (when enabled in config)

## 🔍 Report Features

The Allure report includes:

1. **Overview Dashboard**
   - Test execution summary
   - Pass/Fail statistics
   - Duration metrics

2. **Test Results**
   - Detailed test execution steps
   - Timeline of actions
   - Pass/Fail status

3. **Logs & Attachments**
   - Console output for each test
   - Screenshots attached to steps
   - Video recordings (if enabled)

4. **Severity & Categories**
   - Test grouping by suite
   - Severity levels
   - Custom tags

5. **History**
   - Previous test run comparisons
   - Trend analysis

## 📋 Test Results Summary (Latest Run)

### **5 Tests Executed - All Passed ✅**

#### Registration Tests Suite
1. ✅ **Validate Home Page** (Passed)
   - Navigate to Home Page
   - Verify Home Page URL
   - Validate Home Page Title

2. ✅ **Perform User Registration** (Passed)
   - Navigate to Registration Page
   - Verify Registration Page URL
   - Validate Registration Page Title
   - Register User with credentials
   - Verify Successful Registration

3. ✅ **Open Account for Registered User** (Passed)
   - Navigate to Open Account Page
   - Validate Open Account Page Title
   - Select Account Type - SAVINGS
   - Verify Account Creation
   - Created Account #51528

#### Login Flow Tests Suite
1. ✅ **Validate navigation to Login Page** (Passed)
   - Navigate to Home Page
   - Verify Home Page URL
   - Validate Home Page Title

2. ✅ **Perform Login** (Passed)
   - Login with saved credentials
   - Wait for page transition
   - Take final screenshot

**Total Duration:** 24.7 seconds

## 🛠️ Continuous Integration Setup

To enable Allure reporting in CI/CD:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: npx playwright test tests/

- name: Generate Allure Report
  if: always()
  run: npx allure generate allure-results -o allure-report --clean

- name: Upload Report
  uses: actions/upload-artifact@v2
  with:
    name: allure-report
    path: allure-report/
```

## 📌 Best Practices

1. **Always use test.step()** for important actions
2. **Include meaningful log messages** in action logs
3. **Verify screenshots** are captured at failure points
4. **Review HTML reports** for better insights
5. **Archive reports** for historical comparison

## 🔗 Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://github.com/applitools/allure-playwright)
- [Playwright Reporters](https://playwright.dev/docs/test-reporters)

## 📞 Support

For issues or enhancements:
1. Check `allure-results/` for raw test data
2. Review browser console logs
3. Inspect failure screenshots in report
4. Check `test-results/` for Playwright artifacts
