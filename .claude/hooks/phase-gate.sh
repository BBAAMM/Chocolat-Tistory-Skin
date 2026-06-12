#!/bin/bash
# Blocks edits to index.html/style.css unless phase prerequisites exist.

STDIN_DATA=$(cat)
FILEPATH=$(echo "$STDIN_DATA" | jq -r '.tool_input.file_path // ""')

# Only gate the two main output files
if ! echo "$FILEPATH" | grep -qE '(index\.html|style\.css)$'; then
  exit 0
fi

PHASES_DIR=".claude/phases"

if [ ! -f "$PHASES_DIR/REQUIREMENTS.md" ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"[Phase 1 Gate] .claude/phases/REQUIREMENTS.md 없음 — tistory-feature-flow 스킬을 invoke하고 기획자(Phase 1)를 먼저 완료하세요."}}'
  exit 2
fi

if [ ! -f "$PHASES_DIR/DESIGN_SPEC.md" ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"[Phase 2 Gate] .claude/phases/DESIGN_SPEC.md 없음 — frontend-design 스킬을 invoke하고 디자이너(Phase 2)를 완료하세요."}}'
  exit 2
fi

exit 0
