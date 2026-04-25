#!/usr/bin/env bash
# Cursor postToolUse hook (matches Write tool).
#
# When the agent writes a file under src/ or docs/, this hook checks that the
# file's containing directory has an AGENTS.md. If not, it returns
# additional_context so the agent sees the issue on its next turn and either
# creates the AGENTS.md or moves the file.
#
# This is Layer 4 of the enforcement model. Layers 2/3 (script + pre-commit)
# are the strict gate; this hook is the live, in-flight nudge.
#
# Hook contract: read JSON on stdin, return JSON on stdout. Exit 0 always
# (we never block writes — that's pre-commit's job).

set -euo pipefail

input=$(cat)

# Only act if jq is available; otherwise no-op (fail open).
if ! command -v jq >/dev/null 2>&1; then
  echo '{}'
  exit 0
fi

# Extract the path of the file just written. Cursor's afterFileEdit /
# postToolUse Write events expose the file path under tool_input.target_file
# or tool_input.path. Accept either.
file_path=$(echo "$input" | jq -r '
  .tool_input.target_file // .tool_input.path // .tool_input.file_path // empty
')

if [[ -z "$file_path" ]]; then
  echo '{}'
  exit 0
fi

# Convert to repo-relative path if absolute.
repo_root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
if [[ "$file_path" == /* ]]; then
  rel_path="${file_path#$repo_root/}"
else
  rel_path="$file_path"
fi

# Only check writes under src/ or docs/.
if [[ ! "$rel_path" =~ ^(src|docs)/ ]]; then
  echo '{}'
  exit 0
fi

# Skip if the file IS the AGENTS.md itself.
if [[ "$(basename "$rel_path")" == "AGENTS.md" ]]; then
  echo '{}'
  exit 0
fi

# Check the file's directory for AGENTS.md.
dir=$(dirname "$rel_path")
agents_path="$repo_root/$dir/AGENTS.md"

if [[ -f "$agents_path" ]]; then
  echo '{}'
  exit 0
fi

# Missing AGENTS.md — surface a follow-up note to the agent.
jq -n --arg dir "$dir" '{
  additional_context: ("Heads up: \($dir)/ has no AGENTS.md. Either create one describing the directory'\''s purpose and conventions, or move the file to a directory that already has one. The pre-commit hook will block commits to directories missing AGENTS.md.")
}'

exit 0
