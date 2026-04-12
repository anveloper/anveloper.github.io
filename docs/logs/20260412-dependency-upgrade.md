# 20260412 - 의존성 업그레이드 및 보안 취약점 해결

## chore

- 전체 의존성 최신 버전 업그레이드
- pnpm audit 보안 취약점 7건 해결 (next DoS, hono 취약점)
- brace-expansion override 제거 (eslint 충돌 원인)
- CSS side-effect import 타입 선언 추가 (global.d.ts)

## fix

- lucide-react 1.x에서 제거된 Github 브랜드 아이콘을 인라인 SVG로 대체
- theme-selector 렌더 중 컴포넌트 생성 lint 에러 수정
