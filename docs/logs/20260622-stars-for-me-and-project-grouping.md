# 20260622 - 날별 프로젝트 추가, 메인 프로젝트 카테고리 그룹화, DPS Store 장비 연동 보강

## docs

- 날별(Stars for me) 프로젝트 페이지 추가 (`_projects/20260402-stars-for-me.mdx`)
  - 사주 계산 엔진(결정론) + AI 운세 풀이(확률론) 분리 구조, 버킷팅, SajuCache 등 정리
  - 썸네일(og.webp)·아이콘·hero 이미지 추가 (`public/images/projects/stars-for-me/`)
- DPS Store 출력장비·키오스크 장비 연동 내용 보강 (`_projects/20260108-dps-store.mdx`)
  - 접수증·가먼트(GTX-4)·머그 프린터 클라이언트 연동, 출력 큐 상태 머신
  - 장비 Device Auth(API 키, OAuth Device Flow 패턴) 플로우
  - 키오스크 모드·현장 운영, O2O 파이프라인 확장 반영

## feat

- 메인 Featured Projects를 회사 / SSAFY / 사이드 카테고리로 그룹화
  - 전체 프로젝트 frontmatter에 `category` 필드 추가 (company / ssafy / side)
  - `lib/featured-projects.ts`에 날별·Simple Thumbnail 추가, 날짜 내림차순 정렬
  - `app/page.tsx`(server)에서 frontmatter category로 그룹화 → 빌드 타임 정적 생성
  - `app/home-view.tsx`를 그룹 렌더링으로 전환

## 비고

- 작업 도중 origin/develop에 병렬 작업(MDX 단일 소스화, lib 데이터 분리, project-list 카드화)이
  머지되어, 해당 구조(`lib/featured-projects.ts`, `app/home-view.tsx`) 위에 카테고리 그룹화를 재구성함
- 교훈: 작업 시작 전 `git fetch origin develop` 선행 필요
