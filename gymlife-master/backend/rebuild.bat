@echo off
echo ========================================
echo Cleaning and Rebuilding the Project
echo ========================================
echo.

echo Step 1: Cleaning Maven build...
call mvnw.cmd clean
if %errorlevel% neq 0 (
    echo Maven clean failed!
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Compiling the project...
call mvnw.cmd compile
if %errorlevel% neq 0 (
    echo Maven compile failed!
    pause
    exit /b %errorlevel%
)

echo.
echo Step 3: Running tests...
call mvnw.cmd test
if %errorlevel% neq 0 (
    echo Maven test failed!
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
pause
