@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script for Windows
@REM ----------------------------------------------------------------------------
@set local

set MAVEN_PROJECT BASEDIR=%~dp0
set WRAPPER_JAR="%MAVEN_PROJECT BASEDIR%.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"
set WRAPPER_PROPERTIES="%MAVEN_PROJECT BASEDIR%.mvn\wrapper\maven-wrapper.properties"

@REM Download wrapper jar if not present
if not exist %WRAPPER_JAR% (
    if not exist "%MAVEN_PROJECT BASEDIR%.mvn\wrapper" mkdir "%MAVEN_PROJECT BASEDIR%.mvn\wrapper"
    echo Downloading Maven Wrapper...
    powershell -Command "Invoke-WebRequest -Uri %WRAPPER_URL% -OutFile %WRAPPER_JAR%"
)

set JAVA_EXE=java
%JAVA_EXE% -jar %WRAPPER_JAR% %*

@end local
