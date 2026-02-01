@echo off
REM Deployment script for ATS Resume Analyzer

echo Building and deploying ATS Resume Analyzer...

REM Build the containers
echo Building containers...
docker-compose build

REM Bring up the services
echo Starting services...
docker-compose up -d

echo Deployment complete!
echo Access your ATS Resume Analyzer at http://localhost
echo.
echo To view logs:
echo   docker-compose logs
echo.
echo To stop the application:
echo   docker-compose down
pause