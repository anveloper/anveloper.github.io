# 2026-02-27 테마 시스템 확장 및 페이지네이션

## feat

- 묵향(korean) 테마 추가: 한지 배경, 마루 부리/동해독도 폰트, CSS 변수
- 터미널 CRT 테마 추가: 검정 배경, 초록 모노스페이스, CRT 스캔라인/glow 효과
- 테마 선택 드롭다운 UI: 테마별 미리보기 스타일, 아이콘 전용
- Posts/Solutions 정적 페이지네이션: Pagination 서버 컴포넌트, Link 기반
  - Posts 10개/페이지, Solutions 30개/페이지
  - `[slug]` 라우트에서 숫자 slug 감지하여 페이지네이션 처리
  - `generateStaticParams`에 페이지 번호 포함, sitemap에 URL 추가
- 글로벌 404 페이지 (output: export용 404.html 생성)
- NotFoundView 공용 컴포넌트

## refactor

- 테마 시스템을 3종(light/dark/korean) → 4종(+terminal) 지원으로 확장
- 테마 선택 UI를 아이콘 전용 드롭다운으로 변경
- Projects 페이지를 ProjectList 클라이언트 컴포넌트로 분리
- 목록 렌더링 공유 컴포넌트 추출 (PostItems, SolutionItems)

## chore

- 묵향 테마용 폰트 및 텍스처 에셋 추가
- 스킬 문서 정리 및 개선
- cSpell에 giscus 단어 추가
