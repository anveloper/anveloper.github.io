# 플로팅 목차(TOC) 및 MDX 스타일 개선

> 작업일: 2026-02-12

## feat

### 플로팅 목차(TOC) 네비게이터 추가

- `rehype-slug`, `github-slugger` 패키지 추가
- `lib/toc.ts`: raw markdown에서 h2/h3 추출, github-slugger로 ID 생성
- `hooks/use-active-heading.ts`: IntersectionObserver 기반 스크롤 스파이
- `components/table-of-contents.tsx`: 플로팅 TOC 컴포넌트
  - xl(1440px+)에서만 표시, `position: fixed`
  - 활성 heading 하이라이트 (text-primary-sky + 좌측 보더)
  - heading 2개 미만 시 렌더링 안 함
- `app/posts/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`에 통합

## style

### rehype-pretty-code CSS 변수 방식 전환

- 기존 `display: none` 토글 → shiki CSS 변수(`--shiki-light`, `--shiki-dark`) 방식
- 단일 코드 블록으로 라이트/다크 모드 전환

### MDX 컴포넌트 간격 조정

- heading mt 확대로 섹션 간 구분 강화 (h2: mt-6→mt-9, h3: mt-5→mt-8)
- 블록 요소(코드, 테이블, 이미지, 인용) 간격 확대 (my-4→my-6~8)
- 본문 p/ul/ol 간격 소폭 확대 (my-4→my-5)

### 테이블/mermaid 카드 스타일 적용

- 테이블 래퍼: `bg-card rounded-lg border border-border`
- 셀 border를 내부(border-b, border-r)만 유지, 외곽은 래퍼 border 사용
- mermaid: `bg-card rounded-lg border border-border p-4`

### 블로그 포스트 텍스트 다이어그램 → mermaid 전환

- `20260210-pgvector-two-stage-search-optimization.mdx`: flowchart 2개
- `20260212-fastapi-sse-streaming-ai-generation.mdx`: sequenceDiagram 3개
