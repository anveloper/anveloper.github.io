# 2026-02-19: giscus 댓글 기능 추가

## feat

### giscus 댓글 컴포넌트 추가

- `@giscus/react` 패키지 설치
- `components/giscus-comments.tsx` 클라이언트 컴포넌트 생성
  - GitHub Discussions 기반 댓글 위젯
  - `MutationObserver`로 다크/라이트 테마 자동 동기화
  - `pathname` 매핑으로 URL 경로 기반 Discussion 자동 생성

### 포스트/솔루션 상세 페이지에 댓글 배치

- `app/posts/[slug]/page.tsx` - `<article>` 하단에 배치
- `app/solutions/[slug]/page.tsx` - `<article>` 하단에 배치

## 기술 결정

### 테마 동기화 방식

- 기존 `useThemeClass` 훅은 인스턴스별 독립 상태 관리 방식
- giscus 컴포넌트에서 별도로 사용하면 nav-bar의 테마 변경을 감지 불가
- `MutationObserver`로 `document.documentElement`의 `class` 속성 변경을 직접 관찰하여 해결
