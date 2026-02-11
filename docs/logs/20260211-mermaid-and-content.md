# 2026-02-11 작업 일지: Mermaid 지원 및 콘텐츠 업데이트

## 작업 내용

### feat (새 기능)

- **Mermaid 다이어그램 렌더링**: `components/mermaid.tsx` 클라이언트 컴포넌트, `lib/plugins/remark-mermaid.ts` 커스텀 플러그인, `lib/mdx-options.ts` MDX 옵션 설정
- **analyze-project 스킬 개선**: GitHub URL 지원 추가 (gh repo clone → 분석 → 임시 디렉토리 삭제)

### refactor (리팩토링)

- **블로그 포스트 다이어그램 변환**: ASCII 아트를 Mermaid 다이어그램으로 교체 (multi-tenant-saas-architecture, caddy-multi-tenant-ssl)
- **DPS Store 아키텍처 다이어그램 변환**: ASCII 아트를 Mermaid flowchart로 교체
- **회사명 변경**: `(주) 위피엔피` → `(주) TILS AI` (about, education, overview, 홈페이지, resume)
- **포스트 목록 디자인 심플화**: Card 기반 → 구분선 기반 리스트, 날짜+제목 한 줄 배치

### docs (문서)

- **정보보안기사 프로젝트 콘텐츠 추가**: `_projects/20260207-information-security-engineer.mdx`

### chore (설정)

- **패키지 추가**: mermaid, remark-gfm, @types/mdast, unist-util-visit

## 관련 커밋

- `52bedcb` chore: Mermaid, remark-gfm 패키지 추가
- `806ea99` feat: Mermaid 다이어그램 렌더링 지원 추가
- `15e51d7` refactor: 블로그 포스트 다이어그램 Mermaid로 변환
- `8729a51` refactor: DPS Store 아키텍처 다이어그램 Mermaid로 변환
- `49ed7b2` refactor: 회사명 변경 및 코드 포맷팅 정리
- `e5b3e9e` refactor: 포스트 목록 심플 디자인으로 변경
- `306926c` docs: 정보보안기사 프로젝트 콘텐츠 추가
- `8c6ae4f` feat: analyze-project 스킬 GitHub URL 지원 추가

## 다음 작업

- main 브랜치로 머지 및 배포
- SEO 최적화 (메타데이터, OG 이미지)
- 성능 최적화
