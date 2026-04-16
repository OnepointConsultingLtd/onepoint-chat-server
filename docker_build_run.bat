@echo off
setlocal EnableExtensions EnableDelayedExpansion

docker build -t onepoint-chat-server .
if errorlevel 1 exit /b %errorlevel%

set "ENV_ARGS="
for /f "usebackq tokens=1* delims==" %%A in (".env") do (
  set "KEY=%%~A"
  set "VAL=%%~B"
  if defined KEY if not "!KEY:~0,1!"=="#" (
    if defined VAL (
      set "ENV_ARGS=!ENV_ARGS! -e %%~A=%%~B"
    )
  )
)

docker run!ENV_ARGS! -p 4000:4000 -p 5000:5000 onepoint-chat-server