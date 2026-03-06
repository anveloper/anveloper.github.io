# 이전/다음 포스트 네비게이션

## 개요

posts, projects, solutions 상세 페이지에 이전/다음 포스트 네비게이션을 추가한다.

## 배경

- 현재 상세 페이지에서 목록으로 돌아가야만 다른 글로 이동 가능
- 글이 시간순이 아닌 중간에 추가되는 경우도 있어, 정적 frontmatter 방식은 유지보수 부담이 큼

## 설계

### 방식: 빌드 타임 자동 계산

기존 `getAllPosts()`, `getAllSolutions()`, `getAllProjects()` 함수가 날짜순 정렬된 배열을 반환하므로, 상세 페이지에서 현재 slug의 인덱스를 기반으로 prev/next를 자동 계산한다.

```tsx
const items = await getAllPosts();
const idx = items.findIndex((p) => p.slug === slug);
const prev = items[idx + 1] ?? null; // 이전 (더 오래된 글)
const next = items[idx - 1] ?? null; // 다음 (더 최신 글)
```

- 정적 빌드(SSG)이므로 런타임 비용 없음
- 중간 삽입 시 빌드만 하면 앞뒤 자동 갱신
- MDX frontmatter 수정 불필요

### 컴포넌트 구조

`components/post-navigation.tsx` (Server Component)

```
┌─────────────────────────────────────────┐
│  ← 이전 글 제목           다음 글 제목 →  │
└─────────────────────────────────────────┘
```

#### Props

```tsx
type PostNavigationProps = {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  basePath: string; // "/posts" | "/projects" | "/solutions"
};
```

- `basePath`로 세 섹션에서 공용 사용
- prev/next 중 하나만 있으면 한쪽만 표시

### 배치 위치

`<article>` 아래, `<GiscusComments />` 위 (projects는 댓글이 없으므로 `<article>` 바로 아래)

```
article (MDX 본문)
PostNavigation (이전/다음)
GiscusComments (댓글)
```

## 변경 파일

| 작업 | 파일 | 설명 |
|------|------|------|
| 신규 | `components/post-navigation.tsx` | 이전/다음 네비게이션 컴포넌트 |
| 수정 | `app/posts/[slug]/page.tsx` | getAllPosts로 prev/next 계산 후 전달 |
| 수정 | `app/projects/[slug]/page.tsx` | getAllProjects로 prev/next 계산 후 전달 |
| 수정 | `app/solutions/[slug]/page.tsx` | getAllSolutions로 prev/next 계산 후 전달 |

## 스타일

- 상하 border로 구분
- 좌우 양끝 정렬 (flex justify-between)
- 화살표 아이콘 (ChevronLeft, ChevronRight)
- hover 시 텍스트 색상 전환
- 반응형: 모바일에서도 양쪽 표시 (텍스트 truncate)
