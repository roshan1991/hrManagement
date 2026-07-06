@echo off
echo ========================================================
echo Deploying Frontend to Vercel
echo ========================================================
echo.
echo Make sure you have linked your Vercel project first!
echo (If not, it will prompt you to log in and link it)
echo.

cd frontend

echo Starting deployment...
call npx vercel --prod --token="vcp_8HsZR0bHRsKjK4i5GQpTX5cy4h61GWfG61DosPT4k2BRv5T0lN4cKPtV"

cd ..

echo.
echo ========================================================
echo Deployment process finished.
echo ========================================================
pause
