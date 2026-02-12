# 2026-02-12: MDX 코드 블록 구문 하이라이팅 추가

## feat

### rehype-pretty-code (Shiki) 기반 구문 하이라이팅

- `rehype-pretty-code` + `shiki` 패키지 설치
- 듀얼 테마 설정: `github-dark` / `github-light`
- 빌드 타임 인라인 스타일 하이라이팅 (클라이언트 JS 0)

### 변경 파일

| 파일 | 내용 |
|------|------|
| `lib/mdx-options.ts` | rehype-pretty-code 플러그인 추가 |
| `lib/mdx-components.ts` | figure/pre/code 컴포넌트 수정 (하이라이트 감지) |
| `app/globals.css` | 다크/라이트 테마 전환 CSS |
| `package.json` | rehype-pretty-code, shiki 의존성 추가 |

### 설계 포인트

- `data-theme` 속성으로 하이라이트 여부 감지
- `figure[data-rehype-pretty-code-figure]`에 `not-prose` 적용하여 Typography 충돌 방지
- `.dark` 클래스 기반 `[data-theme]` 표시/숨김 전환
- 하이라이트된 span에 `transition: none` 적용 (테마 전환 성능)
- mermaid 코드 블록은 remark 단계에서 제거되므로 충돌 없음
