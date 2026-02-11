@echo off
echo ========================================
echo Killing Process on Port 8080
echo ========================================
echo.

echo Finding process using port 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080" ^| find "LISTENING"') do (
    echo Found process ID: %%a
    echo Killing process...
    taskkill /F /PID %%a
    if %errorlevel% equ 0 (
        echo Process killed successfully!
    ) else (
        echo Failed to kill process. You may need to run as Administrator.
    )
)

echo.
echo ========================================
echo Port 8080 should now be free!
echo ========================================
pause
