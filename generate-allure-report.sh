#!/bin/bash
# Allure Report Generation Script - Quick Reference

# Run all tests and generate Allure report
echo "🧪 Running all tests..."
npx playwright test tests/

echo ""
echo "📊 Generating Allure report..."
npx allure generate allure-results -o allure-report --clean

echo ""
echo "🌐 Opening Allure report in browser..."
npx allure open allure-report

echo ""
echo "✅ Report generation complete!"
echo "📍 Report location: ./allure-report/"
