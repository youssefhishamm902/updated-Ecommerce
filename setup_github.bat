@echo off
cls
echo.
echo ================================
echo   GitHub Repository Setup
echo ================================
echo.
echo The repository was not found. Here are your options:
echo.
echo [1] Create NEW repository on youssefhishamm902 account
echo [2] Create NEW repository on yhisham123 account  
echo [3] Push to EXISTING repository (if you know the correct URL)
echo [4] Initialize as NEW local repository and push later
echo.
choice /c 1234 /m "Please select an option"

if errorlevel 4 goto local_only
if errorlevel 3 goto existing_repo
if errorlevel 2 goto create_yhisham
if errorlevel 1 goto create_youssefhishamm

:create_youssefhishamm
echo.
echo Selected: Create new repository on youssefhishamm902
echo.
echo STEP 1: Go to https://github.com/youssefhishamm902
echo STEP 2: Click "New repository" (green button)
echo STEP 3: Repository name: Ecommmerce
echo STEP 4: Make it Public or Private (your choice)
echo STEP 5: DO NOT initialize with README (leave unchecked)
echo STEP 6: Click "Create repository"
echo.
echo After creating the repository on GitHub, press any key to continue...
pause
echo.
echo Setting up remote for youssefhishamm902/Ecommmerce...
git remote add origin https://github.com/youssefhishamm902/Ecommmerce.git
git branch -M main
git push -u origin main
goto end

:create_yhisham
echo.
echo Selected: Create new repository on yhisham123
echo.
echo STEP 1: Go to https://github.com/yhisham123
echo STEP 2: Click "New repository" (green button)  
echo STEP 3: Repository name: ecommerce
echo STEP 4: Make it Public or Private (your choice)
echo STEP 5: DO NOT initialize with README (leave unchecked)
echo STEP 6: Click "Create repository"
echo.
echo After creating the repository on GitHub, press any key to continue...
pause
echo.
echo Setting up remote for yhisham123/ecommerce...
git remote add origin https://github.com/yhisham123/ecommerce.git
git branch -M main
git push -u origin main
goto end

:existing_repo
echo.
echo Selected: Push to existing repository
echo.
set /p repo_url="Enter the full GitHub repository URL: "
echo.
echo Setting up remote...
git remote add origin %repo_url%
git branch -M main
git push -u origin main
goto end

:local_only
echo.
echo Selected: Local repository only
echo.
echo Repository initialized locally. You can push later when ready.
echo To push later, create a GitHub repository and run:
echo git remote add origin [YOUR_GITHUB_URL]
echo git push -u origin main
goto end

:end
echo.
echo ================================
echo   Setup completed!
echo ================================
echo.
echo Current remotes:
git remote -v
echo.
pause
