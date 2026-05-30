#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $0 [remote-or-repo] [commit-message]
- remote-or-repo: optional Git remote URL or GitHub "owner/repo" when using gh.
- commit-message: optional commit message (quoted).
If 'gh' CLI is available and no remote exists, the script will create a GitHub repo.
EOF
  exit 1
}

REMOTE="$1"
COMMIT_MSG="${2:-Deploy: $(date -u +"%Y-%m-%d %H:%M:%S UTC")}" 

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 1
fi

# Commit any changes
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "$COMMIT_MSG" || true
fi

# If origin remote exists, show it
if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin exists: $(git remote get-url origin)"
else
  if command -v gh >/dev/null 2>&1; then
    if [ -n "$REMOTE" ]; then
      echo "Creating GitHub repo '$REMOTE' and setting origin..."
      gh repo create "$REMOTE" --public --source=. --remote=origin --push || true
      exit 0
    else
      echo "Creating repository via gh (interactive)..."
      gh repo create --public --source=. --remote=origin --push
      exit 0
    fi
  else
    if [ -z "$REMOTE" ]; then
      read -p "Enter Git remote URL (e.g. git@github.com:user/repo.git): " REMOTE
    fi
    git remote add origin "$REMOTE"
  fi
fi

# Push current branch
git push -u origin HEAD
