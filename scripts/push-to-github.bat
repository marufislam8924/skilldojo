@echo off
REM Push current branch to origin with a commit if there are staged changes
SETLOCAL ENABLEDELAYEDEXPANSION

:: Collect commit message from args or prompt
IF "%*"=="" (
  set /p MSG=Commit message: 
) ELSE (
  set MSG=%*
)

git add -A
ngit diff --cached --quiet 2>NUL || git commit -m "%MSG%"
git push origin HEAD
ENDLOCAL
