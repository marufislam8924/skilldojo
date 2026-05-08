#!/usr/bin/env bash
set -e

MSG="$1"
if [ -z "$MSG" ]; then
  read -p "Commit message: " MSG
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to commit"
else
  git commit -m "$MSG"
fi

git push origin HEAD
