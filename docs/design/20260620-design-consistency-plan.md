# 디자인 일관성·가독성 보완 계획

> 작성일: 2026-06-20
> 목적: 2026-02-16 리뉴얼 이후 누적된 디자인 시스템 불일치와 가독성 문제 보완
> 범위: 기능 유지, 디자인(레이아웃/타이포그래피/토큰/색상)만 수정
> 선행: [20260216-design-revision-plan.md](./20260216-design-revision-plan.md) (텍스트 중심 미니멀 전환 완료)

---

## 1. 현황 진단

2026-02-16 리뉴얼로 "AI 템플릿" 느낌은 해소되고 텍스트 중심 미니멀 톤으로 통일되었으나,
이후 콘텐츠/페이지가 늘어나면서 **디자인 시스템 일관성**과 **타이포그래피 가독성**에 균열이 생김.

### 1.1 강점 (유지)

- 4가지 테마(light/dark/korean/terminal) — 차별화된 정체성
- 단일 컬럼 `max-w-4xl` 미니멀 레이아웃
- 탄탄한 접근성 기반 (skip-nav, focus-visible, reduced-motion, forced-colors, prefers-contrast)
- 일관된 `muted-foreground` 위계

### 1.2 보완 지점

| 우선순위 | 항목 | 해당 파일 |
| -------- | ---- | --------- |
| **P1** | 페이지 헤더 시스템 이중화 (홈 마이크로라벨 vs 내부 h1) | `app/page.tsx:221`, 전 내부 페이지 |
| **P1** | 프로젝트 표현 불일치 (홈 카드 vs /projects 텍스트 리스트) | `app/page.tsx:357`, `components/project-list.tsx:90` |
| **P1** | 기술 스택 시각화 이중화 (홈 level 그라데이션 vs /skills shields 뱃지) | `app/page.tsx:305`, `app/skills/page.tsx:75` |
| **P1** | radius/surface/hover 토큰 혼용 | 전역 |
| **P2** | 홈 텍스트 과소 사이즈 (`text-[8px]`~`text-[11px]`) | `app/page.tsx:223,300,394,402` |
| **P2** | 모바일 카드 그리드 2열 강제 | `app/page.tsx:371` |
| **P2** | Hero focal point 약함 | `app/page.tsx:242` |
| **P2** | TextType 레이아웃 시프트 위험 | `app/page.tsx:275` |
| **P3** | 푸터 연도 하드코딩 (`© 2025`) | `components/footer.tsx:13` |
| **P3** | 색상 단조 (chart 토큰 미사용) | 전역 |
| **P3** | 테마 셀렉터 팝오버 anchor 약함 | `components/theme-selector.tsx:143` |
| **P3** | prose + mdx 커스텀 오버라이드 중복 | `app/posts/[slug]`, `lib/mdx-components.ts` |
| **P3** | Contact 중복 (홈 Connect vs /contact) | `app/page.tsx:414`, `app/contact/page.tsx` |

---

## 2. 디자인 방향성

기존 리뉴얼의 "텍스트 중심 미니멀 + 에디토리얼" 방향을 유지하되, **토큰화·체계화**로 일관성을 확보한다.

1. **단일 헤더 시스템** — 페이지 헤더 패턴을 하나로 통일
2. **단일 표현 언어** — 같은 데이터(프로젝트/스킬)는 어디서나 같은 시각 언어
3. **토큰 규칙화** — radius/surface/hover를 역할별로 고정
4. **가독성 하한 준수** — 본문 ≥ 12px, 라벨 ≥ 11px
5. **모바일 우선 검증** — 1열 → 2열 점진 확장

---

## 3. 단계별 작업 계획

### Phase 1: 토큰·기반 정리 (P1-4, P3 일부) ✅

> 참고: 이 테마에서 `secondary`/`muted`/`accent`는 동일 색상값이라 hover 차이는 시각이 아닌 코드 일관성 문제.

- [x] radius 규칙 확정: 표면(카드/링크박스/썸네일/테이블) `rounded-lg`(=`--radius`), 뱃지/태그/아이콘/버튼 `rounded-md`, 원형 `rounded-full`
- [x] hover 배경 규칙 확정: 표면 hover는 `hover:bg-accent`로 통일 (홈 프로젝트 카드 `hover:bg-secondary`→`hover:bg-accent`)
- [x] 푸터 연도 동적 처리 (`new Date().getFullYear()`)
- [x] 적용: 홈 스킬칩/태그/아이콘 `rounded`/`rounded-xl`→규칙화, project-list 아이콘 `rounded`→`rounded-md`

### Phase 2: 헤더 시스템 통일 (P1-1) ✅

> 진단 결과: 내부 페이지 헤더 스타일은 이미 동일하나 6개 파일에 중복 작성됨. 단일 소스화로 drift 방지.
> 홈 `SectionHeader`(마이크로 라벨)는 "섹션 구분"용으로 역할이 다르므로 유지 — 페이지 타이틀과 구분.

- [x] 공용 `components/page-header.tsx` 추출 (title/description/action 슬롯)
- [x] posts/contact/about/skills/education + project-list + posts/[slug] 페이지네이션 뷰 전부 적용
- [x] project-list 필터 버튼은 `action` 슬롯으로 이전, hover `bg-muted`→`bg-accent` 정리

### Phase 3: 표현 언어 통일 (P1-2, P1-3) ✅

- [x] `/projects` 리스트(divide-y 텍스트) → 아이콘 카드 그리드(`grid-cols-1 sm:grid-cols-2`)로 전환, 홈과 결 맞춤
- [x] 스킬 시각화 단일화: **shields 뱃지로 통일** (사용자 결정) — 홈 그라데이션 칩 → `SkillBadge`(shields + 🔥)

### Phase 4: 타이포그래피·반응형 (P2)

- [ ] 홈 초소형 텍스트 상향 (본문 ≥ 12px, 라벨 ≥ 11px)
- [ ] 홈 Featured Projects 그리드 `grid-cols-1 sm:grid-cols-2`
- [ ] Hero focal point 강화 (이름/태그라인 사이즈 검토)
- [ ] TextType 컨테이너 `min-h` 예약으로 레이아웃 시프트 방지

### Phase 5: 디테일·마무리 (P3)

- [ ] 색상: chart 토큰 활용 또는 카테고리별 미세 액센트 (의도적 미니멀 유지 시 보류)
- [ ] 테마 셀렉터 팝오버 패널 배경/보더 추가
- [ ] prose vs mdx 오버라이드 정리 (중복 제거)
- [ ] Contact 중복 역할 정리 (홈 Connect / /contact 구분 또는 통합)

### Phase 6: 검증

- [ ] `pnpm build` 성공
- [ ] `pnpm lint` 성공
- [ ] 4개 테마 × sm~xl 반응형 시각 확인
- [ ] 콘솔 에러 없음

---

## 4. 수정하지 않는 것

- 네비게이션 구조 및 라우팅
- MDX 콘텐츠 렌더링 파이프라인
- 4개 테마 체계 자체
- SEO 메타데이터
- 정적 빌드 호환성 (GitHub Pages)
- 콘텐츠 데이터 자체

---

## 5. 변경 이력

| 날짜 | 내용 |
| ---- | ---- |
| 2026-06-20 | 초안 작성 — 일관성/가독성 보완 6단계 계획 수립 |
