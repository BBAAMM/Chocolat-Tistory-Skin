#!/bin/bash
# Injects next-phase instructions after a phase output file is written.

STDIN_DATA=$(cat)
FILEPATH=$(echo "$STDIN_DATA" | jq -r '.tool_input.file_path // ""')

if echo "$FILEPATH" | grep -q 'phases/REQUIREMENTS\.md$'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"✅ Phase 1(기획자) 완료. 다음: frontend-design 스킬을 invoke하고 Phase 2(디자이너)를 시작하세요. 결과물은 .claude/phases/DESIGN_SPEC.md 에 저장하세요."}}'
fi

if echo "$FILEPATH" | grep -q 'phases/DESIGN_SPEC\.md$'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"✅ Phase 2(디자이너) 완료. 다음: tistory-replacer 스킬을 invoke하고 Phase 3(개발자)를 시작하세요. index.html 과 style.css 를 구현할 수 있습니다."}}'
fi

exit 0
