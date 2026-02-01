# Claude Code 프로젝트 가이드

## 프로젝트 개요

**anveloper.github.io**는 웹 개발자 안성진의 포트폴리오 및 기술 블로그 웹사이트입니다.

- **프레임워크**: Next.js 15 (App Router)
- **배포**: GitHub Pages (정적 빌드)
- **언어**: TypeScript, 한국어 콘텐츠

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15.3.3 (App Router, Turbopack) |
| UI | React 19, TypeScript |
| 스타일링 | Tailwind CSS v4, CVA (class-variance-authority) |
| 애니메이션 | Motion (Framer Motion) |
| UI 컴포넌트 | Radix UI, shadcn/ui |
| 콘텐츠 | MDX + gray-matter |
| 아이콘 | lucide-react |

## 디렉토리 구조

```
app/                 # Next.js App Router 페이지
├── layout.tsx       # 루트 레이아웃
├── page.tsx         # 홈페이지
├── globals.css      # 전역 스타일 (Tailwind + 커스텀)
├── posts/[slug]/    # 블로그 포스트
└── projects/[slug]/ # 프로젝트

components/          # 재사용 컴포넌트
├── ui/              # 기본 UI (Button, Tooltip 등)
├── magicui/         # Magic UI 컴포넌트
└── animation/       # 애니메이션 래퍼

hooks/               # 커스텀 React Hooks
lib/                 # 유틸리티 함수
_posts/              # 블로그 MDX 파일
_projects/           # 프로젝트 MDX 파일
public/              # 정적 파일 (폰트, 이미지, 파비콘)
docs/                # 프로젝트 문서
```

## 코딩 컨벤션

### TypeScript

- 엄격한 타입 검사 사용 (`strict: true`)
- `any` 타입 사용 금지
- 인터페이스보다 타입 선호 (일관성)
- 경로 별칭 사용: `@/*` → 루트 디렉토리

### React/Next.js

- 함수형 컴포넌트만 사용
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

### 형식

```
<타입>: <제목> (<스코프>)

<본문>

<꼬리말>
```

### 타입

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서만 변경 |
| `style` | 코드 의미에 영향 없는 변경 (포맷팅 등) |
| `refactor` | 리팩토링 (기능 추가/버그 수정 아님) |
| `perf` | 성능 개선 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정 등 보조 작업 |
| `revert` | 이전 커밋 되돌리기 |

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

## 개발 일지

- 하루 작업 종료 시 `docs/logs/YYYYMMDD-{title}.md` 파일 생성
- 커밋 타입별로 그룹화하여 정리
- 기존 파일이 있으면 내용 추가

## 개발 명령어

```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 정적 빌드
npm run start    # 빌드된 사이트 실행
npm run lint     # ESLint 검사
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

### 스타일 가이드

1. 색상: CSS 변수 사용 (`--background`, `--foreground` 등)
2. 반응형: Tailwind 브레이크포인트 (sm:480px, md:720px, lg:976px, xl:1440px)
3. 다크 모드: `.dark` 클래스 기반

## 리뉴얼 작업 참고사항

### 현재 상태

- 홈페이지, 포스트, 프로젝트 페이지 완성
- About, Skills, Education, Overview, Email 페이지 개발 중

### 리뉴얼 시 고려사항

- 기존 MDX 콘텐츠 구조 유지
- 다크/라이트 모드 지원 유지
- 정적 빌드 호환성 유지 (GitHub Pages)
- 반응형 디자인 필수
- 접근성 (a11y) 고려
