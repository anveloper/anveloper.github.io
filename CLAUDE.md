# Claude Code 프로젝트 가이드

## 응답 규칙

- 사용자가 영어로 질문할 경우: **한국어로 답변** + **원래 질문의 교정된 영어 문장**을 함께 제공
- 원격 환경에서 한글 입력이 불가할 때 영어로 입력하는 경우가 있음
- 교정된 영어 문장은 사용자의 영어 학습 목적
- 형식 예시: 답변 끝에 `> Corrected English: "교정된 문장"` 포함

## 프로젝트 개요

**anveloper.github.io**는 웹 개발자 안성진의 포트폴리오 및 기술 블로그 웹사이트입니다.

- **프레임워크**: Next.js 16 (App Router)
- **배포**: GitHub Pages (정적 빌드)
- **언어**: TypeScript, 한국어 콘텐츠

## 기술 스택

| 분류            | 기술                                                 |
| --------------- | ---------------------------------------------------- |
| 프레임워크      | Next.js 16.1.6 (App Router, Turbopack)               |
| UI              | React 19.2.4, TypeScript 5.9.3                       |
| 스타일링        | Tailwind CSS v4.1.18, CVA (class-variance-authority) |
| 애니메이션      | Motion 12.29.2 (Framer Motion)                       |
| UI 컴포넌트     | Radix UI, shadcn/ui                                  |
| 콘텐츠          | MDX + gray-matter, remark-gfm, mermaid               |
| 구문 하이라이팅 | rehype-pretty-code + shiki (듀얼 테마)               |
| 목차(TOC)       | rehype-slug + github-slugger                         |
| 아이콘          | lucide-react                                         |
| 패키지 매니저   | pnpm                                                 |

## 디렉토리 구조

```
app/                 # Next.js App Router 페이지
├── layout.tsx       # 루트 레이아웃
├── page.tsx         # 홈페이지
├── globals.css      # 전역 스타일 (Tailwind + 커스텀)
├── about/           # 소개 페이지
├── skills/          # 기술 스택 페이지
├── education/       # 학력 페이지
├── overview/        # 경력 개요 페이지
├── contact/         # 연락처 페이지
├── posts/[slug]/    # 블로그 포스트
└── projects/[slug]/ # 프로젝트

components/          # 재사용 컴포넌트
├── ui/              # 기본 UI (Tooltip, Card, Badge 등)
├── header-logo.tsx  # 로고 텍스트 애니메이션
├── nav-bar.tsx      # 네비게이션 헤더
├── footer.tsx       # 푸터
├── page-container.tsx # 페이지 컨테이너
├── table-of-contents.tsx # 플로팅 목차 (xl 이상)
├── mermaid.tsx      # Mermaid 다이어그램 렌더러
├── skill-badge.tsx  # shields.io 기술 뱃지
├── favicon-switcher.tsx # 다크/라이트 파비콘 전환
└── providers.tsx    # 전역 Provider 래퍼

hooks/               # 커스텀 React Hooks
├── use-mounted.ts   # SSR 마운트 상태 감지
├── use-theme-class.ts # 다크/라이트 테마 감지
└── use-active-heading.ts # 스크롤 스파이 (TOC용)

lib/                 # 유틸리티 함수
├── utils.ts         # cn() 클래스 병합 등
├── animation.ts     # 모션 variants (sectionReveal, stagger 등)
├── mdx-options.ts   # MDX 플러그인 설정
├── mdx-components.ts # MDX 렌더링 컴포넌트
├── toc.ts           # 목차 추출 유틸리티
└── skill-data.ts    # shields.io 뱃지 데이터
_posts/              # 블로그 MDX 파일
_projects/           # 프로젝트 MDX 파일
public/              # 정적 파일 (폰트, 이미지, 파비콘)
docs/                # 프로젝트 문서
.claude/skills/      # Claude Code 스킬
```

## 코딩 컨벤션

### TypeScript

- 엄격한 타입 검사 사용 (`strict: true`)
- `any` 타입 사용 금지
- 인터페이스보다 타입 선호 (일관성)
- 경로 별칭 사용: `@/*` → 루트 디렉토리

### React/Next.js

- `const` 함수형 컴포넌트만 사용
- Server Components 기본, 필요시 `"use client"` 명시
- Next.js 15: `params`는 Promise이므로 `await` 필수
- 컴포넌트 파일명: kebab-case (예: `nav-bar.tsx`)

### 스타일링

- Tailwind CSS 유틸리티 클래스 우선
- 복잡한 스타일: CVA 패턴 사용
- 클래스 병합: `cn()` 유틸리티 함수 사용 (`lib/utils.ts`)
- 다크 모드: `dark:` 접두사 또는 CSS 변수

### 파일/폴더 명명

- 컴포넌트 파일: `kebab-case.tsx`
- 훅 파일: `use-hook-name.ts`
- 유틸리티: `kebab-case.ts`
- MDX 파일: `kebab-case.mdx`

## 커밋 메시지 가이드라인

Conventional Commits 명세를 따릅니다.
Claude 협력 문구는 반드시 제외합니다.
파일은 한번에 커밋하지 않고, 기능별로 묶어서 커밋합니다.

### 형식

```
<타입>: <제목> (<스코프>)

<본문>

<꼬리말>
```

### 타입

| 타입       | 설명                                   |
| ---------- | -------------------------------------- |
| `feat`     | 새로운 기능                            |
| `fix`      | 버그 수정                              |
| `docs`     | 문서만 변경                            |
| `style`    | 코드 의미에 영향 없는 변경 (포맷팅 등) |
| `refactor` | 리팩토링 (기능 추가/버그 수정 아님)    |
| `perf`     | 성능 개선                              |
| `test`     | 테스트 추가/수정                       |
| `chore`    | 빌드, 설정 등 보조 작업                |
| `revert`   | 이전 커밋 되돌리기                     |

### 제목 규칙

- 명령형 현재 시제 사용
- 첫 글자 소문자
- 끝에 마침표 없음
- 한글로 작성 (파일명, 고유명사 제외)

### 예시

```
feat: 다크 모드 토글 버튼 추가
fix: 네비게이션 링크 경로 수정 (nav)
docs: README.md 업데이트
refactor: 컴포넌트 구조 개선 (ui)
```

## 브랜치 전략

- **main**: 프로덕션 브랜치 (GitHub Pages 배포)
- **develop**: 개발 브랜치 (주요 작업 브랜치)
- **feature/\***: 기능 개발 브랜치

### 작업 흐름

1. `develop` 브랜치에서 새 브랜치 생성
2. 기능 개발 후 `develop`으로 PR
3. 리뷰 후 머지
4. 배포 준비 완료 시 `main`으로 머지

## PR 규칙

- `gh pr create` 명령어로 생성
- `.github/PULL_REQUEST_TEMPLATE.md` 템플릿을 따름
- Claude 협력 문구는 반드시 제외

### 템플릿 구조

```markdown
## Summary
- 변경 사항 1-3줄 요약

## Changes
### 기능
### 스타일
### 기타

## Test plan
- [ ] `pnpm build` 성공
- [ ] `pnpm lint` 성공
- [ ] 개발 서버 정상 동작 확인
- [ ] 주요 페이지 렌더링 확인

## Screenshots
## Notes
```

### 제목 규칙

- 형식: `<source> → <target>: <설명>`
- 예시: `develop → main: 콘텐츠 추가, Mermaid 지원, shields.io 뱃지 및 UI 개선`
- 한글로 작성, 변경 범위를 명확히 표현

## 개발 일지

- 하루 작업 종료 시 `docs/logs/YYYYMMDD-{title}.md` 파일 생성
- 커밋 타입별로 그룹화하여 정리
- 기존 파일이 있으면 내용 추가

## 개발 명령어

```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 정적 빌드
pnpm start    # 빌드된 사이트 실행
pnpm lint     # ESLint 검사
```

## 주요 작업 지침

### 컴포넌트 작성

1. `components/ui/` - 기본 UI 컴포넌트 (shadcn/ui 스타일)
2. `components/` - 프로젝트 특화 컴포넌트
3. Radix UI 기반으로 접근성 확보

### MDX 콘텐츠

1. `_posts/` - 블로그 포스트
2. `_projects/` - 프로젝트 설명
3. Frontmatter 필수: `title`, `date`
4. MDX 파일 생성 시 이미지 디렉토리도 함께 생성
   - 포스트: `public/images/posts/{slug}/`
   - 프로젝트: `public/images/projects/{slug}/`

### 스타일 가이드

1. 색상: CSS 변수 사용 (`--background`, `--foreground` 등)
2. 반응형: Tailwind 브레이크포인트 (sm:480px, md:720px, lg:976px, xl:1440px)
3. 다크 모드: `.dark` 클래스 기반

## 리뉴얼 작업 참고사항

### 현재 상태

- 홈페이지, 포스트, 프로젝트 페이지 완성
- About, Skills, Education, Overview, Contact 페이지 완성

### 리뉴얼 시 고려사항

- 기존 MDX 콘텐츠 구조 유지
- 다크/라이트 모드 지원 유지
- 정적 빌드 호환성 유지 (GitHub Pages)
- 반응형 디자인 필수
- 접근성 (a11y) 고려
