# 2026-02-16 디자인 리비전 (Phase 1-4)

## feat

### 홈페이지 텍스트 중심 미니멀 리디자인
- Hero: 프로필 아바타 축소 (w-14), 인사말 제거, 텍스트 간결화
- SectionHeader: `h-1 w-8 bg-primary-sky` 장식 바 제거, 제목 자체를 링크로 처리 (ArrowUpRight 호버)
- About: Card 제거 → 텍스트 블록, 관심사 `join(" / ")`, 자격증 인라인
- Skills: 카테고리(w-28) + 인라인 SkillBadge 플랫 배치
- Timeline: 기간(w-36) + 내용 플랫 리스트, `border-b border-border/60` 구분
- Contact: 라벨(w-16) + 링크 인라인 배치
- Projects: Card 유지, `hover:border-foreground/20` 개선

### 하위 페이지 텍스트 중심 리디자인
- About: Card 5개 → `border-b` 구분 텍스트 섹션, Server Component 전환
- Skills: Card 그리드 → 카테고리 + SkillBadge 플랫 레이아웃, Server Component 전환
- Education: 타임라인 선/아이콘 노드 제거 → 플랫 리스트, Server Component 전환
- Contact: Card 그리드 → 라벨 + 링크 인라인, Server Component 전환
- Overview: 홈페이지 스타일로 완전 재작성, Server Component 전환

### 상세/목록 페이지 헤더 리디자인
- Posts/Projects 상세: Card/CardContent 제거 → `<header>` + `border-b`
- 제목 `text-2xl sm:text-3xl`, Calendar 아이콘 제거
- 목록 페이지 헤더 패턴 통일 (`tracking-tight`, `mt-1`)

### 푸터 컴포넌트 추가
- `components/footer.tsx` 생성, `layout.tsx`에 적용

## style

### 공통 스타일 개선
- Badge `sky` variant 제거 → `secondary`로 통일
- PageContainer 도트 패턴 배경 제거
- `::selection` 색상 `--accent` 변수로 변경

## refactor

### 미사용 컴포넌트 정리
- 삭제: `framer-wrapper.tsx`, `dock.tsx`, `button.tsx`
- `card.tsx`: CardHeader/Title/Description/Footer 제거 (Card, CardContent만 유지)
- `animation.ts`: `pageFadeIn` 제거
- `skill-data.ts`: `SkillCategory.icon` optional로 변경

## docs

### 디자인 수정 계획 문서 갱신
- `docs/design/20260216-design-revision-plan.md` Phase 1-4 완료 상태 반영
