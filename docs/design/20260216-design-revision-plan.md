# 컴포넌트 디자인 수정 계획

> 작성일: 2026-02-16
> 목적: AI가 만든 느낌을 줄이고, 개성 있는 디자인으로 개선
> 범위: 기능 유지, 디자인(레이아웃/스타일/애니메이션)만 수정

---

## 1. 현재 디자인 문제점 분석

### 1.1 반복되는 패턴 — "AI 템플릿" 느낌의 원인

| 문제                                  | 빈도      | 해당 파일            |
| ------------------------------------- | --------- | -------------------- |
| **아이콘 + 컬러 박스** 패턴 동일 반복 | 12회+     | 모든 페이지          |
| **Card 컴포넌트** 만능 래퍼           | 30회+     | 모든 페이지          |
| **primary-sky 단일 색상** 일률 적용   | 40회+     | 모든 페이지          |
| **동일한 모션** (opacity:0→1, y:20→0) | 모든 섹션 | 모든 페이지          |
| **기계적 딜레이** (0.1초 간격 순차)   | 모든 섹션 | 모든 페이지          |
| **2열 균등 그리드**                   | 7회+      | 홈, Skills, Contact  |
| **Badge/Pill 남용**                   | 15회+     | 홈, About, Education |

### 1.2 구체적 문제

#### 홈페이지 (`app/page.tsx`)
- 6개 섹션 모두 동일한 구조: `SectionHeader` → `Card` 그리드 → Badge 나열
- Hero 섹션이 프로필 이미지 + 텍스트의 전형적 포트폴리오 템플릿
- SectionHeader 컴포넌트가 `h-1 w-8 bg-primary-sky` 바 + "자세히 보기" 링크로 획일적
- Contact 섹션 3열 카드가 아이콘 원 + 텍스트 + 버튼의 정석 패턴

#### About (`app/about/page.tsx`)
- 5개 카드가 완전히 동일한 구조 반복: 아이콘 박스(p-3 bg-primary-sky/10 rounded-lg) + 텍스트
- 카드 간 시각적 차이 없음 — 아이콘만 다를 뿐 레이아웃 동일
- 자기소개 텍스트가 `<br />` 으로 줄바꿈된 단조로운 구조

#### Skills (`app/skills/page.tsx`)
- 모든 카테고리가 동일한 Card + SkillBadge 나열
- 아이콘 박스 패턴 5회 반복
- 숙련도 시각화가 작은 flame 아이콘에만 의존

#### Education (`app/education/page.tsx`)
- 전형적인 수직 타임라인 (왼쪽 선 + 원형 아이콘 + 카드)
- 모든 항목의 구조가 동일

#### Contact (`app/contact/page.tsx`)
- 3열 카드가 아이콘 원 + 제목 + 설명 + 버튼의 가장 흔한 패턴
- 상단 소개 카드가 중앙 정렬 텍스트로 AI 냄새

---

## 2. 디자인 방향성

### 2.1 핵심 원칙

1. **비대칭 레이아웃** — 모든 섹션이 같은 그리드가 아닌, 각 콘텐츠에 맞는 레이아웃
2. **카드 의존도 축소** — 정보를 감싸는 방식을 다양화 (카드, 인라인, 구분선, 여백 등)
3. **색상 다양화** — primary-sky 일변도에서 벗어나, 섹션별/유형별 차별화
4. **모션 차별화** — 섹션마다 다른 애니메이션 (fade, slide, scale 혼합)
5. **여백으로 위계 표현** — 패딩/마진의 의도적 차이로 정보 구조 전달
6. **텍스트 중심 디자인** — 아이콘 장식 최소화, 타이포그래피로 위계 표현

### 2.2 참고 방향

- 개발자 블로그의 미니멀 디자인 (leerob.io, rauno.me, paco.me)
- 콘텐츠 중심 — 장식보다 정보 전달에 집중
- 여백과 타이포그래피로 구조를 표현하는 에디토리얼 스타일

---

## 3. 페이지별 수정 계획

### 3.1 공통 변경

#### PageContainer (`components/page-container.tsx`)
- [x] 도트 패턴 배경 제거 → 깔끔한 단색 배경
- [x] `withPattern` prop 제거 (더 이상 불필요)

#### 모션/애니메이션
- [x] `framer-wrapper.tsx` 삭제 (미사용 확인)
- [x] `lib/animation.ts` 생성 — 표준 variants 정의 (`sectionReveal`, `pageFadeIn`, `staggerContainer`, `staggerItem`)
- [x] 기계적 순차 딜레이(0.1 * index) 제거 → Phase 2-3에서 완료
- [x] 페이지별 다른 진입 애니메이션 적용 → Phase 2-3에서 완료
  - 홈: 섹션별 스크롤 기반 진입 (viewport 진입 시 animate)
  - 하위 페이지: Server Component 전환 (motion 제거, 정적 렌더링)

#### 아이콘 + 컬러 박스 패턴 제거
- [x] `p-2 bg-primary-sky/10 rounded-lg` + 아이콘 조합을 전면 재검토 → Phase 2-3에서 완료
- [x] 필요한 곳만 아이콘 유지, 나머지는 텍스트 스타일링으로 대체 → Phase 2-3에서 완료

#### 색상 체계 개선
- [x] Badge `sky` variant 제거 → `secondary`로 대체 (8곳 연쇄 수정 완료)
- [x] TechBadge variant 타입에서 `sky` 제거
- [x] `::selection` 색상을 `--accent` / `--accent-foreground`로 변경
- [x] 아이콘 배경색의 일률적 `primary-sky/10` 제거 → Phase 2-3에서 완료

---

### 3.2 홈페이지 (`app/page.tsx`)

#### Hero 섹션
- [x] 프로필 이미지 크기 축소 (w-14 h-14 아바타) + 이름 옆 배치
- [x] 텍스트 위계 재설계: 이름 `text-2xl font-bold`, 역할 `text-sm text-muted-foreground`
- [x] 인사말 제거 → 이름과 한 줄 소개로 간결하게
- [x] 파이프 구분자 → 쉼표 구분 자연스러운 표현

#### SectionHeader 컴포넌트
- [x] `h-1 w-8 bg-primary-sky` 장식 바 제거
- [x] 섹션 제목을 `text-lg font-semibold` 단순 텍스트로
- [x] 섹션 제목 자체를 링크로 처리 (호버 시 ArrowUpRight 표시)

#### About 섹션
- [x] 카드 없이 텍스트 블록으로 전환
- [x] 관심사 `interests.join(" / ")` 텍스트로 간소화
- [x] 아이콘 박스 제거

#### Skills 섹션
- [x] 카테고리(w-28) + 인라인 SkillBadge 한 줄 배치
- [x] 아이콘 박스 제거

#### Education & Experience 섹션
- [x] 기간(w-36) + 내용 플랫 리스트, `border-b border-border/60` 구분
- [x] 아이콘 박스 제거

#### Projects 섹션
- [x] Card 유지, hover 스타일 `hover:border-foreground/20`로 개선
- [x] TechBadge 유지 (shields.io 이미지)

#### Contact 섹션
- [x] 라벨(w-16) + 링크 인라인 배치
- [x] 아이콘 원형 배경 + 버튼 패턴 제거

---

### 3.3 About 페이지 (`app/about/page.tsx`)

- [x] 5개 카드 → `border-b` 구분 텍스트 섹션으로 전환
  - 소개: 자연스러운 `<p>` 문단 (br 제거)
  - 현재 직장: 인라인 텍스트 (`text-primary-sky font-medium`)
  - 관심 분야: `interests.join(" / ")` 텍스트
  - 자격증: 인라인 텍스트 (Badge 제거)
  - 목표: 별도 텍스트 섹션
- [x] 아이콘 박스 5개 전부 제거
- [x] Server Component 전환 (motion 제거)
- [x] 헤더 `text-xl font-semibold` + `text-sm`, 섹션 `text-sm font-medium`

---

### 3.4 Skills 페이지 (`app/skills/page.tsx`)

- [x] 카드 그리드 → 카테고리(w-28) + SkillBadge 플랫 레이아웃 (홈페이지와 동일)
- [x] 아이콘 박스 5개 제거
- [x] SkillBadge 재사용 (shields.io 이미지 + flame 숙련도 유지)
- [x] Flame 숙련도 범례 제거
- [x] Server Component 전환 (motion/stagger 제거)

---

### 3.5 Education 페이지 (`app/education/page.tsx`)

- [x] 수직 타임라인 선 + 원형 아이콘 노드 전부 제거
- [x] 기간(w-36) + 내용 플랫 리스트 (홈페이지와 동일)
- [x] 카드 제거 → `border-b border-border/60` 구분
- [x] Badge 유지 (홈페이지와 동일한 `variant="secondary"`)
- [x] Server Component 전환 (motion/stagger 제거)

---

### 3.6 Contact 페이지 (`app/contact/page.tsx`)

- [x] 소개 Card 제거 → 헤더 부제로 통합
- [x] 3열 Card → 라벨(w-16) + 링크 한 줄 배치 (홈페이지와 동일)
- [x] 아이콘 원형 배경 제거
- [x] Button/ExternalLink 제거 → 값 자체를 underline 링크로
- [x] Server Component 전환 (motion 제거)

### 3.7 Overview 페이지 (`app/overview/page.tsx`)

- [x] SectionTitle(`h-1 w-8 bg-primary-sky` 바) → `text-lg font-semibold` 단순 텍스트
- [x] 전체 Card + 아이콘박스 제거 → 홈페이지 스타일로 완전 재작성
- [x] Skills: `Badge variant="secondary"` 텍스트만 (shields.io 이미지 X)
- [x] Timeline: 플랫 리스트 + `border-b` 구분선
- [x] Contact: 라벨 + 링크 인라인
- [x] Server Component 전환 (motion 제거)

### 3.8 Posts 상세 (`app/posts/[slug]/page.tsx`)

- [x] Card/CardContent 제거 → `<header>` + `border-b border-border pb-6 mb-8`
- [x] 제목 `text-3xl sm:text-4xl` → `text-2xl sm:text-3xl`
- [x] Calendar 아이콘 제거 → 날짜 텍스트만

### 3.9 Projects 상세 (`app/projects/[slug]/page.tsx`)

- [x] Card/CardContent 제거 → `<header>` + `border-b border-border pb-6 mb-8`
- [x] 제목 `text-3xl sm:text-4xl` → `text-2xl sm:text-3xl`
- [x] Calendar 아이콘 제거, GitHub/Demo 링크 유지

---

## 4. 수정하지 않는 것 (기능 유지)

- 다크/라이트 모드 전환
- 네비게이션 바 구조 및 라우팅
- MDX 콘텐츠 렌더링 (posts, projects)
- 플로팅 목차 (TOC)
- 반응형 브레이크포인트
- SEO 메타데이터
- 정적 빌드 호환성
- 데이터(콘텐츠) 자체

---

## 5. 디자인 도구 연동 계획

작업 전 MCP 서버를 연동하여 디자인 참조 및 컴포넌트 활용도를 높인다.

### 5.1 shadcn/ui MCP (필수)

이미 프로젝트에서 shadcn/ui를 사용 중이므로 가장 먼저 연동한다.

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

- [ ] MCP 서버 설치 및 Claude Code 연결 확인 (`/mcp`에서 connected 확인)
- [ ] 컴포넌트 레지스트리 조회 가능 확인

**활용 방식:**
- 리디자인 시 shadcn 컴포넌트의 최신 API/구현 코드를 실시간 참조
- 필요한 컴포넌트를 자연어로 검색/설치
- 커스텀 변형(variant) 설계 시 기존 구현 패턴 참고

### 5.2 Google Stitch (프로토타이핑)

텍스트 프롬프트로 UI를 생성하고 Tailwind CSS 코드를 추출하여 디자인 방향을 잡는다.

**MCP 연동:**
```bash
npx @_davideast/stitch-mcp init
```

**수동 사용 (MCP 없이):**
1. [stitch.withgoogle.com](https://stitch.withgoogle.com)에서 디자인 생성
2. "View Code"로 HTML + Tailwind CSS 코드 복사
3. Claude Code에서 Next.js 컴포넌트로 변환

- [ ] Stitch 접속 및 사용 가능 확인
- [ ] MCP 연동 또는 수동 워크플로우 결정

**활용 방식:**
- 페이지별 리디자인 전에 Stitch로 레이아웃 프로토타입 생성
- 생성된 Tailwind 코드를 기반으로 실제 컴포넌트에 반영
- "미니멀 포트폴리오", "에디토리얼 레이아웃" 등의 프롬프트로 방향성 탐색

### 5.3 Magic UI MCP (선택)

이미 `components/magicui/`를 사용 중이므로 애니메이션 컴포넌트 참조에 활용한다.

`.mcp.json`에 추가:
```json
{
  "mcpServers": {
    "magicui": {
      "command": "npx",
      "args": ["-y", "@magicuidesign/mcp@latest"]
    }
  }
}
```

- [ ] 필요 시 MCP 서버 추가 연동

**활용 방식:**
- 기존 모션 패턴 교체 시 Magic UI 애니메이션 컴포넌트 탐색
- 새로운 인터랙션 아이디어 참고

### 5.4 도구 연동 우선순위

| 순서 | 도구          | 용도               | 필수 여부 |
| ---- | ------------- | ------------------ | --------- |
| 1    | shadcn/ui MCP | 컴포넌트 참조/설치 | 필수      |
| 2    | Google Stitch | UI 프로토타이핑    | 권장      |
| 3    | Magic UI MCP  | 애니메이션 참조    | 선택      |

---

## 6. 작업 순서

### Phase 0: 도구 준비
1. shadcn/ui MCP 연동
2. Google Stitch 연동 (MCP 또는 수동)
3. 필요 시 Magic UI MCP 연동

### Phase 1: 공통 기반 작업
4. PageContainer 배경 패턴 제거
5. 색상 체계 정리 (primary-sky 의존도 축소)
6. 모션 패턴 정리 (일률적 stagger 제거, 페이지별 방식 결정)

### Phase 2: 홈페이지 리디자인 ✅
7. Hero 섹션 재설계 (아바타 축소, 텍스트 간결화)
8. SectionHeader 간소화 (장식 바 제거, 제목 링크화)
9. 각 섹션 레이아웃 다양화 (카드 의존 축소)
10. 목록 페이지 헤더 크기 조정 (Posts, Projects)
11. 푸터 추가

### Phase 3: 하위 페이지 + 상세 페이지 리디자인 ✅
12. About 페이지 — Card/아이콘 제거, Server Component, 텍스트 중심
13. Skills 페이지 — Card 그리드 → 플랫 레이아웃, Server Component
14. Education 페이지 — 타임라인 제거, Card 제거, Server Component
15. Contact 페이지 — Card 그리드 → 라벨+링크, Server Component
16. Overview 페이지 — 홈페이지 스타일로 재작성, Server Component
17. Posts 상세 — 헤더 Card 제거, Calendar 아이콘 제거
18. Projects 상세 — 헤더 Card 제거, Calendar 아이콘 제거

### Phase 4: 마무리 ✅
19. 전체 페이지 일관성 점검 — 헤더 패턴 통일 (Posts/Projects 목록 페이지)
20. 반응형 동작 확인 (sm ~ xl) — 개발 서버에서 확인 필요
21. 다크/라이트 모드 확인 — 개발 서버에서 확인 필요
22. 빌드 테스트 — 30/30 성공
23. 미사용 컴포넌트/import 정리 완료:
    - 삭제: `components/magicui/` (Dock), `components/animation/`, `components/ui/button.tsx`
    - 정리: `card.tsx` (CardHeader/Title/Description/Footer 제거), `animation.ts` (pageFadeIn 제거)
    - `lib/skill-data.ts` SkillCategory.icon optional 변경

---

## 7. 체크리스트

### 수정 전
- [x] `develop` 브랜치에서 작업
- [x] 현재 상태 빌드 확인 (`pnpm build`)

### 수정 후
- [x] `pnpm build` 성공 (30/30 정적 페이지)
- [x] `pnpm lint` 성공 (0 errors, 4 pre-existing warnings)
- [ ] 다크/라이트 모드 정상 — 시각적 확인 필요
- [ ] 모바일(sm) ~ 데스크톱(xl) 반응형 정상 — 시각적 확인 필요
- [x] 모든 페이지 렌더링 정상 (빌드 통과)
- [ ] 콘솔 에러 없음 — 브라우저 확인 필요

---

## 8. 변경 이력

| 날짜       | 내용                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 2026-02-16 | 초안 작성                                                                                                                    |
| 2026-02-16 | 디자인 도구 연동 계획 추가 (shadcn MCP, Stitch, Magic UI)                                                                    |
| 2026-02-16 | Phase 1 완료 — PageContainer 패턴 제거, FramerWrapper 삭제, animation.ts 생성, Badge sky variant 제거, ::selection 색상 변경 |
| 2026-02-16 | Phase 2 완료 — 홈페이지 텍스트 중심 미니멀 리디자인, SectionHeader 간소화, 푸터 추가, 목록 페이지 헤더 조정 |
| 2026-02-16 | Phase 3 완료 — About/Skills/Education/Contact/Overview Server Component 전환, Card/아이콘박스 전면 제거, Posts/Projects 상세 헤더 Card 제거 |
| 2026-02-16 | Phase 4 완료 — 미사용 컴포넌트 삭제(Dock, Button, CardHeader 등), pageFadeIn 제거, 목록 페이지 헤더 패턴 통일, 일관성 점검 |
