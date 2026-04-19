@echo off
REM Allure Report Generation Script for Windows

echo 🧪 Running all tests...
call npx playwright test tests/

echo.
echo 📊 Generating Allure report...
call npx allure generate allure-results -o allure-report --clean

echo.
echo 🌐 Opening Allure report in browser...
call npx allure open allure-report

echo.
echo ✅ Report generation complete!
echo 📍 Report location: ./allure-report/
pause
