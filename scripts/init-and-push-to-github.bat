@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

n:: Usage: init-and-push-to-github.bat [remote-or-repo] [commit-message]
SET "ARG=%~1"
SET "MSG=%~2"
IF "%MSG%"=="" (
  FOR /F "tokens=1-3 delims=/ " %%a IN ("%date% %time%") DO SET MSG=Deploy %%a %%b %%c
)

nwhere git >NUL 2>NUL || (
  echo git is required
  EXIT /B 1
)

ngit status --porcelain >NUL 2>&1
IF NOT ERRORLEVEL 1 (
  git add -A
  git diff --cached --quiet 2>NUL || git commit -m "%MSG%"
)

ngit remote get-url origin >NUL 2>&1
IF ERRORLEVEL 1 (
  where gh >NUL 2>NUL
  IF ERRORLEVEL 0 (
    IF "%ARG%"=="" (
      gh repo create --public --source=. --remote=origin --push
    ) ELSE (
      gh repo create "%ARG%" --public --source=. --remote=origin --push
    )
    GOTO :EOF
  ) ELSE (
    IF "%ARG%"=="" (
      set /p ARG=Enter Git remote URL (e.g. git@github.com:user/repo.git): 
    )
    git remote add origin %ARG%
  )
)

ngit push -u origin HEAD
ENDLOCAL
