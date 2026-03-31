$ErrorActionPreference = 'Stop'

# Go to the folder this script lives in (project root)
Set-Location $PSScriptRoot

# Build the server first (runs synchronously)
yarn build

# Start the current server (backend) in a new PowerShell window
Start-Process powershell.exe -WorkingDirectory $PSScriptRoot -ArgumentList @(
    '-NoExit'
    '-Command'
    'yarn start'
)

# Start the UI server from the onepoint-chat-ui folder using run_ui.ps1 in another window
$uiScript = Join-Path $PSScriptRoot 'onepoint-chat-ui\run_ui.ps1'
Start-Process powershell.exe -WorkingDirectory (Split-Path $uiScript -Parent) -ArgumentList @(
    '-NoExit'
    '-File'
    "`"$uiScript`""
)