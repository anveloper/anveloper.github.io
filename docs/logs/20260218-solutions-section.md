# 2026-02-18 Solutions 섹션 추가

## feat

- Solutions 섹션 신규 구축 (`_solutions/index.ts`, `app/solutions/`)
  - 목록 페이지: 날짜 내림차순, 플랫폼·난이도·언어 뱃지 표시
  - 상세 페이지: MDX 렌더링, TOC, 문제 링크, generateStaticParams/generateMetadata
  - 네비게이션에는 노출하지 않음 (URL 직접 접근)
- `analyze-solutions` 스킬 추가 (`.claude/skills/analyze-solutions/SKILL.md`)
  - 로컬/GitHub 레포지토리 분석, 중복 제거, 배치 처리 지원

## docs

### 알고리즘 풀이 등록 (총 1,541문제)

| 레포지토리 | 언어 | 문제 수 | 기간 |
|-----------|------|---------|------|
| ASP.js | JavaScript | 50 | 2024-07 ~ 2024-09 |
| ASP.py | Python | 64 | 2024-09 ~ 2024-12 |
| ASP.cpp | C++ | 168 | 2024-09 ~ 2025-01 |
| ASP_study | Java | 849 | 2022-03 ~ 2024-03 |
| today-i-learned | C++/Python/Rust | 409 | 2025-07 ~ 2026-02 |

- solved.ac API에서 문제 제목, 난이도(레벨→한글), 태그 메타데이터 수집
- 파일명 규칙: `YYYYMMDD-boj-{number}.mdx` → slug: `boj-{number}`
- MDX 템플릿: 문제 링크, 풀이 설명, 코드, 복잡도

### 기타

- CLAUDE.md 응답 규칙 보완 (영어 질문 시 한국어 답변 + 영어 교정)
- Solutions 섹션 설계 문서 추가 (`docs/design/20260218-solutions-section.md`)

## 빌드 현황

- `pnpm build`: 약 21초, 출력 316MB
- GitHub Pages 1GB 한도 내 (여유 약 684MB)
- 솔루션 페이지가 290MB 차지 → 향후 증가 시 최적화 필요
