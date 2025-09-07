@echo off
cls
echo.
echo ================================
echo   GitHub Account Selection
echo ================================
echo.
echo Choose your GitHub account:
echo [1] youssefhishamm902/Ecommmerce
echo [2] yhisham123/ecommerce
echo.
choice /c 12 /m "Please select an option"

if errorlevel 2 goto option2
if errorlevel 1 goto option1

:option1
echo.
echo Selected: youssefhishamm902/Ecommmerce
echo Setting up remote...
git remote add origin https://github.com/youssefhishamm902/Ecommmerce.git
if %errorlevel% neq 0 (
    echo Error: Could not add remote. Repository might not exist.
    echo Please make sure the repository exists on GitHub.
    pause
    exit /b 1
)
echo Remote added successfully!
echo.
echo Pushing to youssefhishamm902/Ecommmerce...
git push -u origin main
goto end

:option2
echo.
echo Selected: yhisham123/ecommerce
echo Setting up remote...
git remote add origin https://github.com/yhisham123/ecommerce.git
if %errorlevel% neq 0 (
    echo Error: Could not add remote. Repository might not exist.
    echo Please make sure the repository exists on GitHub.
    pause
    exit /b 1
)
echo Remote added successfully!
echo.
echo Pushing to yhisham123/ecommerce...
git push -u origin main
goto end

:end
echo.
echo ================================
echo   Operation completed!
echo ================================
pause
