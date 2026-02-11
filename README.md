# anveloper.github.io

## 소개

Next.js 16과 MDX를 기반으로 구축된 개인 포트폴리오 및 기술 블로그 웹사이트입니다. 개발자의 경험, 프로젝트, 기술 스택 및 생각을 공유하기 위해 설계되었습니다. 다크 모드 지원 및 반응형 디자인을 통해 다양한 환경에서 최적의 사용자 경험을 제공합니다.

## 주요 기능

- **MDX 기반 블로그 및 프로젝트 페이지**: 마크다운(Markdown)과 JSX를 함께 사용하여 동적이고 풍부한 콘텐츠를 작성할 수 있습니다.
- **반응형 내비게이션**: 모바일 및 데스크톱 환경에 최적화된 헤더 스타일 내비게이션을 제공합니다.
- **테마 토글**: 사용자가 라이트 모드와 다크 모드를 자유롭게 전환할 수 있습니다.
- **애니메이션 및 UI 컴포넌트**: Motion 및 Magic UI를 활용하여 시각적으로 매력적인 사용자 인터페이스를 구현했습니다.
- **SEO 최적화**: Next.js의 기능을 활용하여 검색 엔진 최적화에 유리하도록 설계되었습니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript |
| 스타일링 | Tailwind CSS v4, CVA (class-variance-authority) |
| 애니메이션 | Motion (Framer Motion) |
| UI 컴포넌트 | Radix UI, shadcn/ui, Magic UI |
| 콘텐츠 | MDX + gray-matter |
| 아이콘 | lucide-react |
| 패키지 매니저 | pnpm |

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/anveloper/anveloper.github.io.git
cd anveloper.github.io
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 4. 빌드 및 배포

```bash
pnpm build
pnpm start
```

## 사용법

- **블로그 게시물 작성**: `_posts` 디렉토리에 `.mdx` 파일을 추가하여 새로운 블로그 게시물을 작성할 수 있습니다.
- **프로젝트 추가**: `_projects` 디렉토리에 `.mdx` 파일을 추가하여 포트폴리오 프로젝트를 추가할 수 있습니다.
- **테마 변경**: 웹사이트 상단의 테마 토글 버튼을 클릭하여 라이트/다크 모드를 전환할 수 있습니다.

## 프로젝트 구조

```
anveloper.github.io/
├── app/                  # Next.js App Router 페이지 및 레이아웃
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── animation/        # Motion 기반 애니메이션 컴포넌트
│   ├── magicui/          # Magic UI 컴포넌트
│   └── ui/               # 기본 UI 요소 (Button, Card, Badge 등)
├── hooks/                # 커스텀 React Hooks
├── lib/                  # 유틸리티 함수 및 MDX 관련 설정
├── public/               # 정적 파일 (이미지, 폰트, 파비콘 등)
├── _posts/               # 블로그 게시물 MDX 파일
├── _projects/            # 포트폴리오 프로젝트 MDX 파일
├── docs/                 # 프로젝트 문서
├── .github/              # GitHub 관련 설정 (PR 템플릿, 워크플로우 등)
├── next.config.ts        # Next.js 설정
├── tailwind.config.ts    # Tailwind CSS 설정
├── tsconfig.json         # TypeScript 설정
└── package.json          # 프로젝트 의존성 및 스크립트
```
