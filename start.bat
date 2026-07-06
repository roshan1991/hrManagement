@echo off
echo =======================================
echo Starting Digital HR System...
echo =======================================

echo Starting Backend API...
start cmd /k "cd backend && node server.js"

echo Starting Frontend React App...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting up in new command windows.
echo - Backend will run on port 5000
echo - Frontend will open your web browser automatically.
echo.
pause
