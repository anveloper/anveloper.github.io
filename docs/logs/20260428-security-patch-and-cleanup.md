# 20260428 - 보안 취약점 추가 패치 및 overrides 정리

## chore

- pnpm audit 취약점 9건 해결 (deps)
  - dompurify >=3.4.0 (mermaid 경유 XSS / Prototype Pollution 5건)
  - hono >=4.12.14 (shadcn / MCP SDK 경유 HTML Injection)
  - uuid >=14.0.0 (mermaid 경유 buffer bounds check)
  - postcss >=8.5.10 (next / tailwindcss / shadcn 경유 XSS)
- 패치 버전을 `pnpm.overrides`로 강제하여 트랜지티브 의존성까지 적용
- 후속으로 더 이상 필요 없는 overrides 항목 제거 (정상 트리로 복귀)
