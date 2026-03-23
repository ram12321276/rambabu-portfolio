@echo off
color 0A
echo ===================================================
echo Pushing Portfolio to GitHub and Deploying to Vercel
echo ===================================================
echo.

echo [1/2] Pushing code to GitHub...
git push -u origin main

echo.
if %errorlevel% neq 0 (
    echo Error: GitHub Push Failed! Please ensure you logged in properly.
    pause
    exit /b %errorlevel%
)

echo [2/2] Opening Vercel Deployment Link in your Browser...
start https://vercel.com/new/clone?repository-url=https://github.com/ram12321276/rambabu-portfolio

echo.
echo All done! You can now close this window and continue on Vercel.
pause
